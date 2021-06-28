import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

// const StaffUi = React.lazy(() =>
//   import(/* webpackChunkName: "second" */ './staff')
// )

const DriverRegister = React.lazy(() =>
  import(/* webpackChunkName: "second" */ '../DriverRegister/DriverRegister')
)

const DriverMenu = ({ match }) => (
  <Suspense fallback={<div className='loading' />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/register`} />
      {/* <Route
        exact
        path={`${match.url}/`}
        render={(props) => <StaffUi {...props} />}
      /> */}
      <Route
        path={`${match.url}/register`}
        render={(props) => <DriverRegister {...props} />}
        // render={<p>Hello</p>}
      />
      {/* <Redirect to='/error' /> */}
    </Switch>
  </Suspense>
)
export default DriverMenu
