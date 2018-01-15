import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import {Redirect} from 'react-router-dom';
import {authorsFormattedForDropdown} from '../../selectors/selector';
import toastr from 'toastr';

export class ManageCoursePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      redirect : false,
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      this.setState({
        course: Object.assign({}, nextProps.course)
      });
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    this.setState({course: course});
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();
    if (!this.courseFormIsValid()) {
      return;
    }
    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
    .then(() => this.redirect())
    .catch(error => {
      toastr.error(error);
      this.setState({saving: false});
    });
  }

  redirect() {
    toastr.success('Course saved');
    this.setState({redirect: true, saving: false});
  }

  render() {
    const {course, errors, redirect, saving} = this.state;
    if (redirect) {
      return (
        <Redirect to="/courses"/>
      );
    } else {
      return (
        <CourseForm
          course={course}
          allAuthors={this.props.authors}
          errors={errors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          saving={saving}
        />
      );
    }
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  if (course.length) return course[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.match.params.id;
  let course = {id: '', watchHref: '', authorId: '', title: '', length: '', category: ''};

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
