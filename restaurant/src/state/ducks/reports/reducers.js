import {REPORTS_TEST_PLAIN_ACTION} from './types'
const initialState = {
  BillingState: {},
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case REPORTS_TEST_PLAIN_ACTION:
      return {
        ...state,
      }
    default:
      return state
  }
}
