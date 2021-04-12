import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const Home = React.lazy(() => import(/* webpackChunkName: "start" */ './home'))

const Gogo = ({ match }) => (
  <Suspense fallback={<div className='loading' />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/start`} />
      <Route
        path={`${match.url}/start`}
        render={(props) => <Home {...props} />}
      />
      <Redirect to='/error' />
    </Switch>
  </Suspense>
)
export default Gogo
