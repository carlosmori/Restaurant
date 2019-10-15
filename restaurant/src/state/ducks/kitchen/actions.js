import {
  KITCHEN_TEST_ACTION,
  KITCHEN_TEST_PLAIN_ACTION,
  FETCH_PENDING_DISHES,
  DISPATCH_PRODUCT,
  DISPATCH_ORDER,
  CANCEL_PRODUCT,
} from './types'

export const kitchenTestAction = payload => ({
  type: KITCHEN_TEST_ACTION,
  payload,
})
export const kitchenTestPlainAction = () => ({
  type: KITCHEN_TEST_PLAIN_ACTION,
})
export const fetchPendingDishes = () => ({
  type: FETCH_PENDING_DISHES.REQUEST,
})
export const dispatchProduct = payload => ({
  type: DISPATCH_PRODUCT.REQUEST,
  payload,
})
export const dispatchOrder = payload => ({
  type: DISPATCH_ORDER.REQUEST,
  payload,
})
export const cancelProduct = payload => ({
  type: CANCEL_PRODUCT.REQUEST,
  payload,
})
