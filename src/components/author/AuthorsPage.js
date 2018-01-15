import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorList from './AuthorList';
import { Redirect } from 'react-router-dom';

class AuthorsPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      redirect: false
    };
    this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
  }

  redirectToAddAuthorPage() {
    this.setState({ redirect: true });
  }

  render() {
    const { authors } = this.props;
    const { redirect } = this.redirect;
    if (redirect) {
      return <Redirect to="/author" />
    } else {
      return (
        <div>
          <h1>Authors</h1>
          <input type="submit"
            value="Add Author"
            className="btn btn-primary"
            onClick={this.redirectToAddAuthorPage}
          />
          <AuthorList authors={authors} />
        </div>
      );
    }
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
