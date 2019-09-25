/**
 * @module Sagas/Session
 * @desc Session
 */
import {all, put, takeLatest} from 'redux-saga/effects'
import {
  DASHBOARD_TEST_ACTION,
  DASHBOARD_TEST_ACTION_FAILED,
  DASHBOARD_TEST_ACTION_SUCCESS,
} from './types'

/**
 * Login
 */
export function* testSaga() {
  try {
    console.log('Enter DASHBOARD testSaga')
    yield put({type: DASHBOARD_TEST_ACTION_SUCCESS, payload: 'Test'})
  } catch (error) {
    yield put({type: DASHBOARD_TEST_ACTION_FAILED, error})
  }
}
/**
 * User Sagas Watcher
 */
export default function* root() {
  yield all([takeLatest(DASHBOARD_TEST_ACTION, testSaga)])
}
