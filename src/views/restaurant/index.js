import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import RestaurantLayout from '../../layout/RestaurantLayout'

const Select = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ './select')
)
const Create = React.lazy(() =>
  import(/* webpackChunkName: "user-register" */ './create')
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
          <Redirect exact from={`${match.url}/`} to={`${match.url}/select`} />
          <Route
            path={`${match.url}/select`}
            render={(props) => <Select {...props} />}
          />
          <Route
            path={`${match.url}/create`}
            render={(props) => <Create {...props} />}
          />
          {/* <Redirect to='/error' /> */}
        </Switch>
      </Suspense>
    </RestaurantLayout>
  )
}

export default Restaurant
