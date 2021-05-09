import {
  GET_MERCHANT,
  GET_MERCHANT_SUCCESS,
  GET_MERCHANT_ERROR,
} from '../actions'

export const getMerchant = (id) => ({
  type: GET_MERCHANT,
  payload: { id },
})

export const getMerchantSuccess = (merchant) => ({
  type: GET_MERCHANT_SUCCESS,
  payload: { merchant },
})

export const getMerchantError = (error) => ({
  type: GET_MERCHANT_ERROR,
  payload: { message: error },
})
