import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects'
import {
  CREATE_RESTAURANT,
  GET_RESTAURANT,
  VERIFY_RESTAURANT,
} from '../actions'
import { getErrorMessage } from '../utils'
import axios from 'axios'
import { USER_URL, ADMIN_URL } from 'src/constants/config'
import {
  getMerchantSuccess,
  getMerchantError,
  getRestaurantSuccess,
  getRestaurantError,
  createRestaurantSuccess,
  createRestaurantError,
  verifyRestaurantSuccess,
  verifyRestaurantError,
} from './actions'
import { NotificationManager } from 'src/components/common/react-notifications'

const getRestaurantAsync = async (merchantId, restaurantId) => {
  const accessToken = localStorage.getItem('access_token')
  try {
    let response
    response = await axios({
      method: 'GET',
      url: `${USER_URL}/${merchantId}/restaurant/${restaurantId}`,
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
  const { merchantId, restaurantId } = payload
  try {
    const response = yield call(getRestaurantAsync, merchantId, restaurantId)
    console.log(response)
    if (!response.message) {
      const {
        data: {
          data: { restaurant },
        },
      } = response
      yield put(getRestaurantSuccess(restaurant))
    } else {
      console.log(response.message)
      yield put(getRestaurantError(response.message))
    }
  } catch (error) {
    // console.log('ERR', error.response)
    // yield put(registerStaffError('Something went wrong in Saga!'))
  }
}

const createRestaurantAsync = async (merchantId, restaurant) => {
  const accessToken = localStorage.getItem('access_token')
  try {
    let response
    response = await axios({
      method: 'POST',
      url: `${USER_URL}/${merchantId}/restaurant`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        ...restaurant,
      },
    })
    return response
  } catch (error) {
    return getErrorMessage(error)
  }
}

function* createRestaurant({ payload }) {
  // const { username, email, password } = payload.user
  const { merchantId, restaurant, history } = payload
  try {
    const response = yield call(createRestaurantAsync, merchantId, restaurant)
    console.log(response)
    if (!response.message) {
      const {
        data: {
          data: { restaurant },
        },
      } = response
      NotificationManager.success('Restaurant was created', 'Success', 3000)

      yield put(createRestaurantSuccess(restaurant))
      history.push('/restaurant/select')
    } else {
      NotificationManager.success(response.message, 'Error', 3000)
      console.log(response.message)
      yield put(createRestaurantError(response.message))
    }
  } catch (error) {
    console.log('ERR', error.response)
    NotificationManager.success(error.message, 'Error', 3000)
    yield put(createRestaurantError(error.message))
    // yield put(registerStaffError('Something went wrong in Saga!'))
  }
}

const verifyRestaurantAsync = async (restaurantId) => {
  const accessToken = localStorage.getItem('access_token')
  try {
    let response
    response = await axios({
      method: 'POST',
      url: `${ADMIN_URL}/verify-restaurant`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        restaurantId,
      },
    })
    return response
  } catch (error) {
    return getErrorMessage(error)
  }
}

function* verifyRestaurant({ payload }) {
  // const { username, email, password } = payload.user
  const { restaurantId } = payload
  try {
    const response = yield call(verifyRestaurantAsync, restaurantId)
    console.log(response)
    if (!response.message) {
      const {
        data: {
          data: { posAppKey },
        },
      } = response
      NotificationManager.success(
        `Restaurant verified \n POS app key: ${posAppKey}`,
        'Success',
        3000
      )

      yield put(verifyRestaurantSuccess(posAppKey))
    } else {
      NotificationManager.success(response.message, 'Error', 3000)
      console.log(response.message)
      yield put(verifyRestaurantError(response.message))
    }
  } catch (error) {
    console.log('ERR', error.response)
    NotificationManager.success(error.message, 'Error', 3000)
    yield put(createRestaurantError(error.message))
    // yield put(registerStaffError('Something went wrong in Saga!'))
  }
}

export function* watchGetRestaurant() {
  // yield takeEvery(REGISTER_USER, loginWithUsernamePassword)
  yield takeEvery(GET_RESTAURANT, getRestaurant)
  yield takeEvery(CREATE_RESTAURANT, createRestaurant)
}

export function* watchVerifyRestaurant() {
  // yield takeEvery(REGISTER_USER, loginWithUsernamePassword)
  yield takeEvery(VERIFY_RESTAURANT, verifyRestaurant)
}

export default function* rootSaga() {
  yield all([fork(watchGetRestaurant), fork(watchVerifyRestaurant)])
}
