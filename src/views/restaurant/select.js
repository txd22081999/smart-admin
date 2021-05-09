import React, { Component } from 'react'
import {
  Row,
  Card,
  CardTitle,
  Label,
  FormGroup,
  Button,
  CardBody,
} from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import clsx from 'clsx'
import axios from 'axios'

import { NotificationManager } from '../../components/common/react-notifications'
import { Formik, Form, Field } from 'formik'

import { loginUser } from '../../redux/actions'
import { Colxx } from '../../components/common/CustomBootstrap'
import IntlMessages from '../../helpers/IntlMessages'

import { USER_URL } from '../../constants/config'
import { restaurantList } from './mockData'

import './restaurant.scss'

const Restaurant = (props) => {
  const {
    restaurant: {
      area,
      city,
      address,
      contractId,
      id,
      isActive,
      isVerified,
      name,
      phone,
      posAppKey,
      coverImageUrl = `https://toplist.vn/images/800px/pho-bo-thai-can-347645.jpg`,
    },
  } = props

  const statusText = isActive ? `Đang mở cửa` : `Đang đóng cửa`

  console.log(area, name)
  return (
    <NavLink to={`/`}>
      <Card className='restaurant-card'>
        <CardBody>
          <Row className='d-flex align-items-center'>
            {true && (
              <span className='check-icon'>
                <i class='bx bxs-check-circle'></i>
              </span>
            )}

            <Colxx md='4'>
              <div className='avatar'>
                <img src={coverImageUrl} alt='restanrant-1' />
              </div>
            </Colxx>
            <Colxx md='8'>
              <p className='title mb-3'>{name}</p>

              <p className='address mb-1'>
                <span>Địa chỉ: </span>
                <span>{address} </span>
              </p>

              <p className='phone mb-1'>
                <span>Số điện thoại: </span>
                <span>{phone} </span>
              </p>

              <div className='status d-flex align-items-center'>
                <box-icon
                  name='door-open'
                  type='solid'
                  color={isActive ? 'orange' : 'red'}
                ></box-icon>
                <span
                  className={clsx(
                    'ml-1',
                    isActive ? 'text-orange' : 'text-red'
                  )}
                >
                  {statusText}
                </span>
              </div>
            </Colxx>
          </Row>
        </CardBody>
      </Card>
    </NavLink>
  )
}

class RestaurantSelection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurantList: [],
    }
  }

  componentDidMount() {
    const fetchRestaurants = async () => {
      const { merchantUser } = this.props
      console.log(merchantUser)
      // const merchant_id = `62129e65-0d82-4b34-a63c-9a0439a1ba30`
      // const access_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudElkIjoiNjIxMjllNjUtMGQ4Mi00YjM0LWE2M2MtOWEwNDM5YTFiYTMwIiwibWVyY2hhbnRVc2VybmFtZSI6Im1lcmNoYW50MTIzIiwiaWF0IjoxNjIwNTM1OTc2LCJleHAiOjE2MjE3NDU1NzZ9.50wmVLxEh4-ebLJhUcFePuxSjxk6s-EKoIGO1IZRti0`
      const merchantId = merchantUser.id
      const accessToken = localStorage.getItem('access_token')
      const res = await axios({
        url: `${USER_URL}/${merchantId}/restaurant`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const { status } = res

      if (status !== 200) {
        console.log('Error in fetching restaurants')
        return
      }

      const {
        data: { data },
      } = res

      if (!data) return
      console.log(data)
      const { results = [] } = data
      const newRestaurantList = results.map((item) => {
        const {
          address,
          area,
          city,
          contractId,
          isActive,
          isVerified,
          name,
          phone,
          posAppKey,
          restaurantId,
        } = item

        const restaurantItem = {
          id: restaurantId,
          name,
          area,
          address,
          city,
          contractId,
          isActive,
          isVerified,
          phone,
          posAppKey,
        }

        return restaurantItem
      })

      console.log(newRestaurantList)

      this.setState({
        restaurantList: newRestaurantList,
      })
    }

    fetchRestaurants()
  }

  onUserLogin = (values) => {
    if (!this.props.loading) {
      // if (values.email !== '' && values.password !== '') {
      //   this.props.loginUser(values, this.props.history)
      // }
      if (values.username !== '' && values.password !== '') {
        this.props.loginUser(values, this.props.history)
      }
    }
  }

  // validateEmail = (value) => {
  //   let error
  //   if (!value) {
  //     error = 'Please enter your email address'
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
  //     error = 'Invalid email address'
  //   }
  //   return error
  // }

  validateUsername = (value) => {
    let error
    if (!value) {
      error = 'Please enter your user name'
    } else if (value.length < 5) {
      error = 'Value must be longer than 4 characters'
    }
    return error
  }

  validatePassword = (value) => {
    let error
    if (!value) {
      error = 'Please enter your password'
    } else if (value.length < 4) {
      error = 'Value must be longer than 3 characters'
    }
    return error
  }

  // componentDidUpdate() {
  //   if (this.props.error) {
  //     NotificationManager.warning(
  //       this.props.error,
  //       'Login Error',
  //       3000,
  //       null,
  //       null,
  //       ''
  //     )
  //   }
  // }

  render() {
    // const { password, email } = this.state
    // const initialValues = { email, password }
    const { password, username, id: restaurantId } = this.state
    const initialValues = { username, password }

    const { restaurantList = [] } = this.state
    const itemCount =
      restaurantList.length < 10
        ? `0${restaurantList.length}`
        : `${restaurantList.length}`

    return (
      <div className='restaurant-container'>
        <Row className='flex-1'>
          <Colxx xxs='12' md='8' className='mx-auto my-auto'>
            <Card>
              <h2 className='text-center mt-3 mb-0 font-weight-bold text-black'>
                Chọn nhà hàng của bạn <span>({itemCount})</span>
              </h2>

              <Button
                color='primary'
                className={`my-button ml-auto mb-3 mr-4 btn-shadow btn-multiple-state ${
                  this.props.loading ? 'show-spinner' : ''
                }`}
                size='lg'
              >
                {/* <NavLink to={'/restaurant/register'}> */}
                <a href={`/restaurant/create`} className='text-white'>
                  <span aria-hidden>&#43; Tạo mới</span>
                </a>
                {/* Tạo mới */}
                {/* </NavLink> */}
              </Button>

              <div className='restaurant-wrapper'>
                {/* <CardBody className='restaurant-card'> */}
                <CardBody className='pt-1 pb-2'>
                  {restaurantList.map((restaurant, index) => (
                    <Restaurant restaurant={restaurant} key={restaurant.id} />
                  ))}
                </CardBody>
              </div>
            </Card>
          </Colxx>
        </Row>
      </div>
    )
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading, error } = authUser
  return { merchantUser: user, loading, error }
}

export default connect(mapStateToProps, {
  loginUser,
})(RestaurantSelection)
