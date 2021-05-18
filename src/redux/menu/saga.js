import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects'
import {
  GET_MENUS,
  GET_MENU,
  GET_MENU_GROUP,
  GET_MENU_ITEM,
  CREATE_MENU_GROUP,
  CREATE_MENU_ITEM_SUCCESS,
  CREATE_MENU_ITEM,
  CREATE_TOPPING_GROUP,
  CREATE_TOPPING_ITEM,
  GET_TOPPING_GROUP,
} from '../actions'
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
  createMenuGroupSuccess,
  createMenuGroupError,
  createMenuItemSuccess,
  createMenuItemError,
  createToppingGroupSuccess,
  createToppingGroupError,
  createToppingItemSuccess,
  createToppingItemError,
  getToppingGroupSuccess,
  getToppingGroupError,
} from './actions'
import { NotificationManager } from 'src/components/common/react-notifications'

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
    yield put(getMenuItemsError('Something went wrong in getMenus Saga!'))
  }
}

const createMenuGroupAsync = async (merchantId, restaurantId, menuId, data) => {
  const accessToken = localStorage.getItem('access_token')
  try {
    let response
    response = await axios({
      method: 'POST',
      url: `${USER_URL}/${merchantId}/restaurant/${restaurantId}/menu/${menuId}/menu-group`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data,
    })
    return response
  } catch (error) {
    return getErrorMessage(error)
  }
}

function* createMenuGroup({ payload }) {
  console.log(payload)
  const { merchantId, restaurantId, menuId, data } = payload
  try {
    const response = yield call(
      createMenuGroupAsync,
      merchantId,
      restaurantId,
      menuId,
      data
    )
    console.log(response)
    if (!response.message) {
      const {
        data: {
          data: { menuGroup = [] },
        },
      } = response
      yield put(createMenuGroupSuccess(menuGroup))
    } else {
      console.log(response.message)
      yield put(createMenuGroupError(response.message))
    }
  } catch (error) {
    console.log('ERR', error.response)
    yield put(
      createMenuGroupError('Something went wrong in createMenuGroup Saga!')
    )
  }
}

const createMenuItemAsync = async (
  merchantId,
  restaurantId,
  menuId,
  menuGroupId,
  data
) => {
  const accessToken = localStorage.getItem('access_token')
  try {
    let response
    response = await axios({
      method: 'POST',
      url: `${USER_URL}/${merchantId}/restaurant/${restaurantId}/menu/${menuId}/menu-item`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        ...data,
        price: +data.price,
        menuGroupId,
      },
    })
    return response
  } catch (error) {
    return getErrorMessage(error)
  }
}

function* createMenuItem({ payload }) {
  console.log(payload)
  const { merchantId, restaurantId, menuId, menuGroupId, data, history } =
    payload
  try {
    const response = yield call(
      createMenuItemAsync,
      merchantId,
      restaurantId,
      menuId,
      menuGroupId,
      data
    )
    console.log(response)
    if (!response.message) {
      const {
        data: {
          data: { menuItem = {} },
        },
      } = response
      yield put(createMenuItemSuccess(menuItem))
      NotificationManager.success('Menu item created', 'Success', 3000)
      // history.push('/app/dishes/create/menu-item')
      // history.push('/')
    } else {
      console.log(response.message)
      yield put(createMenuItemError(response.message))
    }
  } catch (error) {
    console.log('ERR', error.response)
    yield put(
      createMenuGroupError('Something went wrong in createMenuGroup Saga!')
    )
  }
}

const createToppingGroupAsync = async (
  merchantId,
  restaurantId,
  menuId,
  data
) => {
  const accessToken = localStorage.getItem('access_token')
  try {
    let response
    response = await axios({
      method: 'POST',
      url: `${USER_URL}/${merchantId}/restaurant/${restaurantId}/menu/${menuId}/topping-group`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data,
    })
    return response
  } catch (error) {
    return getErrorMessage(error)
  }
}

