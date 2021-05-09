import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects'
import { GET_RESTAURANT } from '../actions'
import { getErrorMessage } from '../utils'
import axios from 'axios'
import { USER_URL } from 'src/constants/config'
import { getMerchantSuccess, getMerchantError } from './actions'

const getRestaurantAsync = async (id) => {
  const accessToken = localStorage.getItem('access_token')
  try {
    let response
    response = await axios({
      method: 'GET',
      url: `${USER_URL}/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response
  } catch (error) {
    return getErrorMessage(error)
  }
}

function* getRestaurant({ payload }) {
  // const { username, email, password } = payload.user
  const { id } = payload
  try {
    const response = yield call(getRestaurantAsync, id)
    if (!response.message) {
      const {
        data: {
          data: { user },
        },
      } = response
      yield put(getMerchantSuccess(user))
    } else {
      console.log(response.message)
      yield put(getMerchantError(response.message))
    }
  } catch (error) {
    // console.log('ERR', error.response)
    // yield put(registerStaffError('Something went wrong in Saga!'))
  }
}

export function* watchGetRestaurant() {
  // yield takeEvery(REGISTER_USER, loginWithUsernamePassword)
  yield takeEvery(GET_RESTAURANT, getRestaurant)
}

export default function* rootSaga() {
  yield all([fork(watchGetRestaurant)])
}
