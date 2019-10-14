import {FETCH_ORDERS, DELIVER_ORDER, TAKE_ORDER} from './types'

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
    case DELIVER_ORDER.SUCCESS:
      return {
        ...state,
        orderList: [...state.orderList].filter(order => order.id !== payload.id),
      }
    case TAKE_ORDER.SUCCESS:
      return {
        ...state,
        orderList: [...state.orderList, payload],
      }
    default:
      return state
  }
}
