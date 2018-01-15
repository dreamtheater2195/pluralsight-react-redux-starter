import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('Course Reducer', () => {
  it('should add course when passed CREATE_COURSE_SUCCESS', () => {
    const initialState = [
      {title: 'A'},
      {title: 'B'}
    ];
    const newCourse = {title: 'C'};
    const action = actions.createCourseSuccess(newCourse);
    const returnState = courseReducer(initialState, action);
    expect(returnState).toEqual([...initialState, Object.assign({}, newCourse)]);
    expect(returnState.length).toEqual(3);
    expect(returnState[2].title).toEqual('C');
  });

  it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
    const initialState = [
      {id: 'A', title: 'a title'},
      {id: 'B', title: 'b title'},
      {id: 'C', title: 'c title'}
    ];
    const course = {id: 'B', title: 'b title updated'};
    const action = actions.updateCourseSuccess(course);

    const newState = courseReducer(initialState, action);
    const updatedCourse = newState.find(c => c.id == course.id);
    const untouchedCourse = newState.find(c => c.id == 'A');

    expect(updatedCourse.title).toEqual('b title updated');
    expect(untouchedCourse.title).toEqual('a title');
    expect(newState.length).toEqual(3);
  });
});
