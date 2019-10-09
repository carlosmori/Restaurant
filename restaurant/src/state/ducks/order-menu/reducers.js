import {MODAL_TOGGLE, TAKE_ORDER} from './types'
const initialState = {
  isOrderMenuModalToggled: false,
  currentTableId: null,
  currentOrderHttp: {
    success: null,
    fail: null,
  },
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case MODAL_TOGGLE:
      return {
        ...state,
        isOrderMenuModalToggled: payload.isOrderMenuModalToggled,
        currentTableId: payload.tableId,
      }
    case TAKE_ORDER.SUCCESS:
      return {
        ...state,
        currentOrderHttp: {
          ...state.currentOrderHttp,
          success: payload.success,
        },
      }
    case TAKE_ORDER.FAILED:
      return {
        ...state,
        currentOrderHttp: {
          ...state.currentOrderHttp,
          fail: payload.error,
        },
      }
    default:
      return state
  }
}
