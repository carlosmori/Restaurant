import {
  FETCH_TABLE,
  FETCH_ORDER_MENU,
  UPDATE_TABLE,
  TAKE_ORDER,
  DELIVER_ORDER,
  CLOSE_TABLE,
  CANCEL_ORDER,
} from './types'
import {TABLE_STATUS_VALUE} from '../../../utils/enums/tableStatusEnum'
const initialState = {
  tablesList: [],
  productsList: [],
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_TABLE.SUCCESS:
      return {
        ...state,
        tablesList: payload.tables,
      }
    case FETCH_ORDER_MENU.SUCCESS:
      return {
        ...state,
        productsList: payload.products,
      }
    case TAKE_ORDER.SUCCESS:
      return {
        ...state,
        tablesList: state.tablesList.map(table =>
          table.id === payload.tableId
            ? {...table, currentOrder: payload, status: TABLE_STATUS_VALUE.CLIENTS_WAITING}
            : table
        ),
      }
    case DELIVER_ORDER.SUCCESS:
      return {
        ...state,
        tablesList: state.tablesList.map(table =>
          table.id === payload.tableId
            ? {...table, currentOrder: payload, status: TABLE_STATUS_VALUE.CLIENTS_EATING}
            : table
        ),
      }
    case CLOSE_TABLE.SUCCESS:
    case CANCEL_ORDER.SUCCESS:
      return {
        ...state,
        tablesList: state.tablesList.map(table =>
          table.id === payload.tableId ? {...table, currentOrder: null, status: TABLE_STATUS_VALUE.FREE} : table
        ),
      }
    default:
      return state
  }
}
