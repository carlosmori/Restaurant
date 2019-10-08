/**
 * @module Sagas/Session
 * @desc Session
 */
import {all, put, call, takeLatest} from 'redux-saga/effects'
import {axios} from '../../../utils/http/axios-singleton'

import {
  KITCHEN_TEST_ACTION,
  KITCHEN_TEST_ACTION_FAILED,
  KITCHEN_TEST_ACTION_SUCCESS,
  FETCH_PENDING_ORDERS,
} from './types'
import {DASHBOARD_SNACKBAR} from '../dashboard/types'

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

export function* fetchPendingOrders(action) {
  try {
    yield put({type: FETCH_PENDING_ORDERS.LOADING, payload: {loading: true}})
    const response = yield call(fetchPendingOrdersHttpCall)
    yield put({
      type: FETCH_PENDING_ORDERS.SUCCESS,
      payload: response.data,
    })
    yield put({type: FETCH_PENDING_ORDERS, payload: {loading: false}})
  } catch (error) {
    yield put({type: FETCH_PENDING_ORDERS.FAILED, payload: {error}})
    yield put({type: FETCH_PENDING_ORDERS, payload: {loading: false}})
    yield put({
      type: DASHBOARD_SNACKBAR,
      payload: {show: true, message: 'An error has occurred', variant: 'warning'},
    })
  }
}

const fetchPendingOrdersHttpCall = () => axios.get('/orders/pending')
/**
 * User Sagas Watcher
 */
export default function* root() {
  yield all([
    takeLatest(KITCHEN_TEST_ACTION, testSaga),
    takeLatest(FETCH_PENDING_ORDERS.REQUEST, fetchPendingOrders),
  ])
}
