import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import AuthorsPage from './components/author/AuthorsPage';
import ManageCoursePage from './components/course/ManageCoursePage'; //eslint-disable-line import/no-named-as-default
import ManageAuthorPage from './components/author/ManageAuthorPage'; //eslint-disable-line import/no-named-as-default
export default (
  <Switch>
    <Route exact path="/" component={HomePage}/>
    <Route exact path="/about" component={AboutPage}/>

    <Route exact path="/authors" component={AuthorsPage}/>
    <Route exact path="/author" component={ManageAuthorPage}/>
    <Route path="/author/:id" component={ManageAuthorPage}/>
    <Route exact path="/courses" component={CoursesPage}/>
    <Route exact path="/course" component={ManageCoursePage}/>
    <Route path="/course/:id" component={ManageCoursePage}/>
  </Switch>
);
