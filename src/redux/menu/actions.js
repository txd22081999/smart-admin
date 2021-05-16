import {
  GET_MENUS,
  GET_MENUS_SUCCESS,
  GET_MENUS_ERROR,
  GET_MENU,
  GET_MENU_SUCCESS,
  GET_MENU_ERROR,
  GET_MENU_GROUP,
  GET_MENU_GROUP_SUCCESS,
  GET_MENU_GROUP_ERROR,
  SET_MENU,
  GET_MENU_ITEM,
  GET_MENU_ITEM_SUCCESS,
  GET_MENU_ITEM_ERROR,
  CREATE_MENU_GROUP,
  CREATE_MENU_GROUP_SUCCESS,
  CREATE_MENU_GROUP_ERROR,
  CREATE_MENU_ITEM,
  CREATE_MENU_ITEM_SUCCESS,
  CREATE_MENU_ITEM_ERROR,
  SET_TOPPING_GROUP,
  CREATE_TOPPING_GROUP,
  CREATE_TOPPING_GROUP_SUCCESS,
  CREATE_TOPPING_GROUP_ERROR,
} from '../actions'

export const getMenus = (merchantId, restaurantId) => ({
  type: GET_MENUS,
  payload: { merchantId, restaurantId },
})

export const getMenusSuccess = (menus) => ({
  type: GET_MENUS_SUCCESS,
  payload: { menus },
})

export const getMenusError = (error) => ({
  type: GET_MENUS_ERROR,
  payload: { message: error },
})

export const setMenu = (menuId) => ({
  type: SET_MENU,
  payload: { menuId },
})

export const getMenu = (merchantId, restaurantId) => ({
  type: GET_MENU,
  payload: { merchantId, restaurantId },
})

export const getMenuSuccess = (menu) => ({
  type: GET_MENU_SUCCESS,
  payload: { menu },
})

export const getMenuError = (error) => ({
  type: GET_MENU_ERROR,
  payload: { message: error },
})

export const getMenuGroup = ({ merchantId, restaurantId, menuId }) => ({
  type: GET_MENU_GROUP,
  payload: { merchantId, restaurantId, menuId },
})

export const getMenuGroupSuccess = (menuGroup) => ({
  type: GET_MENU_GROUP_SUCCESS,
  payload: { menuGroup },
})

export const getMenuGroupError = (error) => ({
  type: GET_MENU_GROUP_ERROR,
  payload: { message: error },
})

export const getMenuItems = ({ merchantId, restaurantId, menuId }) => ({
  type: GET_MENU_ITEM,
  payload: { merchantId, restaurantId, menuId },
})

export const getMenuItemsSuccess = (menuItems) => ({
  type: GET_MENU_ITEM_SUCCESS,
  payload: { menuItems },
})

export const getMenuItemsError = (error) => ({
  type: GET_MENU_ITEM_ERROR,
  payload: { message: error },
})

export const createMenuGroup = ({
  merchantId,
  restaurantId,
  menuId,
  data,
}) => ({
  type: CREATE_MENU_GROUP,
  payload: { merchantId, restaurantId, menuId, data },
})

export const createMenuGroupSuccess = (menuGroup) => ({
  type: CREATE_MENU_GROUP_SUCCESS,
  payload: { menuGroup },
})

export const createMenuGroupError = (error) => ({
  type: CREATE_MENU_GROUP_ERROR,
  payload: { message: error },
})

export const createMenuItem = ({
  merchantId,
  restaurantId,
  menuId,
  menuGroupId,
  data,
  history,
}) => ({
  type: CREATE_MENU_ITEM,
  payload: { merchantId, restaurantId, menuId, menuGroupId, data, history },
})

export const createMenuItemSuccess = (menuItem, history) => ({
  type: CREATE_MENU_ITEM_SUCCESS,
  payload: { menuItem, history },
})

export const createMenuItemError = (error) => ({
  type: CREATE_MENU_ITEM_ERROR,
  payload: { message: error },
})

export const createToppingGroup = ({
  merchantId,
  restaurantId,
  menuId,
  data,
}) => ({
  type: CREATE_TOPPING_GROUP,
  payload: { merchantId, restaurantId, menuId, data },
})

export const createToppingGroupSuccess = (toppingGroup) => ({
  type: CREATE_TOPPING_GROUP_SUCCESS,
  payload: { toppingGroup },
})

export const createToppingGroupError = (error) => ({
  type: CREATE_TOPPING_GROUP_ERROR,
  payload: { message: error },
})
