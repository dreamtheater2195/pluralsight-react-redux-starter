import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app';
import routes from './routes';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';
import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

ReactDOM.render ((
  <Provider store={store}>
    <BrowserRouter>
      <App children={routes}/>
    </BrowserRouter>
  </Provider>
),document.getElementById('app')
);
