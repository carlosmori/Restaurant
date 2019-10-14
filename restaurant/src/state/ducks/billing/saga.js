/**
 * @module Sagas/Session
 * @desc Session
 */
import {all, put, takeLatest} from 'redux-saga/effects'
import {
  BILLING_TEST_ACTION,
  BILLING_TEST_ACTION_FAILED,
  BILLING_TEST_ACTION_SUCCESS,
} from './types'

/**
 * Login
 */
export function* testSaga() {
  try {
    yield put({type: BILLING_TEST_ACTION_SUCCESS, payload: 'Test'})
  } catch (error) {
    yield put({type: BILLING_TEST_ACTION_FAILED, error})
  }
}
/**
 * User Sagas Watcher
 */
export default function* root() {
  yield all([takeLatest(BILLING_TEST_ACTION, testSaga)])
}
