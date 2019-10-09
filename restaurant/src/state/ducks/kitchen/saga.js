/**
 * @module Sagas/Session
 * @desc Session
 */
import {all, put, call, takeLatest} from 'redux-saga/effects'
import {axios} from '../../../utils/http/axios-singleton'

import {FETCH_PENDING_ORDERS, DISPATCH_PRODUCT, DISPATCH_ORDER} from './types'
import {DASHBOARD_SNACKBAR, DASHBOARD_LOADING} from '../dashboard/types'

export function* fetchPendingOrders(action) {
  try {
    yield put({type: DASHBOARD_LOADING, payload: {loading: true}})
    const response = yield call(fetchPendingOrdersHttpCall)
    yield put({
      type: FETCH_PENDING_ORDERS.SUCCESS,
      payload: response.data,
    })
    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
  } catch (error) {
    yield put({type: FETCH_PENDING_ORDERS.FAILED, payload: {error}})
    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
    yield put({
      type: DASHBOARD_SNACKBAR,
      payload: {show: true, message: 'An error has occurred', variant: 'warning'},
    })
  }
}
export function* dispatchProduct(action) {
  try {
    yield put({type: DASHBOARD_LOADING, payload: {loading: true}})
    const response = yield call(dispatchProductHttpCall, action.payload)
    yield timeout(500)
    yield put({
      type: DISPATCH_PRODUCT.SUCCESS,
      payload: response.data,
    })
    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
    yield put({
      type: DASHBOARD_SNACKBAR,
      payload: {
        show: true,
        message: 'Product dispatched successfully',
        variant: 'success',
      },
    })
  } catch (error) {
    yield put({type: DISPATCH_PRODUCT.FAILED, payload: {error}})
    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
    yield put({
      type: DASHBOARD_SNACKBAR,
      payload: {show: true, message: 'An error has occurred', variant: 'warning'},
    })
  }
}
export function* dispatchOrder(action) {
  try {
    yield put({type: DASHBOARD_LOADING, payload: {loading: true}})
    const response = yield call(dispatchOrderHttpCall, action.payload)
    yield timeout(500)
    //@todo Dispatch order success should modify order reducer, to update the status and allow the user
    //to deliver the order to the table
    yield put({
      type: DISPATCH_ORDER.SUCCESS,
      payload: response.data,
    })
    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
    yield put({
      type: DASHBOARD_SNACKBAR,
      payload: {
        show: true,
        message: 'Order dispatched successfully',
        variant: 'success',
      },
    })
  } catch (error) {
    yield put({type: DISPATCH_ORDER.FAILED, payload: {error}})
    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
    yield put({
      type: DASHBOARD_SNACKBAR,
      payload: {show: true, message: 'An error has occurred', variant: 'warning'},
    })
  }
}
const dispatchProductHttpCall = payload => axios.put('/orders/dispatch', {...payload})
const dispatchOrderHttpCall = payload => axios.put('/orders/dispatch', {...payload})
const fetchPendingOrdersHttpCall = () => axios.get('/orders/pending')

export default function* root() {
  yield all([
    takeLatest(FETCH_PENDING_ORDERS.REQUEST, fetchPendingOrders),
    takeLatest(DISPATCH_PRODUCT.REQUEST, dispatchProduct),
    takeLatest(DISPATCH_ORDER.REQUEST, dispatchOrder),
  ])
}

const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
