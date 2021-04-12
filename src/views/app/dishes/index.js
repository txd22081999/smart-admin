import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const Dishes = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './dishes')
)
const DishesMenu = ({ match }) => (
  <Suspense fallback={<div className='loading' />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/dishes`} />
      <Route
        path={`${match.url}/dishes`}
        render={(props) => <Dishes {...props} />}
      />
      <Redirect to='/error' />
    </Switch>
  </Suspense>
)
export default DishesMenu
