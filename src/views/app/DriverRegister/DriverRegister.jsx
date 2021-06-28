import React, { useState } from 'react'

import { connect } from 'react-redux'
import { Field, Formik, useFormik, Form } from 'formik'
import { NavLink } from 'react-router-dom'
import { Button, FormGroup, Label } from 'reactstrap'
import IntlMessages from 'src/helpers/IntlMessages'
import ReactSelect from 'react-select'
import { verifyRestaurant } from '../../../redux/actions'

import './DriverRegister.scss'
import axios from 'axios'
import { DRIVER_URL } from 'src/constants'
import { NotificationManager } from 'src/components/common/react-notifications'

const DriverRegister = (props) => {
  const { dispatch, fetchLoading } = props

  const [loading, setLoading] = useState(false)

  const initialValues = {
    name: 'Nguyen Van An',
    email: 'an-nguyen-driver@gmail.com',
    password: '123123',
    phoneNumber: '0123456789',
    city: 'TPHCM',
    dateOfBirth: '2021-05-30',
    IDNumber: '053168469',
    licensePlate: '59-Z1 011.01',
    avatar: 'anh-dai-dien.png',
    merchantIdInPaypal: 'DD64LQSRDC2UN',
    identityCardImageUrl: 'CMND.png',
    driverLicenseImageUrl: 'bang-lai-xe.png',
    vehicleRegistrationCertificateImageUrl: 'giay-dang-ky-xe.jpg',
  }

  const validateRestaurantId = (value) => {
    let error
    if (!value) {
      error = `Please enter restaurant's ID`
    }
    return error
  }

  const handleSubmit = async (values) => {
    const { verifyRestaurant } = props
    const { restaurantId } = values
    // verifyRestaurant(restaurantId)
    console.log(values)
    if (!values || Object.values(values).includes('')) {
      return
    }
    let res
    try {
      setLoading(true)

      const accessToken = localStorage.getItem('access_token')
      res = await axios({
        method: 'POST',
        url: `${DRIVER_URL}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          ...values,
          phoneNumber: `${values.phoneNumber}`,
        },
      })

      const { data } = res
      if (!data) return
      console.log(data)
      NotificationManager.success('Driver account created!', 'Success', 3000)
    } catch (error) {
      const msg = error.response.data.message
      NotificationManager.error(msg, 'Error', 3000)
    } finally {
      setLoading(false)
    }
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

  const onSubmit = async (values) => {
    console.log(values)
  }

  if (fetchLoading) {
    return <div className='loading'></div>
  }

  return (
    <div className='DriverRegister p-4'>
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
                name='IDNumber'
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
                name='merchantIdInPaypal'
                type='text'
                validate={validateMerchantIdPaypal}
              />
              {errors.merchantIdInPaypal && touched.merchantIdInPaypal && (
                <div className='invalid-feedback d-block'>
                  {errors.merchantIdInPaypal}
                </div>
              )}
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='driver.identity-card-image' />
              </Label>
              <Field
                className='form-control'
                name='identityCardImageUrl'
                type='text'
                // validate={validateLicense}
              />
              {errors.identityCardImageUrl && touched.identityCardImageUrl && (
                <div className='invalid-feedback d-block'>
                  {errors.identityCardImageUrl}
                </div>
              )}
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='driver.id-driver-license' />
              </Label>
              <Field
                className='form-control'
                name='driverLicenseImageUrl'
                type='text'
                // validate={validateLicense}
              />
              {errors.driverLicenseImageUrl &&
                touched.driverLicenseImageUrl && (
                  <div className='invalid-feedback d-block'>
                    {errors.driverLicenseImageUrl}
                  </div>
                )}
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='driver.vehicle-cert' />
              </Label>
              <Field
                className='form-control'
                name='vehicleRegistrationCertificateImageUrl'
                type='text'
                // validate={validateLicense}
              />
              {errors.vehicleRegistrationCertificateImageUrl &&
                touched.vehicleRegistrationCertificateImageUrl && (
                  <div className='invalid-feedback d-block'>
                    {errors.vehicleRegistrationCertificateImageUrl}
                  </div>
                )}
            </FormGroup>

            <div style={{ width: '100%' }}>
              <Button
                color='primary'
                className={`btn-shadow btn-multiple-state mr-3 d-block ml-auto ${
                  loading ? 'show-spinner' : ''
                }`}
                disabled={loading}
                size='lg'
                type='submit'
                // onClick={onSubmit}
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
            </div>
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
