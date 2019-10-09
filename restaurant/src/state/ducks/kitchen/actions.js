import {
  KITCHEN_TEST_ACTION,
  KITCHEN_TEST_PLAIN_ACTION,
  FETCH_PENDING_ORDERS,
  DISPATCH_PRODUCT,
  DISPATCH_ORDER,
} from './types'

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
//Without payload
export const dispatchProduct = payload => ({
  type: DISPATCH_PRODUCT.REQUEST,
  payload,
})
//Without payload
export const dispatchOrder = payload => ({
  type: DISPATCH_ORDER.REQUEST,
  payload,
})
