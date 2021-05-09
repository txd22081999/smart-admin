import { combineReducers } from 'redux'
import settings from './settings/reducer'
import menu from './menu2/reducer'
import restaurantMenu from './menu/reducer'
import authUser from './auth/reducer'
import staffUser from './staff/reducer'
import merchantUser from './merchant/reducer'
import restaurantInfo from './restaurant/reducer'

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  staffUser,
  merchantUser,
  restaurantInfo,
  restaurantMenu,
})

export default reducers
