import { DASHBOARD_TOGGLE_SNACKBAR } from "./types";

export const toggleSnackbar = payload => ({
  type: DASHBOARD_TOGGLE_SNACKBAR,
  payload,
})
