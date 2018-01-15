import React from 'react';
import PropTypes from 'prop-types';
import AuthorListRow from './AuthorListRow';
const AuthorList = ({ authors }) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author, index) => {
            return <AuthorListRow key={author.id}
              author={author}
              index={index} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired
};

export default AuthorList;
