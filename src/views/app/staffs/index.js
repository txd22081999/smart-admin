import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const StaffUi = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './staff')
)

const StaffCreate = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './create')
)

const StaffMenu = ({ match }) => (
  <Suspense fallback={<div className='loading' />}>
    <Switch>
      {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/map`} /> */}
      <Route
        exact
        path={`${match.url}/`}
        render={(props) => <StaffUi {...props} />}
      />
      <Route
        path={`${match.url}/create`}
        render={(props) => <StaffCreate {...props} />}
      />
      {/* <Redirect to='/error' /> */}
    </Switch>
  </Suspense>
)
export default StaffMenu
