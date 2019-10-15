import {DASHBOARD_LOADING, DASHBOARD_SNACKBAR} from './types'
const initialState = {
  snackbar: {show: false, message: '', variant: ''},
  displayLoadingDialog: false,
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case DASHBOARD_SNACKBAR:
      const {show, message, variant} = payload
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          show,
          message,
          variant,
        },
      }
    case DASHBOARD_LOADING:
      return {
        ...state,
        displayLoadingDialog: payload.loading,
      }
    default:
      return state
  }
}
