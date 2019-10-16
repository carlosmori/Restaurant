import {all, fork} from 'redux-saga/effects'
import billingSaga from '../../ducks/billing/saga'
import kitchenSaga from '../../ducks/kitchen/saga'
import ordersSaga from '../../ducks/orders/saga'
import reportsSaga from '../../ducks/reports/saga'
import tablesSaga from '../../ducks/tables/saga'
import usersSaga from '../../ducks/users/saga'

export function* rootSaga() {
  yield all([
    fork(billingSaga),
    fork(kitchenSaga),
    fork(ordersSaga),
    fork(reportsSaga),
    fork(tablesSaga),
    fork(usersSaga),
  ])
}
