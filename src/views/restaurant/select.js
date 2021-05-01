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

import { NotificationManager } from '../../components/common/react-notifications'
import { Formik, Form, Field } from 'formik'

import { loginUser } from '../../redux/actions'
import { Colxx } from '../../components/common/CustomBootstrap'
import IntlMessages from '../../helpers/IntlMessages'

import { restaurantList } from './mockData'

import './restaurant.scss'

const Restaurant = (props) => {
  const {
    restaurant: { id, imageUrl, name, address, status },
  } = props

  const isOpen = status === 'open'
  const statusText = isOpen ? `Đang mở cửa` : `Đang đóng cửa`

  return (
    <NavLink to={`/restaurant/${id}`}>
      <Card className='restaurant-card'>
        <CardBody>
          <Row className='d-flex align-items-center'>
            <Colxx md='4'>
              <div className='avatar'>
                <img src={imageUrl} alt='restanrant-1' />
              </div>
            </Colxx>
            <Colxx md='8'>
              <p className='title mb-3'>{address}</p>

              <p className='address mb-1'>
                <span>Địa chỉ: </span>
                <span>{address} </span>
              </p>

              <div className='status d-flex align-items-center'>
                <box-icon
                  name='door-open'
                  type='solid'
                  color={isOpen ? 'orange' : 'red'}
                ></box-icon>
                <span
                  className={clsx('ml-1', isOpen ? 'text-orange' : 'text-red')}
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
      // email: 'demo@foa.com',
      id: 123456,

      username: 'merchant123',
      password: '123123',
    }
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
                <a href={`/restaurant/create`}>
                  <span aria-hidden>&#43; Tạo mới</span>
                </a>
                {/* Tạo mới */}
                {/* </NavLink> */}
              </Button>

              <div className='restaurant-wrapper'>
                {/* <CardBody className='restaurant-card'> */}
                <CardBody className='pt-0 pb-2'>
                  {restaurantList.map((restaurant, index) => (
                    <Restaurant
                      restaurant={restaurant}
                      key={`restaurant-${index}`}
                    />
                  ))}
                </CardBody>
              </div>
            </Card>
          </Colxx>
        </Row>
      </div>
    )

    return (
      <Row className='h-100'>
        <Colxx xxs='12' md='10' className='mx-auto my-auto'>
          <Card className='auth-card'>
            <div className='position-relative image-side restaurant'>
              <p className='text-white h2'>Manage your restaurant now</p>
              <p className='white mb-0'>
                Login your restaurant
                <br />
                If you don't have an account, please{' '}
                <NavLink to={`/register`} className='white'>
                  register
                </NavLink>
                .
              </p>
            </div>
            <div className='form-side'>
              <NavLink to={`/`} className='black'>
                {/* <span className="logo-single" /> */}
                <div className='site-logo font-weight-bold'>
                  Smart<span className='text-orange'>Merchant</span>
                </div>
              </NavLink>
              <CardTitle className='mb-4'>
                <IntlMessages id='user-merchant.login-title' />
              </CardTitle>

              <Formik initialValues={initialValues} onSubmit={this.onUserLogin}>
                {({ errors, touched }) => (
                  <Form className='av-tooltip tooltip-label-bottom'>
                    <FormGroup className='form-group has-float-label'>
                      <Label>
                        <IntlMessages id='user.username' />
                      </Label>
                      <Field
                        className='form-control'
                        name='username'
                        validate={this.validateUsername}
                      />
                      {errors.username && touched.username && (
                        <div className='invalid-feedback d-block'>
                          {errors.username}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className='form-group has-float-label'>
                      <Label>
                        <IntlMessages id='user.password' />
                      </Label>
                      <Field
                        className='form-control'
                        type='password'
                        name='password'
                        validate={this.validatePassword}
                      />
                      {errors.password && touched.password && (
                        <div className='invalid-feedback d-block'>
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>
                    <div className='d-flex justify-content-between align-items-center'>
                      <div className='d-flex'>
                        <NavLink to={`/user/register`} className='mr-3'>
                          <IntlMessages id='user.register' />
                        </NavLink>

                        <NavLink to={`/user/forgot-password`}>
                          <IntlMessages id='user.forgot-password-question' />
                        </NavLink>
                      </div>

                      <Button
                        color='primary'
                        className={`btn-shadow btn-multiple-state ${
                          this.props.loading ? 'show-spinner' : ''
                        }`}
                        size='lg'
                      >
                        <span className='spinner d-inline-block'>
                          <span className='bounce1' />
                          <span className='bounce2' />
                          <span className='bounce3' />
                        </span>
                        <span className='label'>
                          <IntlMessages id='user.login-button' />
                        </span>
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </Colxx>
      </Row>
    )
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading, error } = authUser
  return { user, loading, error }
}

export default connect(mapStateToProps, {
  loginUser,
})(RestaurantSelection)
