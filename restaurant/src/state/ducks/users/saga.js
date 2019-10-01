/**
 * @module Sagas/Session
 * @desc Session
 */
import {all, call, put, takeLatest} from 'redux-saga/effects'
import {
  USERS_TEST_ACTION,
  USERS_TEST_ACTION_FAILED,
  USERS_TEST_ACTION_SUCCESS,
  FETCH_USER,
  UPDATE_USER,
  DELETE_USER,
  ADD_USER,
} from './types'
import {axios} from '../../../utils/http/axios-singleton'
/**
 * Login
 */
export function* testSaga() {
  try {
    yield put({type: USERS_TEST_ACTION_SUCCESS, payload: 'Test'})
  } catch (error) {
    yield put({type: USERS_TEST_ACTION_FAILED, error})
  }
}
export function* fetchUsers() {
  try {
    const response = yield call(fetchUserHttpCall)
    //users
    const users = response.data

    // dispatch a success action to the store with the new dog
    yield put({type: FETCH_USER.SUCCESS, payload: {users}})
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: FETCH_USER.FAILED, error})
  }
}
export function* updateUser(action) {
  try {
    const response = yield call(updateUserHttpCall, action.payload)
    //users
    // const users = response.data

    // dispatch a success action to the store with the new dog
    yield put({type: UPDATE_USER.SUCCESS, payload: action.payload})
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: UPDATE_USER.FAILED, error})
  }
}
export function* deleteUser(action) {
  try {
    const response = yield call(deleteUserHttpCall, action.payload)
    //users
    // const users = response.data

    // dispatch a success action to the store with the new dog
    yield put({type: DELETE_USER.SUCCESS, payload: action.payload})
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: DELETE_USER.FAILED, error})
  }
}
export function* addUser(action) {
  try {
    const response = yield call(addUserHttpCall, action.payload)
    //users
    // const users = response.data

    // dispatch a success action to the store with the new dog
    yield put({type: ADD_USER.SUCCESS, payload: action.payload})
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: ADD_USER.FAILED, error})
  }
}
const fetchUserHttpCall = () => axios.get(`/users`)
const updateUserHttpCall = newUser => axios.put(`/users`, {...newUser})
const deleteUserHttpCall = userId =>
  axios.delete(`/users`, {
    data: {
      id: userId,
    },
  })
const addUserHttpCall = newUser =>
  axios.post('/users', {
    name: newUser.name,
    last_name: newUser.last_name,
    date_of_birth: newUser.date_of_birth,
    role_id: newUser.role_id,
    email: newUser.email,
    cellphone: newUser.cellphone,
  })

/**
 * User Sagas Watcher
 */
export default function* root() {
  yield all([
    takeLatest(USERS_TEST_ACTION, testSaga),
    takeLatest(FETCH_USER.REQUEST, fetchUsers),
    takeLatest(UPDATE_USER.REQUEST, updateUser),
    takeLatest(DELETE_USER.REQUEST, deleteUser),
    takeLatest(ADD_USER.REQUEST, addUser),
  ])
}
