import {
  GET_RESTAURANT,
  GET_RESTAURANT_SUCCESS,
  GET_RESTAURANT_ERROR,
  SET_RESTAURANT,
  CREATE_RESTAURANT,
  CREATE_RESTAURANT_SUCCESS,
  CREATE_RESTAURANT_ERROR,
  VERIFY_RESTAURANT,
  VERIFY_RESTAURANT_SUCCESS,
  VERIFY_RESTAURANT_ERROR,
} from '../actions'

export const getRestaurant = (merchantId, restaurantId) => ({
  type: GET_RESTAURANT,
  payload: { merchantId, restaurantId },
})

export const getRestaurantSuccess = (restaurant) => ({
  type: GET_RESTAURANT_SUCCESS,
  payload: { restaurant },
})

export const getRestaurantError = (error) => ({
  type: GET_RESTAURANT_ERROR,
  payload: { message: error },
})

export const setRestaurant = (restaurant) => ({
  type: SET_RESTAURANT,
  payload: { restaurant },
})

export const createRestaurant = (merchantId, restaurant, history) => ({
  type: CREATE_RESTAURANT,
  payload: { merchantId, restaurant, history },
})

export const createRestaurantSuccess = (restaurant) => ({
  type: CREATE_RESTAURANT_SUCCESS,
  payload: { restaurant },
})

export const createRestaurantError = (error) => ({
  type: CREATE_RESTAURANT_ERROR,
  payload: { message: error },
})

export const verifyRestaurant = (restaurantId) => ({
  type: VERIFY_RESTAURANT,
  payload: { restaurantId },
})

export const verifyRestaurantSuccess = (posAppKey) => ({
  type: VERIFY_RESTAURANT_SUCCESS,
  payload: { posAppKey },
})

export const verifyRestaurantError = (error) => ({
  type: VERIFY_RESTAURANT_ERROR,
  payload: { message: error },
})
