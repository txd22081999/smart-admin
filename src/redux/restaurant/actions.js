import {
  GET_RESTAURANT,
  GET_RESTAURANT_SUCCESS,
  GET_RESTAURANT_ERROR,
  SET_RESTAURANT,
} from '../actions'

export const getRestaurant = (id) => ({
  type: GET_RESTAURANT,
  payload: { id },
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
