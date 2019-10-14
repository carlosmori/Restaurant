/**
 * @module Sagas/Session
 * @desc Session
 */
import {all, put, takeLatest} from 'redux-saga/effects'
import {
  REPORTS_TEST_ACTION,
  REPORTS_TEST_ACTION_FAILED,
  REPORTS_TEST_ACTION_SUCCESS,
} from './types'

/**
 * Login
 */
export function* testSaga() {
  try {
    yield put({type: REPORTS_TEST_ACTION_SUCCESS, payload: 'Test'})
  } catch (error) {
    yield put({type: REPORTS_TEST_ACTION_FAILED, error})
  }
}
/**
 * User Sagas Watcher
 */
export default function* root() {
  yield all([takeLatest(REPORTS_TEST_ACTION, testSaga)])
}
