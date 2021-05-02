import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const Analytics = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './analytics')
)
const AnalyticMenu = ({ match }) => (
  <Suspense fallback={<div className='loading' />}>
    <Switch>
      {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/analytics`} /> */}
      <Route
        path={`${match.url}/`}
        render={(props) => <Analytics {...props} />}
      />
      <Analytics />
      <Redirect to='/error' />
    </Switch>
  </Suspense>
)
export default AnalyticMenu
