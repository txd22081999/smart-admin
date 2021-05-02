import { all } from 'redux-saga/effects'
import authSagas from './auth/saga'
import staffSagas from './staff/saga'

console.log(staffSagas)

export default function* rootSaga(getState) {
  yield all([authSagas(), staffSagas()])
}
