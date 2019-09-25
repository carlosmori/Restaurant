import {BILLING_TEST_ACTION, BILLING_TEST_PLAIN_ACTION} from './types'

//With payload
export const billingTestAction = payload => ({
  type: BILLING_TEST_ACTION,
  payload,
})
//Without payload
export const billingTestPlainAction = () => ({
  type: BILLING_TEST_PLAIN_ACTION,
})
