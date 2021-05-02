import { combineReducers } from 'redux'
import settings from './settings/reducer'
import menu from './menu/reducer'
import authUser from './auth/reducer'
import staffUser from './staff/reducer'

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  staffUser,
})

export default reducers
