import React, { useState } from 'react'

import { connect } from 'react-redux'
import { Field, Formik, useFormik, Form } from 'formik'
import { NavLink } from 'react-router-dom'
import { Button, FormGroup, Label } from 'reactstrap'
import IntlMessages from 'src/helpers/IntlMessages'
import ReactSelect from 'react-select'
import { verifyRestaurant } from '../../../redux/actions'

import './RestaurantVerify.scss'

const RestaurantVerify = (props) => {
  const { dispatch } = props
  const [formInfo, setFormInfo] = useState({
    restaurantId: '5b866b5f-d32a-440a-b230-ac0dd7ff9157',
  })
  const initialValues = { restaurantId: '5b866b5f-d32a-440a-b230-ac0dd7ff9157' }

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

  return (
    <div className='p-4'>
      <h4 className='pb-2'>
        <IntlMessages id='menu.verify-restaurant-heading' />
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
                <IntlMessages id='menu.restaurant-id' />
              </Label>
              <Field
                className='form-control'
                name='restaurantId'
                type='text'
                validate={validateRestaurantId}
              />
              {errors.restaurantId && touched.restaurantId && (
                <div className='invalid-feedback d-block'>
                  {errors.restaurantId}
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
                <IntlMessages id='menu.send-btn' />
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
})(RestaurantVerify)
