import {FETCH_PENDING_DISHES, DISPATCH_PRODUCT, CANCEL_PRODUCT} from './types'
const initialState = {
  pendingOrders: [],
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_PENDING_DISHES.SUCCESS:
      return {
        ...state,
        pendingOrders: [...payload],
      }
    case DISPATCH_PRODUCT.SUCCESS:
      //@todo refactor to unify success DISPATCH_PRODUCTid
      return {
        ...state,
        pendingOrders: state.pendingOrders.map(order => (order.id === payload.id ? {...order, ...payload} : order)),
      }
    case CANCEL_PRODUCT.SUCCESS:
      return {
        ...state,
        pendingOrders: state.pendingOrders.map(order => (order.id === payload.id ? {...order, ...payload} : order)),
      }
    default:
      return state
  }
}
