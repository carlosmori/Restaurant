/**
 * @module Sagas/Session
 * @desc Session
 */
import {all, put, call, takeLatest} from 'redux-saga/effects'
import {axios} from '../../../utils/http/axios-singleton'
import {DASHBOARD_LOADING, DASHBOARD_SNACKBAR} from '../dashboard/types'
import {TAKE_ORDER} from './types'

/**
 * User Sagas Watcher
 */
export default function* root() {}
