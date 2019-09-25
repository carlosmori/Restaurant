import {ORDERS_TEST_ACTION, ORDERS_TEST_PLAIN_ACTION} from './types'

//With payload
export const ordersTestAction = payload => ({
  type: ORDERS_TEST_ACTION,
  payload,
})
//Without payload
export const ordersTestPlainAction = () => ({
  type: ORDERS_TEST_PLAIN_ACTION,
})
