import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
// import { auth } from '../../helpers/Firebase'
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from '../actions'

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
} from './actions'

import axios from 'axios'
import { ADMIN_URL, USER_URL } from '../../constants/config'
import { getErrorMessage } from '../utils'
import { NotificationManager } from 'src/components/common/react-notifications'

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithUsernamePassword)
}

const loginWithUsernamePasswordAsync = async (username, password) => {
  try {
    let response
    response = await axios({
      method: 'post',
      url: `${ADMIN_URL}/login`,
      data: {
        username,
        password,
      },
    })
    return response
  } catch (error) {
    return getErrorMessage(error)
  }
}

function* loginWithUsernamePassword({ payload }) {
  const { username, password } = payload.user
  const { history } = payload

  try {
    const response = yield call(
      loginWithUsernamePasswordAsync,
      username,
      password
    )
    const { data, status, message } = response
    if (status !== 200) {
      yield put(loginUserError(message))
      return
    }

    const {
      data: { user, access_token },
    } = data

    localStorage.setItem('access_token', access_token)
    localStorage.setItem('merchant_id', user.id)
    yield put(loginUserSuccess(user))
    history.push('/app')
  } catch (error) {
    // yield put(loginUserError(error))
    console.log(error)
    yield put(loginUserError('Login error'))
  }
}

export function* watchRegisterUser() {
  // yield takeEvery(REGISTER_USER, loginWithUsernamePassword)
  yield takeEvery(REGISTER_USER, registerWithUsernamePassword)
}

const registerWithUsernamePasswordAsync = async (user) => {
  try {
    let response
    response = await axios({
      method: 'post',
      url: `${USER_URL}`,
      data: user,
    })
    return response
  } catch (error) {
    return getErrorMessage(error)
  }
}

function* registerWithUsernamePassword({ payload }) {
  // const { username, email, password } = payload.user
  const { history } = payload
  try {
    const registerUser = yield call(
      registerWithUsernamePasswordAsync,
      payload.user
    )
    if (!registerUser.message) {
      // localStorage.setItem('user_id', registerUser.user.uid)
      NotificationManager.success('Register success', 'Success', 3000)
      yield put(registerUserSuccess(registerUser))
      history.push('/merchant/login')
    } else {
      NotificationManager.error(registerUser.message, 'Error', 3000)
      yield put(registerUserError(registerUser.message))
    }
  } catch (error) {
    NotificationManager.error(error, 'Error', 3000)
    yield put(registerUserError(error))
  }
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout)
}

// const logoutAsync = async (history) => {
//   await auth
//     .signOut()
//     .then((authUser) => authUser)
//     .catch((error) => error)
//   history.push('/')
// }

const logoutAsync = async (history) => {
  history.push('/admin/login')
}

function* logout({ payload }) {
  const { history } = payload
  try {
    yield call(logoutAsync, history)
    // localStorage.removeItem('user_id')
    localStorage.removeItem('access_token')
    localStorage.removeItem('merchant_id')
    localStorage.removeItem('restaurant_id')
  } catch (error) {
    console.error(error)
  }
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword)
}

// const forgotPasswordAsync = async (email) => {
//   return await auth
//     .sendPasswordResetEmail(email)
//     .then((user) => user)
//     .catch((error) => error)
// }

function* forgotPassword({ payload }) {
  return
  // const { email } = payload.forgotUserMail
  // try {
  //   const forgotPasswordStatus = yield call(forgotPasswordAsync, email)
  //   if (!forgotPasswordStatus) {
  //     yield put(forgotPasswordSuccess('success'))
  //   } else {
  //     yield put(forgotPasswordError(forgotPasswordStatus.message))
  //   }
  // } catch (error) {
  //   yield put(forgotPasswordError(error))
  // }
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword)
}

// const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
//   return await auth
//     .confirmPasswordReset(resetPasswordCode, newPassword)
//     .then((user) => user)
//     .catch((error) => error)
// }

function* resetPassword({ payload }) {
  return
  // const { newPassword, resetPasswordCode } = payload
  // try {
  //   const resetPasswordStatus = yield call(
  //     resetPasswordAsync,
  //     resetPasswordCode,
  //     newPassword
  //   )
  //   if (!resetPasswordStatus) {
  //     yield put(resetPasswordSuccess('success'))
  //   } else {
  //     yield put(resetPasswordError(resetPasswordStatus.message))
  //   }
  // } catch (error) {
  //   yield put(resetPasswordError(error))
  // }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
  ])
}
