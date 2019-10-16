/**
 * @module Sagas/Session
 * @desc Session
 */
import {all, put, call, takeLatest} from 'redux-saga/effects'
import {axios} from '../../../utils/http/axios-singleton'

import {FETCH_PENDING_DISHES, DISPATCH_PRODUCT, DISPATCH_ORDER, CANCEL_PRODUCT} from './types'
import {DASHBOARD_TOGGLE_SNACKBAR, DASHBOARD_LOADING} from '../dashboard/types'

export function* fetchPendingDishes(action) {
  try {
    yield put({type: DASHBOARD_LOADING, payload: {loading: true}})
    const response = yield call(fetchPendingDishesHttpCall)
    yield put({
      type: FETCH_PENDING_DISHES.SUCCESS,
      payload: response.data,
    })
    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
  } catch (error) {
    yield put({type: FETCH_PENDING_DISHES.FAILED, payload: {error}})
    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
    yield put({
      type: DASHBOARD_TOGGLE_SNACKBAR,
      payload: {show: true, message: 'An error has occurred', variant: 'warning'},
    })
  }
}
export function* dispatchOrder(action) {
  const {productId} = action.payload
  const orderId = action.payload.id
  const productPayload = {payload: {productId, orderId}}
  try {
    yield put({type: DASHBOARD_LOADING, payload: {loading: true}})
    yield call(dispatchProduct, productPayload)
    const response = yield call(dispatchOrderHttpCall, action.payload)
    yield put({
      type: DISPATCH_ORDER.SUCCESS,
      payload: response.data,
    })
    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
    yield put({
      type: DASHBOARD_TOGGLE_SNACKBAR,
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
      type: DASHBOARD_TOGGLE_SNACKBAR,
      payload: {show: true, message: 'An error has occurred', variant: 'warning'},
    })
  }
}
export function* dispatchProduct(action) {
  try {
    yield put({type: DASHBOARD_LOADING, payload: {loading: true}})
    const response = yield call(dispatchProductHttpCall, action.payload)
    yield put({
      type: DISPATCH_PRODUCT.SUCCESS,
      payload: response.data,
    })
    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
    yield put({
      type: DASHBOARD_TOGGLE_SNACKBAR,
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
      type: DASHBOARD_TOGGLE_SNACKBAR,
      payload: {show: true, message: 'An error has occurred', variant: 'warning'},
    })
  }
}
export function* cancelProduct(action) {
  try {
    yield put({type: DASHBOARD_LOADING, payload: {loading: true}})
    const response = yield call(cancelProductHttpCall, action.payload)
    yield put({
      type: CANCEL_PRODUCT.SUCCESS,
      payload: response.data,
    })
    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
    yield put({
      type: DASHBOARD_TOGGLE_SNACKBAR,
      payload: {
        show: true,
        message: 'Product cancelled successfully',
        variant: 'success',
      },
    })
  } catch (error) {
    yield put({type: CANCEL_PRODUCT.FAILED, payload: {error}})
    yield put({type: DASHBOARD_LOADING, payload: {loading: false}})
    yield put({
      type: DASHBOARD_TOGGLE_SNACKBAR,
      payload: {show: true, message: 'An error has occurred', variant: 'warning'},
    })
  }
}
const dispatchProductHttpCall = payload => axios.put('/orders/dispatchProduct', {...payload})
const cancelProductHttpCall = payload => axios.put('/orders/cancelProduct', {...payload})
const dispatchOrderHttpCall = payload => axios.put('/orders', {...payload})
const fetchPendingDishesHttpCall = () => axios.get('/orders/pendingDishes')

export default function* root() {
  yield all([
    takeLatest(FETCH_PENDING_DISHES.REQUEST, fetchPendingDishes),
    takeLatest(DISPATCH_PRODUCT.REQUEST, dispatchProduct),
    takeLatest(DISPATCH_ORDER.REQUEST, dispatchOrder),
    takeLatest(CANCEL_PRODUCT.REQUEST, cancelProduct),
  ])
}
