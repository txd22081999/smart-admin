import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import './helpers/Firebase'
import AppLocale from './lang'
import ColorSwitcher from './components/common/ColorSwitcher'
import NotificationContainer from './components/common/react-notifications/NotificationContainer'
import { isMultiColorActive } from './constants/defaultValues'
import { getDirection } from './helpers/Utils'
import 'boxicons'
// hel

const ViewMain = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views')
)
const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app')
)
const ViewUserMerchant = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/merchant')
)
const ViewAdmin = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/admin')
)
const ViewUserRestaurant = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/restaurant')
)
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
)

const AuthRoute = ({ component: Component, authUser, ...rest }) => {
  return (
    <Route
      {...rest}
      // render={(props) =>
      //   authUser && authUser.id !== '' ? (
      //     <Component {...props} />
      //   ) : (
      //     <Redirect
      //       to={{
      //         pathname: '/merchant',
      //         // pathname: '/',
      //         state: { from: props.location },
      //       }}
      //     />
      //   )
      // }
      render={(props) => <Component {...props} />}
    />
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    const direction = getDirection()
    if (direction.isRtl) {
      document.body.classList.add('rtl')
      document.body.classList.remove('ltr')
    } else {
      document.body.classList.add('ltr')
      document.body.classList.remove('rtl')
    }
  }

  render() {
    const { locale, authUser } = this.props
    const currentAppLocale = AppLocale[locale]

    // return null
    return (
      <div className='h-100'>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <React.Fragment>
            <NotificationContainer />
            {isMultiColorActive && <ColorSwitcher />}
            <Suspense fallback={<div className='loading' />}>
              <Router>
                <Switch>
                  <AuthRoute
                    path='/app'
                    authUser={authUser}
                    component={ViewApp}
                  />
                  <Route
                    path='/admin'
                    render={(props) => <ViewAdmin {...props} />}
                  />
                  <Route
                    path='/merchant'
                    render={(props) => <ViewUserMerchant {...props} />}
                  />
                  <Route
                    path='/restaurant'
                    render={(props) => <ViewUserRestaurant {...props} />}
                  />
                  {/* <Route
                    path='/error'
                    exact
                    render={(props) => <ViewError {...props} />}
                  /> */}
                  <Route
                    path='/'
                    exact
                    render={(props) => <ViewMain {...props} />}
                  />
                  {/* <Redirect to='/error' /> */}
                </Switch>
              </Router>
            </Suspense>
          </React.Fragment>
        </IntlProvider>
      </div>
    )
  }
}

const mapStateToProps = ({ authUser, settings }) => {
  // const { user: loginUser } = authUser
  const loginUser = true
  const { locale } = settings
  return { loginUser, locale, authUser }
}
const mapActionsToProps = {}

export default connect(mapStateToProps, mapActionsToProps)(App)
