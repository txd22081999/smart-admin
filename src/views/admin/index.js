import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import localStorage from 'redux-persist/es/storage'
import AdminLayout from '../../layout/AdminLayout'

const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ './login')
)
const Register = React.lazy(() =>
  import(/* webpackChunkName: "user-register" */ './register')
)
const ForgotPassword = React.lazy(() =>
  import(/* webpackChunkName: "user-forgot-password" */ './forgot-password')
)
const ResetPassword = React.lazy(() =>
  import(/* webpackChunkName: "user-reset-password" */ './reset-password')
)

const Admin = ({ match }) => {
  return (
    <AdminLayout>
      <Suspense fallback={<div className='loading' />}>
        <Switch>
          <Route
            // path={`${match.url}/merchant/login`}
            path={`${match.url}/login`}
            render={(props) => <Login {...props} />}
          />
          <Route
            path={`${match.url}/register`}
            render={(props) => <Register {...props} />}
          />
          <Route
            path={`${match.url}/forgot-password`}
            render={(props) => <ForgotPassword {...props} />}
          />
          <Route
            path={`${match.url}/reset-password`}
            render={(props) => <ResetPassword {...props} />}
          />

          {/* <Redirect to='/error' /> */}
        </Switch>
      </Suspense>
    </AdminLayout>
  )
}

export default Admin
