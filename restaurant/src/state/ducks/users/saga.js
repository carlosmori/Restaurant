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
const fetchUserHttpCall = () => axios.get(`/users`)

/**
 * User Sagas Watcher
 */
export default function* root() {
  yield all([
    takeLatest(USERS_TEST_ACTION, testSaga),
    takeLatest(FETCH_USER.REQUEST, fetchUsers),
  ])
}
