import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import RestaurantLayout from '../../layout/RestaurantLayout'

const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ './login')
)
const Register = React.lazy(() =>
  import(/* webpackChunkName: "user-register" */ './register')
)
// const ForgotPassword = React.lazy(() =>
//   import(/* webpackChunkName: "user-forgot-password" */ './forgot-password')
// )
// const ResetPassword = React.lazy(() =>
//   import(/* webpackChunkName: "user-reset-password" */ './reset-password')
// )

const Restaurant = ({ match }) => {
  console.log('Restaurant here')
  console.log(match)
  return (
    <RestaurantLayout>
      <Suspense fallback={<div className='loading' />}>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
          <Route
            path={`${match.url}/login`}
            render={(props) => <Login {...props} />}
          />
          <Route
            path={`${match.url}/register`}
            render={(props) => <Register {...props} />}
          />
          {/* <Redirect to='/error' /> */}
        </Switch>
      </Suspense>
    </RestaurantLayout>
  )
}

export default Restaurant
