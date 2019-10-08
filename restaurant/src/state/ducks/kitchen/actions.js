import {KITCHEN_TEST_ACTION, KITCHEN_TEST_PLAIN_ACTION, FETCH_PENDING_ORDERS} from './types'

//With payload
export const kitchenTestAction = payload => ({
  type: KITCHEN_TEST_ACTION,
  payload,
})
//Without payload
export const kitchenTestPlainAction = () => ({
  type: KITCHEN_TEST_PLAIN_ACTION,
})
//Without payload
export const fetchPendingOrders = () => ({
  type: FETCH_PENDING_ORDERS.REQUEST,
})