function* createToppingGroup({ payload }) {
  console.log(payload)
  const { merchantId, restaurantId, menuId, data } = payload
  try {
    const response = yield call(
      createToppingGroupAsync,
      merchantId,
      restaurantId,
      menuId,
      data
    )
    console.log(response)
    if (!response.message) {
      const {
        data: {
          data: { toppingGroup = {} },
        },
      } = response
      yield put(createToppingGroupSuccess(toppingGroup))
      NotificationManager.success('New topping group created', 'Success', 3000)
    } else {
      console.log(response.message)
      NotificationManager.error(response.message, 'Error', 3000)
      yield put(createToppingGroupError(response.message))
    }
  } catch (error) {
    console.log('ERR', error.response)
    NotificationManager.error(error.message, 'Error', 3000)
    yield put(
      createToppingGroupError(
        'Something went wrong in createToppingGroup Saga!'
      )
    )
  }
}

const createToppingItemAsync = async (
  merchantId,
  restaurantId,
  menuId,
  toppingGroupId,
  data
) => {
  const accessToken = localStorage.getItem('access_token')
  try {
    let response
    response = await axios({
      method: 'POST',
      url: `${USER_URL}/${merchantId}/restaurant/${restaurantId}/menu/${menuId}/topping-item`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        ...data,
        price: +data.price,
        toppingGroupId,
      },
    })
    return response
  } catch (error) {
    return getErrorMessage(error)
  }
}

function* createToppingItem({ payload }) {
  console.log(payload)
  const { merchantId, restaurantId, menuId, toppingGroupId, data } = payload
  try {
    const response = yield call(
      createToppingItemAsync,
      merchantId,
      restaurantId,
      menuId,
      toppingGroupId,
      data
    )
    console.log(response)
    if (!response.message) {
      const {
        data: {
          data: { toppingItem = {} },
        },
      } = response
      yield put(createToppingItemSuccess(toppingItem))
      NotificationManager.success('New topping item created', 'Success', 3000)
    } else {
      console.log(response.message)
      yield put(createToppingItemError(response.message))
    }
  } catch (error) {
    console.log('ERR', error.response)
    yield put(
      createToppingItemError('Something went wrong in createToppingItem Saga!')
    )
  }
}

const getToppingsGroupAsync = async (merchantId, restaurantId, menuId) => {
  const accessToken = localStorage.getItem('access_token')
  try {
    let response
    response = await axios({
      method: 'GET',
      url: `${USER_URL}/${merchantId}/restaurant/${restaurantId}/menu/${menuId}/topping-group`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response
  } catch (error) {
    return getErrorMessage(error)
  }
}

function* getToppingGroups({ payload }) {
  console.log(payload)
  const { merchantId, restaurantId, menuId } = payload
  try {
    const response = yield call(
      getToppingsGroupAsync,
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
      yield put(getToppingGroupSuccess(results))
    } else {
      console.log(response.message)
      yield put(getToppingGroupError(response.message))
    }
  } catch (error) {
    console.log('ERR', error.response)
    yield put(
      getToppingGroupError('Something went wrong in getToppingGroup Saga!')
    )
  }
}

// export function* watchGetMenuList() {
//   yield takeEvery(GET_MENUS, getMenus)
// }

// export function* watchGetMenuGroup() {
//   yield takeEvery(GET_MENU_GROUP, getMenuGroup)
// }

// export function* watchGetMenuItems() {
//   yield takeEvery(GET_MENU_ITEM, getMenuItems)
// }

// Get Menu All
export function* watchGetMenu() {
  yield takeEvery(GET_MENUS, getMenus)
  yield takeEvery(GET_MENU, getMenus)
  yield takeEvery(GET_MENU_GROUP, getMenuGroup)
  yield takeEvery(GET_MENU_ITEM, getMenuItems)
  yield takeEvery(GET_TOPPING_GROUP, getToppingGroups)
}

export function* watchCreateMenu() {
  yield takeEvery(CREATE_MENU_GROUP, createMenuGroup)
  yield takeEvery(CREATE_MENU_ITEM, createMenuItem)
  yield takeEvery(CREATE_TOPPING_GROUP, createToppingGroup)
  yield takeEvery(CREATE_TOPPING_ITEM, createToppingItem)
}

export default function* rootSaga() {
  yield all([fork(watchGetMenu), fork(watchCreateMenu)])
}
