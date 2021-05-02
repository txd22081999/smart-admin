import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects'
import { REGISTER_STAFF, REGISTER_USER } from '../actions'
import { getErrorMessage } from '../utils'
import axios from 'axios'
import { STAFF_URL, ACCESS_TOKEN } from 'src/constants/config'
import { registerStaffSuccess, registerStaffError } from './actions'

const registerstaffdAsync = async (user) => {
  console.log('async')
  try {
    let response
    response = await axios({
      method: 'post',
      url: STAFF_URL,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      data: user,
    })
    console.log(response)
    return response
  } catch (error) {
    return getErrorMessage(error)
  }
  // await auth
  //   .createUserWithEmailAndPassword(email, password)
  //   .then((authUser) => authUser)
  //   .catch((error) => error)
}

function* registerStaff({ payload }) {
  // const { username, email, password } = payload.user
  const { history } = payload
  try {
    const registerStaff = yield call(registerstaffdAsync, payload.user)
    if (!registerStaff.message) {
      // localStorage.setItem('user_id', registerUser.user.uid)
      yield put(registerStaffSuccess(registerStaff))
      // history.push('/')
    } else {
      console.log(registerStaff.message)
      yield put(registerStaffError(registerStaff.message))
    }
  } catch (error) {
    // console.log('ERR', error.response)
    yield put(registerStaffError('Something went wrong in Saga!'))
  }
}

export function* watchRegisterStaff() {
  // yield takeEvery(REGISTER_USER, loginWithUsernamePassword)
  yield takeEvery(REGISTER_STAFF, registerStaff)
}

export default function* rootSaga() {
  yield all([fork(watchRegisterStaff)])
}
