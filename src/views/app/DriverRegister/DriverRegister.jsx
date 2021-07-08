import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Field, Formik, useFormik, Form } from 'formik'
import { NavLink } from 'react-router-dom'
import { Button, FormGroup, Label } from 'reactstrap'
import axios from 'axios'
import ReactSelect from 'react-select'

import IntlMessages from 'src/helpers/IntlMessages'
import { verifyRestaurant } from '../../../redux/actions'
import UploadImage from '../../../components/common/UploadImage'
import { NotificationManager } from 'src/components/common/react-notifications'
import { DRIVER_URL } from 'src/constants'

import './DriverRegister.scss'
import { PASSWORD_REGEX, uploadFile } from 'src/helpers/Utils'

const DriverRegister = (props) => {
  const { dispatch, fetchLoading } = props

  const [avatarImg, setAvatarImg] = useState(null)
  const [identityImg, setIdentityImg] = useState(null)
  const [licenseImg, setLicenseImg] = useState(null)
  const [certImg, setCertImg] = useState(null)

  const [avatarImgUrl, setAvatarImgUrl] = useState('')
  const [identityImgUrl, setIdentityImgUrl] = useState('')
  const [licenseImgUrl, setLicenseImgUrl] = useState('')
  const [certImgUrl, setCertImgUrl] = useState('')

  const [imageUrl, setImageUrl] = useState('')
  const [imageLoading, setImageLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  const initialValues = {
    name: 'Nguyen Van An',
    email: 'an-nguyen-driver@gmail.com',
    password: '123456Ab',
    phoneNumber: '0943123456',
    city: 'TPHCM',
    dateOfBirth: '2021-05-30',
    IDNumber: '053168469',
    licensePlate: '59-Z1 011.01',
    merchantIdInPaypal: 'DD64LQSRDC2UN',
  }

  useEffect(() => {
    console.log('Did mount')
  }, [])

  const onAvatarImgChange = (value) => {
    const { file } = value[0]
    setAvatarImg(file)
  }

  const onIdentityImgChange = (value) => {
    const { file } = value[0]
    setIdentityImg(file)
  }

  const onLicenseImgChange = (value) => {
    const { file } = value[0]
    setLicenseImg(file)
  }

  const onCertImgChange = (value) => {
    const { file } = value[0]
    setCertImg(file)
  }

  const validateRestaurantId = (value) => {
    let error
    if (!value) {
      error = `Please enter restaurant's ID`
    }
    return error
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
      error = 'Please enter your password'
    } else if (!new RegExp(PASSWORD_REGEX).test(value)) {
      error =
        'Password must contain at least 8 character with 1 capital letter, 1 normal letter and 1 number character'
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

  const handleUpload = async () => {
    try {
      setImageLoading(true)
      if (!avatarImgUrl) {
        const avatarUrl = await uploadFile(avatarImg)
        setAvatarImgUrl(avatarUrl)
      }
      if (!certImgUrl) {
        const certUrl = await uploadFile(certImg)
        setCertImgUrl(certUrl)
      }

      if (!licenseImgUrl) {
        const licenseUrl = await uploadFile(licenseImg)
        setLicenseImgUrl(licenseUrl)
      }

      if (!identityImgUrl) {
        const identityUrl = await uploadFile(identityImg)
        setIdentityImgUrl(identityUrl)
      }

      setImageLoading(false)
    } catch (error) {
      console.log('Error in upload image!')
      console.error(error)
    }
  }

  const handleSubmit = async (values) => {
    const { history } = props
    // verifyRestaurant(restaurantId)
    console.log(values)
    if (!values || Object.values(values).includes('')) {
      return
    }
    if ([avatarImg, identityImg, licenseImg, certImg].includes(null)) {
      NotificationManager.error(
        'Please upload all images that are required!',
        'Error',
        3000
      )
      return
    }
    let res
    try {
      setLoading(true)

      await handleUpload()

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
          avatar: avatarImgUrl,
          identityCardImageUrl: identityImgUrl,
          driverLicenseImageUrl: licenseImgUrl,
          vehicleRegistrationCertificateImageUrl: certImgUrl,
        },
      })

      const { data } = res
      if (!data) return
      console.log(data)
      NotificationManager.success('Driver account created!', 'Success', 3000)

      history.push('/app/drivers')
    } catch (error) {
      const msg = error.response.data.message
      NotificationManager.error(msg, 'Error', 5000)
    } finally {
      setLoading(false)
    }
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

            <div className='img-upload-container'>
              <span className='upload-img-label'>
                <IntlMessages id='driver.avatar' />
              </span>
              <div className='driver.avatar'>
                <UploadImage
                  onImageChange={onAvatarImgChange}
                  limit={1}
                  onChange={() => {}}
                />
              </div>
            </div>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='driver.phone-number' />
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

            <div className='img-upload-container'>
              <span className='upload-img-label'>
                <IntlMessages id='driver.identity-card-image' />
              </span>
              <div className='driver.avatar'>
                <UploadImage onImageChange={onIdentityImgChange} limit={1} />
              </div>
            </div>

            <div className='img-upload-container'>
              <span className='upload-img-label'>
                <IntlMessages id='driver.id-driver-license' />
              </span>
              <div className='driver.avatar'>
                <UploadImage onImageChange={onLicenseImgChange} limit={1} />
              </div>
            </div>
            <div className='img-upload-container'>
              <span className='upload-img-label'>
                <IntlMessages id='driver.vehicle-cert' />
              </span>
              <div className='driver.avatar'>
                <UploadImage onImageChange={onCertImgChange} limit={1} />
              </div>
            </div>

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
