/**
 * @module Sagas/Session
 * @desc Session
 */
import {all, put, call, takeLatest} from 'redux-saga/effects'
import {DISPATCH_ORDER} from './types'
import {axios} from '../../../utils/http/axios-singleton'

/**
 * Login
 */
export function* dispatchOrder(action) {
  try {
    const response = yield call(dispatchOrderHttpCall, action.payload)
    //users
    // const users = response.data

    // dispatch a success action to the store with the new dog
    yield put({type: DISPATCH_ORDER.SUCCESS, payload: response.data})
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: DISPATCH_ORDER.FAILED, error})
  }
}

const dispatchOrderHttpCall = order => axios.post('/orders', {...order})
/**
 * User Sagas Watcher
 */
export default function* root() {
  yield all([
    takeLatest(DISPATCH_ORDER.REQUEST, dispatchOrder),
  ])
}
