import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const Cashier = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './cashier')
)

const SecondMenu = ({ match }) => (
  <Suspense fallback={<div className='loading' />}>
    <Switch>
      {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/second`} /> */}
      <Route
        path={`${match.url}/create`}
        render={(props) => <span>I'm ere</span>}
      />
      <Redirect to='/error' />
    </Switch>
  </Suspense>
)
export default SecondMenu
