/**
 * @module Sagas/Session
 * @desc Session
 */
import {all, put, takeLatest} from 'redux-saga/effects'
import {
  KITCHEN_TEST_ACTION,
  KITCHEN_TEST_ACTION_FAILED,
  KITCHEN_TEST_ACTION_SUCCESS,
} from './types'

/**
 * Login
 */
export function* testSaga() {
  try {
    console.log('Enter KITCHEN testSaga')
    yield put({type: KITCHEN_TEST_ACTION_SUCCESS, payload: 'Test'})
  } catch (error) {
    yield put({type: KITCHEN_TEST_ACTION_FAILED, error})
  }
}
/**
 * User Sagas Watcher
 */
export default function* root() {
  yield all([takeLatest(KITCHEN_TEST_ACTION, testSaga)])
}
