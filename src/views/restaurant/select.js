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

import { NotificationManager } from '../../components/common/react-notifications'
import { Formik, Form, Field } from 'formik'

import { loginUser } from '../../redux/actions'
import { Colxx } from '../../components/common/CustomBootstrap'
import IntlMessages from '../../helpers/IntlMessages'
class Login extends Component {
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

  componentDidUpdate() {
    if (this.props.error) {
      NotificationManager.warning(
        this.props.error,
        'Login Error',
        3000,
        null,
        null,
        ''
      )
    }
  }

  render() {
    // const { password, email } = this.state
    // const initialValues = { email, password }
    const { password, username, id: restaurantId } = this.state
    const initialValues = { username, password }

    return (
      // <div className='restaurant-container d-flex align-items-center'>
      <div className='restaurant-container'>
        <Row className='flex-1'>
          <Colxx xxs='12' md='8' className='mx-auto my-auto'>
            <Card>
              <h2 className='text-center mt-3 mb-0 font-weight-semibold'>
                Choose your restaurant
              </h2>

              <NavLink to={`/restaurant/${restaurantId}`}>
                <CardBody>
                  <Card className='restaurant-card'>
                    {/* <CardTitle>Hello</CardTitle> */}
                    <CardBody>
                      <Row className='d-flex align-items-center'>
                        <Colxx md='4'>
                          <div className='avatar'>
                            <img
                              src='https://toplist.vn/images/800px/pho-bo-thai-can-347645.jpg'
                              alt='restanrant-1'
                            />
                          </div>
                        </Colxx>
                        <Colxx md='8'>
                          <p className='title mb-3'>Phở Lệ 1970 Chi nhánh 1</p>

                          <p className='address mb-1'>
                            <span>Địa chỉ: </span>
                            <span>
                              303-305 Võ Văn Tần, Phường 5, Quận 3, Thành phố Hồ
                              Chí Minh
                            </span>
                          </p>

                          <div className='status d-flex align-items-center'>
                            <box-icon
                              name='door-open'
                              type='solid'
                              color='orange'
                            ></box-icon>
                            <span className='ml-1'>Đang mở cửa</span>
                          </div>
                        </Colxx>
                      </Row>
                    </CardBody>
                  </Card>
                </CardBody>
              </NavLink>
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
})(Login)
