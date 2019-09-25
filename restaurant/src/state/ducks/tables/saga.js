/**
 * @module Sagas/Session
 * @desc Session
 */
import {all, put, takeLatest} from 'redux-saga/effects'
import {
  TABLES_TEST_ACTION,
  TABLES_TEST_ACTION_FAILED,
  TABLES_TEST_ACTION_SUCCESS,
} from './types'

/**
 * Login
 */
export function* testSaga() {
  try {
    console.log('Enter TABLES testSaga')
    yield put({type: TABLES_TEST_ACTION_SUCCESS, payload: 'Test'})
  } catch (error) {
    yield put({type: TABLES_TEST_ACTION_FAILED, error})
  }
}
/**
 * User Sagas Watcher
 */
export default function* root() {
  yield all([takeLatest(TABLES_TEST_ACTION, testSaga)])
}
