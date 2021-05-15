import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import MenuItemCreate from '../MenuItemCreate'

const Dishes = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './dishes')
)

const MenuCreate = React.lazy(() => import('../MenuCreate'))

const MenuInfo = React.lazy(() => import('../MenuInfo'))

const DishesMenu = ({ match }) => (
  <Suspense fallback={<div className='loading' />}>
    <Switch>
      {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/dishes`} /> */}
      <Route
        exact
        path={`${match.url}/`}
        render={(props) => <Dishes {...props} />}
      />
      <Route
        exact
        path={`${match.url}/create/menu-item`}
        render={(props) => <MenuItemCreate {...props} />}
      />
      <Route
        exact
        path={`${match.url}/create`}
        render={(props) => <MenuCreate {...props} />}
      />
      <Route
        path={`${match.url}/:id`}
        render={(props) => <MenuInfo {...props} />}
      />
      {/* <Redirect to='/error' /> */}
    </Switch>
  </Suspense>
)

export default DishesMenu
