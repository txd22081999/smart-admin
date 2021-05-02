import {
  REGISTER_STAFF,
  REGISTER_STAFF_SUCCESS,
  REGISTER_STAFF_ERROR,
} from '../actions'

const INIT_STATE = {
  //   user: localStorage.getItem('user_id'),
  //   user: localStorage.getItem('user_token'),
  //   forgotUserMail: '',
  //   newPassword: '',
  //   resetPasswordCode: '',
  staff: '',
  loading: false,
  error: '',
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case REGISTER_STAFF:
      return { ...state, loading: true, error: '' }
    case REGISTER_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
        staff: action.payload.staff,
        error: '',
      }
    case REGISTER_STAFF_ERROR:
      return {
        ...state,
        loading: false,
        staff: '',
        error: action.payload.message,
      }
    default:
      return { ...state }
  }
}
