import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const MapsUi = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './map')
)
const DishesMenu = ({ match }) => (
  <Suspense fallback={<div className='loading' />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/map`} />
      <Route
        path={`${match.url}/map`}
        render={(props) => <MapsUi {...props} />}
      />
      <Redirect to='/error' />
    </Switch>
  </Suspense>
)
export default DishesMenu
