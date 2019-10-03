import {combineReducers} from 'redux'
import billingReducer from './billing/reducers'
import dashboardReducer from './dashboard/reducers'
import kitchenReducer from './kitchen/reducers'
import navigationListReducer from './navigation-list/reducers'
import ordersReducer from './orders/reducers'
import reportsReducer from './reports/reducers'
import tablesReducer from './tables/reducers'
import usersReducer from './users/reducers'
import orderMenuReducer from './order-menu/reducers'
export {default as navigationList} from './navigation-list'

const createRootReducer = () =>
  combineReducers({
    billing: billingReducer,
    dashboard: dashboardReducer,
    kitchen: kitchenReducer,
    navigationList: navigationListReducer,
    orders: ordersReducer,
    reports: reportsReducer,
    tables: tablesReducer,
    users: usersReducer,
    orderMenu: orderMenuReducer,
  })
export default createRootReducer
