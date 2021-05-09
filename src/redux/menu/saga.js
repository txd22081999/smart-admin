import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects'
import { GET_MENUS, GET_MENU, GET_MENU_GROUP, GET_MENU_ITEM } from '../actions'
import { getErrorMessage } from '../utils'
import axios from 'axios'
import { USER_URL } from 'src/constants/config'
import {
  getMenusSuccess,
  getMenusError,
  getMenuGroupSuccess,
  getMenuGroupError,
  getMenuItemsSuccess,
  getMenuItemsError,
} from './actions'

const getMenuAsync = async (merchantId, restaurantId) => {
  const accessToken = localStorage.getItem('access_token')
  try {
    let response
    response = await axios({
      method: 'GET',
      url: `${USER_URL}/${merchantId}/restaurant/${restaurantId}/menu`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response
  } catch (error) {
    return getErrorMessage(error)
  }
}

function* getMenus({ payload }) {
  const { merchantId, restaurantId } = payload
  try {
    const response = yield call(getMenuAsync, merchantId, restaurantId)
    if (!response.message) {
      const {
        data: {
          data: { results = [] },
        },
      } = response
      yield put(getMenusSuccess(results))
    } else {
      console.log(response.message)
      yield put(getMenusError(response.message))
    }
  } catch (error) {
    console.log('ERR', error.response)
    yield put(getMenusError('Something went wrong in getMenus Saga!'))
  }
}

function* getMenu({ payload }) {
  const { merchantId, restaurantId } = payload
  try {
    const response = yield call(getMenuAsync, merchantId, restaurantId)
    if (!response.message) {
      const {
        data: {
          data: { results = [] },
        },
      } = response
      yield put(getMenusSuccess(results))
    } else {
      console.log(response.message)
      yield put(getMenusError(response.message))
    }
  } catch (error) {
    console.log('ERR', error.response)
    yield put(getMenusError('Something went wrong in getMenus Saga!'))
  }
}

const getMenuGroupAsync = async (merchantId, restaurantId, menuId) => {
  const accessToken = localStorage.getItem('access_token')
  try {
    let response
    response = await axios({
      method: 'GET',
      url: `${USER_URL}/${merchantId}/restaurant/${restaurantId}/menu/${menuId}/menu-group`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response
  } catch (error) {
    return getErrorMessage(error)
  }
}

function* getMenuGroup({ payload }) {
  const { merchantId, restaurantId, menuId } = payload
  try {
    const response = yield call(
      getMenuGroupAsync,
      merchantId,
      restaurantId,
      menuId
    )
    console.log(response)
    if (!response.message) {
      const {
        data: {
          data: { results = [] },
        },
      } = response
      yield put(getMenuGroupSuccess(results))
    } else {
      console.log(response.message)
      yield put(getMenuGroupError(response.message))
    }
  } catch (error) {
    console.log('ERR', error.response)
    yield put(getMenuGroupError('Something went wrong in getMenus Saga!'))
  }
}

const getMenuItemsAsync = async (merchantId, restaurantId, menuId) => {
  const accessToken = localStorage.getItem('access_token')
  try {
    let response
    response = await axios({
      method: 'GET',
      url: `${USER_URL}/${merchantId}/restaurant/${restaurantId}/menu/${menuId}/menu-item`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response
  } catch (error) {
    return getErrorMessage(error)
  }
}

function* getMenuItems({ payload }) {
  console.log('ASDS')
  const { merchantId, restaurantId, menuId } = payload
  try {
    const response = yield call(
      getMenuItemsAsync,
      merchantId,
      restaurantId,
      menuId
    )
    console.log(response)
    if (!response.message) {
      const {
        data: {
          data: { results = [] },
        },
      } = response
      yield put(getMenuItemsSuccess(results))
    } else {
      console.log(response.message)
      yield put(getMenuItemsError(response.message))
    }
  } catch (error) {
    console.log('ERR', error.response)
    // yield put(getMenuGroupError('Something went wrong in getMenus Saga!'))
  }
}

export function* watchGetMenuList() {
  yield takeEvery(GET_MENUS, getMenus)
}

export function* watchGetMenu() {
  yield takeEvery(GET_MENU, getMenus)
}

export function* watchGetMenuGroup() {
  yield takeEvery(GET_MENU_GROUP, getMenuGroup)
}

export function* watchGetMenuItems() {
  yield takeEvery(GET_MENU_ITEM, getMenuItems)
}

export default function* rootSaga() {
  yield all([
    fork(watchGetMenuList),
    fork(watchGetMenu),
    fork(watchGetMenuGroup),
    fork(watchGetMenuItems),
  ])
}
