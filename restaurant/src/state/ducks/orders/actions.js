import {FETCH_ORDERS, DELIVER_ORDER} from './types'

export const fetchOrders = () => ({
  type: FETCH_ORDERS.REQUEST,
})
export const deliverOrder = payload => ({
  type: DELIVER_ORDER.REQUEST,
  payload,
})
