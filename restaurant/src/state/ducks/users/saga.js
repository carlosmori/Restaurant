/**
 * @module Sagas/Session
 * @desc Session
 */
import {all, put, takeLatest} from 'redux-saga/effects'
import {
  USERS_TEST_ACTION,
  USERS_TEST_ACTION_FAILED,
  USERS_TEST_ACTION_SUCCESS,
} from './types'

/**
 * Login
 */
export function* testSaga() {
  try {
    console.log('Enter USERS testSaga')
    yield put({type: USERS_TEST_ACTION_SUCCESS, payload: 'Test'})
  } catch (error) {
    yield put({type: USERS_TEST_ACTION_FAILED, error})
  }
}
/**
 * User Sagas Watcher
 */
export default function* root() {
  yield all([takeLatest(USERS_TEST_ACTION, testSaga)])
}
