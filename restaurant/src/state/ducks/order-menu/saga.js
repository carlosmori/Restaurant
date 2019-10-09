/**
 * @module Sagas/Session
 * @desc Session
 */
import {all, put, call, takeLatest} from 'redux-saga/effects'
import {axios} from '../../../utils/http/axios-singleton'
import {DASHBOARD_LOADING, DASHBOARD_SNACKBAR} from '../dashboard/types'
import {TAKE_ORDER} from './types'

/**
 * Login
 */
export function* takeOrder(action) {
  try {
    yield put({type: DASHBOARD_LOADING, payload: {loading: true}})
    const response = yield call(takeOrderHttpCall, action.payload)
    yield timeout(3000)
    yield put({
      type: TAKE_ORDER.SUCCESS,
      payload: {success: response.data},
    })
    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
    yield put({
      type: DASHBOARD_SNACKBAR,
      payload: {show: true, message: 'Order dispatched successfully', variant: 'success'},
    })
  } catch (error) {
    yield put({type: TAKE_ORDER.FAILED, payload: {error}})
    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
    yield put({
      type: DASHBOARD_SNACKBAR,
      payload: {show: true, message: 'An error has occurred', variant: 'warning'},
    })
  }
}

const takeOrderHttpCall = order => axios.post('/orders', {...order})
/**
 * User Sagas Watcher
 */
export default function* root() {
  yield all([takeLatest(TAKE_ORDER.REQUEST, takeOrder)])
}
const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
