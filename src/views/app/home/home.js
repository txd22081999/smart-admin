import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { Row } from 'reactstrap'
import IntlMessages from '../../../helpers/IntlMessages'
import { Badge } from 'reactstrap'
import { connect } from 'react-redux'
import Pusher from 'pusher-js'
import axios from 'axios'

import { Colxx, Separator } from '../../../components/common/CustomBootstrap'
import Breadcrumb from '../../../containers/navs/Breadcrumb'
// import Banner from '../../../assets/images/banner.jpg'
// import Banner from './banner.jpg'
// import Banner from './banner.jpg'
import { getMerchant, setRestaurant } from '../../../redux/actions'

import {
  PUSHER_APP_CLUSTER,
  PUSHER_APP_KEY,
  USER_URL,
} from 'src/constants/config'
import './home.scss'
import { getDayByName, listenNotification, padNumber } from 'src/helpers/Utils'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  componentDidMount() {
    listenNotification()
  }

  fetchRestaurantInfo = async (accessToken, merchantId, restaurantId) => {
    try {
      this.setState({
        loading: true,
      })
      const { setRestaurant } = this.props

      const { data } = await axios({
        method: 'GET',
        url: `${USER_URL}/${merchantId}/restaurant/${restaurantId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      if (!data) {
        console.log('Error: No data return')
      } else {
        const {
          data: { restaurant },
        } = data
        setRestaurant({ ...restaurant })
      }
    } catch (error) {
      console.log('Error in fetch restaurant info at Home page')
      console.error(error)
    } finally {
      this.setState({
        loading: false,
      })
    }
  }

  // getWorkingDay = (openHours) => {

  // }

  getOpenTime = (time) => {
    if (!time) return
    const { fromHour, fromMinute, toHour, toMinute } = time
    return `${padNumber(fromHour)}:${padNumber(fromMinute)} - ${padNumber(
      toHour
    )}:${padNumber(toMinute)}`
  }

  render() {
    // console.log(Banner)
    console.log(this.props)

    const { loading } = this.state

    if (loading) {
      return <div class='loading'></div>
    }

    return (
      <Fragment>
        <Row>
          <Colxx xxs='12'>
            <Breadcrumb heading='menu.home' match={this.props.match} />
            <Separator className='mb-5' />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs='12' className='mb-4'>
            <div className='Home'>Home</div>
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}

// export default Home
const mapStateToProps = ({ authUser, merchantUser, restaurantInfo }) => {
  return { merchantUser, authUser, restaurantInfo }
}
export default connect(mapStateToProps, { getMerchant, setRestaurant })(Home)
