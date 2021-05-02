import {
  REGISTER_STAFF,
  REGISTER_STAFF_SUCCESS,
  REGISTER_STAFF_ERROR,
} from '../actions'

export const registerStaff = (user, history) => {
  return {
    type: REGISTER_STAFF,
    payload: { user, history },
  }
}

export const registerStaffSuccess = (user) => {
  return {
    type: REGISTER_STAFF_SUCCESS,
    payload: user,
  }
}

export const registerStaffError = (message) => ({
  type: REGISTER_STAFF_ERROR,
  payload: { message },
})
