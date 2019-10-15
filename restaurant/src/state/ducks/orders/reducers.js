import {FETCH_ORDERS, DELIVER_ORDER} from './types'

const initialState = {
  orderList: [],
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_ORDERS.SUCCESS:
      return {
        ...state,
        orderList: [...payload.success],
      }
    default:
      return state
  }
}
