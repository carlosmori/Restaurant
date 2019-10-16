import {FETCH_TABLE, FETCH_ORDER_MENU, UPDATE_TABLE, TAKE_ORDER, DELIVER_ORDER, CLOSE_TABLE, CANCEL_ORDER, UPDATE_ORDER} from './types'

export const fetchTables = () => ({
  type: FETCH_TABLE.REQUEST,
})

export const fetchOrderMenu = payload => ({
  type: FETCH_ORDER_MENU.REQUEST,
  payload,
})

export const updateTable = payload => ({
  type: UPDATE_TABLE,
  payload,
})

export const takeOrder = payload => ({
  type: TAKE_ORDER.REQUEST,
  payload,
})
export const cancelOrder = payload => ({
  type: CANCEL_ORDER.REQUEST,
  payload,
})

export const updateOrder = payload => ({
  type: UPDATE_ORDER.REQUEST,
  payload,
})
export const deliverOrder = payload => ({
  type: DELIVER_ORDER.REQUEST,
  payload,
})

export const closeTable = payload => ({
  type: CLOSE_TABLE.REQUEST,
  payload,
})
