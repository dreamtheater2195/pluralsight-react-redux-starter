import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {Redirect} from 'react-router-dom';

class CoursePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      redirect: false
    };

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  redirectToAddCoursePage() {
    this.setState({redirect: true});
  }

  render() {
    const {courses} = this.props;
    const {redirect} = this.state;

    if (redirect) {
      return <Redirect to="/course"/>;
    } else {
      return (
        <div>
          <h1>Courses</h1>
          <input type="submit"
                value="Add Course"
                className="btn btn-primary"
                onClick={this.redirectToAddCoursePage}/>
          <CourseList courses={courses}/>
        </div>
      );
    }
  }
}

CoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses //courses data in store
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
