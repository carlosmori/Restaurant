/**
 * @module Sagas/Session
 * @desc Session
 */
import {all, call, put, takeLatest} from 'redux-saga/effects'
import {
  TABLES_TEST_ACTION,
  TABLES_TEST_ACTION_FAILED,
  TABLES_TEST_ACTION_SUCCESS,
  FETCH_TABLE,
} from './types'
import {axios} from '../../../utils/http/axios-singleton'

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
export function* fetchTables() {
  try {
    const response = yield call(fetchTableHttpCall)
    //tables
    const tables = response.data

    // dispatch a success action to the store with the new dog
    yield put({type: FETCH_TABLE.SUCCESS, payload: {tables}})
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: FETCH_TABLE.FAILED, error})
  }
}
const fetchTableHttpCall = () => axios.get(`/tables`)

/**
 * User Sagas Watcher
 */
export default function* root() {
  yield all([
    takeLatest(TABLES_TEST_ACTION, testSaga),
    takeLatest(FETCH_TABLE.REQUEST, fetchTables),
  ])
}
