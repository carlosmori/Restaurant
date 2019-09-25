/**
 * @module Sagas/Session
 * @desc Session
 */
import {all, put, takeLatest} from 'redux-saga/effects'
import {
  ORDERS_TEST_ACTION,
  ORDERS_TEST_ACTION_FAILED,
  ORDERS_TEST_ACTION_SUCCESS,
} from './types'

/**
 * Login
 */
export function* testSaga() {
  try {
    console.log('Enter ORDERS testSaga')
    yield put({type: ORDERS_TEST_ACTION_SUCCESS, payload: 'Test'})
  } catch (error) {
    yield put({type: ORDERS_TEST_ACTION_FAILED, error})
  }
}
/**
 * User Sagas Watcher
 */
export default function* root() {
  yield all([takeLatest(ORDERS_TEST_ACTION, testSaga)])
}
