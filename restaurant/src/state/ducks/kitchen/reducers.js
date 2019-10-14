import {FETCH_PENDING_DISHES, DISPATCH_PRODUCT} from './types'
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
      const orderId = payload.id
      const productId = payload.products[0].id
      let newPendingOrders = state.pendingOrders
      const orderIndex = newPendingOrders.findIndex(order => order.id === orderId)
      const filteredProductsArray = newPendingOrders[orderIndex].products.filter(
        product => product.id !== productId
      )
      newPendingOrders[orderIndex].products = filteredProductsArray
      return {
        ...state,
        pendingOrders: [...newPendingOrders],
      }
    default:
      return state
  }
}
