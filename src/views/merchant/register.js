import React, { Component } from 'react'
import {
  Row,
  Card,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Button,
} from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from '../../redux/actions'

import IntlMessages from '../../helpers/IntlMessages'
import { Colxx } from '../../components/common/CustomBootstrap'
import { Formik, Form, Field } from 'formik'

const initialValues = {
  // username: 'Merchant',
  email: 'mechant123@foa.com',
  password: '123123',
  username: 'Quán Ăn Maika 3',
  phone: '0943123456',
  idNumber: '272699300',
  fullName: '',
}
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onUserRegister = (values) => {
    // v.preventDefault()
    if (Object.values(values).includes('')) return

    const { registerUser } = this.props
    const { email, fullName, idNumber, name, password, phone, username } =
      values
    const user = {
      username,
      password,
      email,
      phone,
      fullName,
      IDNumber: idNumber,
    }

    registerUser(user, this.props.history)
  }

  render() {
    return (
      <Row className='h-100'>
        <Colxx xxs='12' md='10' className='mx-auto my-auto'>
          <Card className='auth-card'>
            <div className='position-relative image-side '>
              <p className='text-white h2'>MAGIC IS IN THE DETAILS</p>
              <p className='white mb-0'>
                Please use this form to register. <br />
                If you are a member, please{' '}
                <NavLink to={`/user/login`} className='white'>
                  login
                </NavLink>
                .
              </p>
            </div>
            <div className='form-side'>
              <NavLink to={`/merchant`}>
                <div className='site-logo font-weight-bold'>
                  Smart<span className='text-orange'>Merchant</span>
                </div>
              </NavLink>
              <CardTitle className='mb-4'>
                <IntlMessages id='user.register' />
              </CardTitle>

              <Formik
                initialValues={initialValues}
                onSubmit={this.onUserRegister}
              >
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
                        <IntlMessages id='user.email' />
                      </Label>
                      <Field
                        className='form-control'
                        name='email'
                        validate={this.validateEmail}
                      />
                      {errors.email && touched.email && (
                        <div className='invalid-feedback d-block'>
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className='form-group has-float-label'>
                      <Label>
                        <IntlMessages id='user.password' />
                      </Label>
                      <Field
                        className='form-control'
                        name='password'
                        type='password'
                        validate={this.validatePassword}
                      />
                      {errors.password && touched.password && (
                        <div className='invalid-feedback d-block'>
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className='form-group has-float-label'>
                      <Label>
                        <IntlMessages id='user.full-name' />
                      </Label>
                      <Field
                        className='form-control'
                        name='fullName'
                        type='text'
                        validate={this.validateFullName}
                      />
                      {errors.fullName && touched.fullName && (
                        <div className='invalid-feedback d-block'>
                          {errors.fullName}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className='form-group has-float-label'>
                      <Label>
                        <IntlMessages id='user.phone' />
                      </Label>
                      <Field
                        className='form-control'
                        name='phone'
                        type='number'
                        validate={this.validatePhone}
                      />
                      {errors.phone && touched.phone && (
                        <div className='invalid-feedback d-block'>
                          {errors.phone}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className='form-group has-float-label'>
                      <Label>
                        <IntlMessages id='user.id-number' />
                      </Label>
                      <Field
                        className='form-control'
                        name='idNumber'
                        type='number'
                        validate={this.validateIdNumber}
                      />
                      {errors.idNumber && touched.idNumber && (
                        <div className='invalid-feedback d-block'>
                          {errors.idNumber}
                        </div>
                      )}

                      <div className='d-flex justify-content-end align-items-center mt-3 justify-content-between'>
                        <NavLink to={`/merchant/forgot-password`}>
                          <IntlMessages id='user.forgot-password-question' />
                        </NavLink>

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
                            <IntlMessages id='user.register-button' />
                          </span>
                        </Button>
                      </div>
                    </FormGroup>
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
  const { user, loading } = authUser
  return { user, loading }
}

export default connect(mapStateToProps, {
  registerUser,
})(Register)
