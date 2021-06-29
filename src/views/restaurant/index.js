import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import RestaurantDetail from '../app/RestaurantDetail'
// const StaffUi = React.lazy(() =>
//   import(/* webpackChunkName: "second" */ './staff')
// )

const RestaurantVerify = React.lazy(() =>
  import(/* webpackChunkName: "second" */ '../app/RestaurantVerify')
)

const RestaurantList = React.lazy(() =>
  import(/* webpackChunkName: "second" */ '../app/RestaurantList')
)

const RestaurantMenu = ({ match }) => {
  return (
    <Suspense fallback={<div className='loading' />}>
      <Switch>
        {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/`} /> */}
        <Route
          exact
          path={`${match.url}/`}
          render={(props) => <RestaurantList {...props} />}
        />
        <Route
          exact
          path={`${match.url}/item/:id`}
          render={(props) => <RestaurantDetail {...props} />}
        />
        {/* <Route
          path={`${match.url}/verify`}
          render={(props) => <RestaurantVerify {...props} />}
        /> */}
        {/* <Redirect to='/error' /> */}
      </Switch>
    </Suspense>
  )
}
export default RestaurantMenu
