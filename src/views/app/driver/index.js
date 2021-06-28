import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

// const StaffUi = React.lazy(() =>
//   import(/* webpackChunkName: "second" */ './staff')
// )

const DriverList = React.lazy(() =>
  import(/* webpackChunkName: "second" */ '../DriverList')
)
const DriverRegister = React.lazy(() =>
  import(/* webpackChunkName: "second" */ '../DriverRegister')
)

const DriverMenu = ({ match }) => (
  <Suspense fallback={<div className='loading' />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/create`} />
      <Route
        exact
        path={`${match.url}/`}
        render={(props) => <DriverList {...props} />}
      />
      <Route
        path={`${match.url}/create`}
        render={(props) => <DriverRegister {...props} />}
        // render={<p>Hello</p>}
      />
      {/* <Redirect to='/error' /> */}
    </Switch>
  </Suspense>
)
export default DriverMenu
