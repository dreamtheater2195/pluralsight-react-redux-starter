import * as types from './actionTypes';
import authorApi from '../api/mockAuthorApi';
import {beginAjaxCall} from './ajaxStatusActions';

//action creator
export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors};
}

//load authors thunk
export function loadAuthors() {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return authorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      throw(error);
    });
  };
}

