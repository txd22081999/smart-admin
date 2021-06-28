import React, { useState } from 'react'

import { connect } from 'react-redux'
import { Field, Formik, useFormik, Form } from 'formik'
import { NavLink } from 'react-router-dom'
import { Button, FormGroup, Label } from 'reactstrap'
import IntlMessages from 'src/helpers/IntlMessages'
import ReactSelect from 'react-select'
import { verifyRestaurant } from '../../../redux/actions'

import './DriverRegister.scss'

const DriverRegister = (props) => {
  const { dispatch } = props
  const initialValues = {
    name: 'Nguyen Van A',
    email: 'van-nguyen-driver@gmail.com',
    password: '123123',
    phoneNumber: '0123456789',
    city: 'TPHCM',
    dateOfBirth: '2021-05-30',
    IDNumber: '053168469',
    licensePlate: '59-Z1 011.01',
    avatar: 'somelink.jpg',
    merchantIdInPaypal: 'DD64LQSRDC2UN',
    identityCardImageUrl: 'somelink.jpg',
    driverLicenseImageUrl: 'somelink.jpg',
    vehicleRegistrationCertificateImageUrl: 'somelink.jpg',
  }

  const validateRestaurantId = (value) => {
    let error
    if (!value) {
      error = `Please enter restaurant's ID`
    }
    return error
  }

  const handleSubmit = (values) => {
    const { verifyRestaurant } = props
    const { restaurantId } = values
    verifyRestaurant(restaurantId)
  }

  const validateEmail = (value) => {
    let error
    if (!value) {
      error = `Please enter driver's email`
    }
    return error
  }

  const validatePassword = (value) => {
    let error
    if (!value) {
      error = `Please enter driver's password`
    }
    return error
  }

  const validatePhoneNumber = (value) => {
    let error
    if (!value) {
      error = `Please enter driver's phone number`
    }
    return error
  }

  const validateName = (value) => {
    let error
    if (!value) {
      error = `Please enter driver's name`
    }
    return error
  }

  const validateIDNumber = (value) => {
    let error
    if (!value) {
      error = `Please enter driver's ID number`
    }
    return error
  }

  const validateLicense = (value) => {
    let error
    if (!value) {
      error = `Please enter driver's ID license`
    }
    return error
  }

  const validateMerchantIdPaypal = (value) => {
    let error
    if (!value) {
      error = `Please enter merchant Paypal ID`
    }
    return error
  }

  return (
    <div className='p-4'>
      <h4 className='pb-2'>
        <IntlMessages id='driver.register-driver' />
      </h4>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({
          errors,
          touched,
          values,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
          <Form className='av-tooltip tooltip-label-bottom'>
            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='driver.name' />
              </Label>
              <Field
                className='form-control'
                name='name'
                type='text'
                validate={validateName}
              />
              {errors.name && touched.name && (
                <div className='invalid-feedback d-block'>{errors.name}</div>
              )}
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='driver.email' />
              </Label>
              <Field
                className='form-control'
                name='email'
                type='email'
                validate={validateEmail}
              />
              {errors.email && touched.email && (
                <div className='invalid-feedback d-block'>{errors.email}</div>
              )}
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='driver.password' />
              </Label>
              <Field
                className='form-control'
                name='password'
                type='password'
                validate={validatePassword}
              />
              {errors.password && touched.password && (
                <div className='invalid-feedback d-block'>
                  {errors.password}
                </div>
              )}
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='driver.email' />
              </Label>
              <Field
                className='form-control'
                name='phoneNumber'
                type='number'
                validate={validatePhoneNumber}
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <div className='invalid-feedback d-block'>
                  {errors.phoneNumber}
                </div>
              )}
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='driver.city' />
              </Label>
              <Field
                className='form-control'
                name='city'
                type='text'
                // validate={validateCity}
              />
              {errors.city && touched.city && (
                <div className='invalid-feedback d-block'>{errors.city}</div>
              )}
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='driver.dateOfBirth' />
              </Label>
              <Field
                className='form-control'
                name='dateOfBirth'
                type='text'
                // validate={validateDateOfBirth}
              />
              {errors.dateOfBirth && touched.dateOfBirth && (
                <div className='invalid-feedback d-block'>
                  {errors.dateOfBirth}
                </div>
              )}
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='driver.ID-number' />
              </Label>
              <Field
                className='form-control'
                name='dateOfBirth'
                type='number'
                validate={validateIDNumber}
              />
              {errors.IDNumber && touched.IDNumber && (
                <div className='invalid-feedback d-block'>
                  {errors.IDNumber}
                </div>
              )}
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='driver.license-plate' />
              </Label>
              <Field
                className='form-control'
                name='licensePlate'
                type='text'
                validate={validateLicense}
              />
              {errors.licensePlate && touched.licensePlate && (
                <div className='invalid-feedback d-block'>
                  {errors.licensePlate}
                </div>
              )}
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='driver.avatar' />
              </Label>
              <Field
                className='form-control'
                name='avatar'
                type='text'
                // validate={validateLicense}
              />
              {errors.avatar && touched.avatar && (
                <div className='invalid-feedback d-block'>{errors.avatar}</div>
              )}
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='driver.merchant-id-paypal' />
              </Label>
              <Field
                className='form-control'
                name='merchantIdPaypal'
                type='text'
                validate={validateMerchantIdPaypal}
              />
              {errors.merchantIdPaypal && touched.merchantIdPaypal && (
                <div className='invalid-feedback d-block'>
                  {errors.merchantIdPaypal}
                </div>
              )}
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='driver.identity-card-image' />
              </Label>
              <Field
                className='form-control'
                name='identityCardImage'
                type='text'
                // validate={validateLicense}
              />
              {errors.identityCardImage && touched.identityCardImage && (
                <div className='invalid-feedback d-block'>
                  {errors.identityCardImage}
                </div>
              )}
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='driver.id-driver-license' />
              </Label>
              <Field
                className='form-control'
                name='driverLicense'
                type='text'
                // validate={validateLicense}
              />
              {errors.driverLicense && touched.driverLicense && (
                <div className='invalid-feedback d-block'>
                  {errors.driverLicense}
                </div>
              )}
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='driver.vehicle-cert' />
              </Label>
              <Field
                className='form-control'
                name='vehicleCert'
                type='text'
                // validate={validateLicense}
              />
              {errors.vehicleCert && touched.vehicleCert && (
                <div className='invalid-feedback d-block'>
                  {errors.vehicleCert}
                </div>
              )}
            </FormGroup>

            <Button
              color='primary'
              className={`btn-shadow btn-multiple-state mr-3 ${
                props.loading ? 'show-spinner' : ''
              }`}
              size='lg'
              type='submit'
              //   onClick={handleSend}
            >
              <span className='spinner d-inline-block'>
                <span className='bounce1' />
                <span className='bounce2' />
                <span className='bounce3' />
              </span>
              <span className='label'>
                <IntlMessages id='menu.register-btn' />
              </span>
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

// export default RestaurantVerify
const mapStateToProps = ({ authUser, restaurantInfo, restaurantMenu }) => {
  return {}
}
// export default MenuInfo

export default connect(mapStateToProps, {
  verifyRestaurant,
})(DriverRegister)
