import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'

import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardHeader,
} from 'reactstrap'
import { Colxx } from '../common/CustomBootstrap'
import { FormikReactSelect } from '../../containers/form-validations/FormikFields'
import { RangeTooltip, TimeRange } from '../common/SliderTooltips'

const options = [
  { value: 'com', label: 'Cơm' },
  // { value: 'bún', label: 'Bún', disabled: true },
  { value: 'bun', label: 'Bún' },
  { value: 'pho', label: 'Phở' },
  { value: 'nuoc-uong', label: 'Nước uống' },
  { value: 'sinh-to', label: 'Sinh tố' },
  { value: 'tra-sua', label: 'Trà sữa' },
  { value: 'lau', label: 'Lẩu' },
]

class ProfileForm extends Component {
  constructor(props) {
    super(props)
  }

  handleSubmit = (values) => {
    console.log(values)
  }

  validateEmail = (value) => {
    let error
    if (!value) {
      error = 'Please enter your email address'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address'
    }
    return error
  }

  validateName = (value) => {
    let error
    if (!value) {
      error = 'Please enter your name'
    } else if (value.length < 2) {
      error = 'Name must be longer than 2 characters'
    }
    return error
  }

  validateAddress = (value) => {
    let error
    if (!value) {
      error = 'Please enter your address'
    } else if (value.length < 5) {
      error = 'Address must contain department number, district, city, ...'
    }
    return error
  }

  validateContact = (value) => {
    let error
    if (!value) {
      error = 'Please enter your phone number'
    } else if (isNaN(+value) || value.length < 9 || value.length > 11) {
      error = 'Invalid phone number'
    }
    return error
  }

  validateSpeciality = (value) => {
    console.log(value)
  }

  render() {
    return (
      <Row className='mb-4'>
        <Colxx xxs='12'>
          <Card>
            <CardBody>
              <h6 className='mb-4'>Thông tin nhà hàng</h6>
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  address: '',
                  coverImageUrl: '',
                  workingHour: '',
                  cityId: 0,
                  city: '',
                  areaId: '',
                  area: '',
                  phone: '',
                  // position: {},
                  isActive: true,
                  isVerified: true,

                  workingDay: '',
                  contact: '',
                  speciality: [],
                }}
                onSubmit={this.handleSubmit}
              >
                {({
                  errors,
                  touched,
                  values,
                  setFieldValue,
                  setFieldTouched,
                }) => (
                  <Form className='av-tooltip tooltip-label-right error-l-100'>
                    <FormGroup>
                      <Label>Name</Label>
                      <Field
                        className='form-control'
                        name='name'
                        validate={this.validateName}
                      />
                      {errors.name && touched.name && (
                        <div className='invalid-feedback d-block'>
                          {errors.name}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label>Address</Label>
                      <Field
                        className='form-control'
                        name='address'
                        validate={this.validateAddress}
                      />
                      {errors.address && touched.address && (
                        <div className='invalid-feedback d-block'>
                          {errors.address}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className='error-l-100'>
                      <Label>Đặc trưng</Label>
                      <FormikReactSelect
                        name='speciality'
                        id='speciality'
                        placeholder='Chọn ít nhất 1 đặc trưng'
                        value={values.reactSelect}
                        isMulti={true}
                        options={options}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        validate={this.validateSpeciality}
                      />
                      {errors.speciality && touched.speciality ? (
                        <div className='invalid-feedback d-block'>
                          {errors.speciality}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                      <Label>Giờ làm việc</Label>

                      <Row>
                        <Colxx xxs={6}>
                          <Card className='pt-4'>
                            <CardHeader>
                              <Label>Sáng trưa</Label>
                            </CardHeader>
                            <CardBody style={{ padding: '0 20px 20px 20px' }}>
                              <TimeRange
                                minValue='05:00'
                                maxValue='14:00'
                                onChangeComplete={(time) => {
                                  console.log(time)
                                }}
                              />
                            </CardBody>
                          </Card>
                        </Colxx>

                        <Colxx xxs={6}>
                          <Card className='pt-4'>
                            <CardHeader>
                              <Label>Chiều tối</Label>
                            </CardHeader>
                            <CardBody style={{ padding: '0 20px 20px 20px' }}>
                              <TimeRange
                                minValue='14:00'
                                maxValue='24:00'
                                onChangeComplete={(time) => {
                                  console.log(time)
                                }}
                              />
                            </CardBody>
                          </Card>
                        </Colxx>
                      </Row>
                    </FormGroup>

                    <FormGroup>
                      <Label>Phone number</Label>
                      <Field
                        className='form-control'
                        name='contact'
                        validate={this.validateContact}
                      />
                      {errors.contact && touched.contact && (
                        <div className='invalid-feedback d-block'>
                          {errors.contact}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label>Email</Label>
                      <Field
                        className='form-control'
                        name='email'
                        validate={this.validateEmail}
                      />
                      {errors.email && touched.email && (
                        <div className='invalid-feedback d-block error-l-'>
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>

                    <Button color='primary' type='submit'>
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    )
  }
}

export default ProfileForm
