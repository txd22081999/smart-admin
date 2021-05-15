import {
  GET_MERCHANT,
  GET_MERCHANT_SUCCESS,
  GET_MERCHANT_ERROR,
  SET_RESTAURANT,
} from '../actions'

const localData = localStorage.getItem('persist:root')
// .replace(`\\"`, `"`)
console.log(localData)
// console.log(typeof localData)
// console.log(localData.replace(`\\`, ``))
// console.log(JSON.parse(JSON.stringify(localData)))
console.log(JSON.parse(localData))

const INIT_STATE = {
  restaurant: {},
  loading: false,
  error: '',
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_RESTAURANT: {
      return { ...state, restaurant: action.payload.restaurant }
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
    default:
      return { ...state }
  }
}
