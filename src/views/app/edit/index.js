import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const EditProfile = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './edit')
)

const EditMenu = ({ match }) => (
  <Suspense fallback={<div className='loading' />}>
    <Switch>
      {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/`} /> */}
      <Route
        path={`${match.url}`}
        render={(props) => <EditProfile {...props} />}
      />
      <Redirect to='/error' />
    </Switch>
  </Suspense>
)
export default EditMenu
