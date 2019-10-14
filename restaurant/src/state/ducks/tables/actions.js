import {FETCH_TABLE, FETCH_ORDER_MENU, UPDATE_TABLE, TAKE_ORDER} from './types'

export const fetchTables = () => ({
  type: FETCH_TABLE.REQUEST,
})

//With payload
export const fetchOrderMenu = payload => ({
  type: FETCH_ORDER_MENU.REQUEST,
  payload,
})
//With payload
export const updateTable = payload => ({
  type: UPDATE_TABLE,
  payload,
})

export const takeOrder = payload => ({
  type: TAKE_ORDER.REQUEST,
  payload,
})
