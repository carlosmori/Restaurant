import {all, fork} from 'redux-saga/effects'
import billingSaga from '../../ducks/billing/saga'
import dashboardSaga from '../../ducks/dashboard/saga'
import kitchenSaga from '../../ducks/kitchen/saga'
// import navigationListSaga from '../../ducks/navigation-list/saga'
import ordersSaga from '../../ducks/orders/saga'
import reportsSaga from '../../ducks/reports/saga'
import tablesSaga from '../../ducks/tables/saga'
import usersSaga from '../../ducks/users/saga'
import orderMenuSaga from '../../ducks/order-menu/saga'

export function* rootSaga() {
  yield all([
    fork(billingSaga),
    fork(dashboardSaga),
    fork(kitchenSaga),
    // fork(navigationListSaga),
    fork(ordersSaga),
    fork(reportsSaga),
    fork(tablesSaga),
    fork(usersSaga),
    fork(orderMenuSaga),
  ])
}
