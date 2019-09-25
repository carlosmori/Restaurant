import {combineReducers} from 'redux'
import billingReducer from './billing/reducers'
import dashboardReducer from './dashboard/reducers'
import kitchenReducer from './kitchen/reducers'
import navigationListReducer from './navigation-list/reducers'
import ordersReducer from './orders/reducers'
import reportsReducer from './reports/reducers'
import tablesReducer from './tables/reducers'
import usersReducer from './users/reducers'
export {default as navigationList} from './navigation-list'

const createRootReducer = () =>
  combineReducers({
    Billing: billingReducer,
    Dashboard: dashboardReducer,
    Kitchen: kitchenReducer,
    // NavigationList: navigationListReducer,
    Orders: navigationListReducer,
    Reports: ordersReducer,
    Tables: reportsReducer,
    Users: tablesReducer,
  })
export default createRootReducer
