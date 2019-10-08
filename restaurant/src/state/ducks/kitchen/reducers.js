import {KITCHEN_TEST_PLAIN_ACTION, FETCH_PENDING_ORDERS} from './types'
const initialState = {
  pendingOrders: [],
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_PENDING_ORDERS.SUCCESS:
      return {
        ...state,
        pendingOrders: payload,
      }
    default:
      return state
  }
}
