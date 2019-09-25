import {KITCHEN_TEST_ACTION, KITCHEN_TEST_PLAIN_ACTION} from './types'

//With payload
export const kitchenTestAction = payload => ({
  type: KITCHEN_TEST_ACTION,
  payload,
})
//Without payload
export const kitchenTestPlainAction = () => ({
  type: KITCHEN_TEST_PLAIN_ACTION,
})
