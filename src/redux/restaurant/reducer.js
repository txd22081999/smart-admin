import {
  GET_MERCHANT,
  GET_MERCHANT_SUCCESS,
  GET_MERCHANT_ERROR,
  SET_RESTAURANT,
  CREATE_RESTAURANT,
  CREATE_RESTAURANT_SUCCESS,
  CREATE_RESTAURANT_ERROR,
  GET_RESTAURANT_SUCCESS,
  VERIFY_RESTAURANT,
  VERIFY_RESTAURANT_SUCCESS,
  VERIFY_RESTAURANT_ERROR,
} from '../actions'

const localData = localStorage.getItem('persist:root')
// .replace(`\\"`, `"`)
// console.log(localData)
// console.log(JSON.parse(localData))

const INIT_STATE = {
  restaurant: {},
  loading: false,
  posAppKey: '',
  loadingVerify: false,
  error: '',
}

export default (state = INIT_STATE, { payload, type }) => {
  switch (type) {
    case SET_RESTAURANT: {
      return { ...state, restaurant: payload.restaurant }
    }
    // case GET_MERCHANT:
    //   return { ...state, loading: true, error: '' }
    // case GET_MERCHANT_SUCCESS: {
    //   return {
    //     ...state,
    //     loading: false,
    //     merchant: action.payload.merchant,
    //     error: '',
    //   }
    // }
    // case GET_MERCHANT_ERROR:
    //   return {
    //     ...state,
    //     loading: false,
    //     user: '',
    //     error: action.payload.message,
    //   }
    case CREATE_RESTAURANT: {
      return { ...state }
    }
    case CREATE_RESTAURANT_SUCCESS: {
      return { ...state }
    }
    case CREATE_RESTAURANT_ERROR: {
      return { ...state }
    }
    case GET_RESTAURANT_SUCCESS: {
      console.log(payload)
      return {
        ...state,
        restaurant: payload.restaurant,
      }
    }
    case VERIFY_RESTAURANT: {
      return { ...state, loadingVerify: true }
    }
    case VERIFY_RESTAURANT_SUCCESS: {
      return { ...state, loadingVerify: false, posAppKey: payload.posAppKey }
    }
    case VERIFY_RESTAURANT_ERROR: {
      return { ...state, loadingVerify: false, error: payload.message }
    }
    default:
      return { ...state }
  }
}
