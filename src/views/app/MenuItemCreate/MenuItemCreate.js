import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Label, Select } from 'reactstrap'
import { Field, Formik } from 'formik'
import IntlMessages from 'src/helpers/IntlMessages'
import { FormikReactSelect } from '../../../containers/form-validations/FormikFields'

const MenuItemCreate = (props) => {
  const {
    restaurantMenu: { menuGroup = [] },
    createMenuGroup,
    loading,
    history,
  } = props

  const [menuGroupOption, setMenuGroupOption] = useState([])

  useEffect(() => {
    if (menuGroup.length === 0) return
    const newMenuGroupOption = menuGroup.map((item) => {
      return {
        value: item.id,
        label: item.name,
      }
    })
    setMenuGroupOption(newMenuGroupOption)
  }, [menuGroup])

  const initialValues = {
    menuGroup: '',
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    isActive: true,
    index: 65537,
  }

  const handleSubmit = (values) => {
    console.log('SUBMIT create group')
    console.log(values)
    if (loading) {
      return
    }
    if (values.name !== '' && values.index !== '') {
      if (props.onSubmit) props.onSubmit(values)

      // createMenuGroup(values, history)
    }
  }

  const validateName = (value) => {
    let error
    if (!value) {
      error = `Please enter menu group's name`
    } else if (value.length < 2) {
      error = 'Value must be longer than 2 characters'
    }
    return error
  }

  const validateDescription = (value) => {
    let error
    if (!value) {
      error = `Please enter menu group's name`
    } else if (value.length < 2) {
      error = 'Value must be longer than 2 characters'
    }
    return error
  }

  const validatePrice = (value) => {
    let error
    if (!value) {
      error = `Please enter menu group's name`
    } else if (value.length < 2) {
      error = 'Value must be longer than 2 characters'
    }
    return error
  }

  const validateImage = (value) => {
    let error
    if (!value) {
      error = `Please enter menu group's name`
    } else if (value.length < 2) {
      error = 'Value must be longer than 2 characters'
    }
    return error
  }

  const validateIndex = (value) => {
    let error
    if (!value) {
      error = `Please enter menu group's index`
    } else if (isNaN(value)) {
      error = 'Value must be a number'
    }
    return error
  }

  const handleMenuGroupChange = (v) => {
    console.log('Change'.v)
  }

  return (
    <div className='mb-4'>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({
          errors,
          touched,
          values,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
          <Form
            className='av-tooltip tooltip-label-bottom'
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='menu.select-menu-group' />
              </Label>
              <select
                name='menuGroup'
                className='form-control'
                value={values.menuGroup}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {menuGroupOption.length > 0 &&
                  menuGroupOption.map((item) => {
                    return <option value={item.value}>{item.label}</option>
                  })}
              </select>

              {errors.menuGroup && touched.menuGroup ? (
                <div className='invalid-feedback d-block'>
                  {errors.menuGroup}
                </div>
              ) : null}
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='menu.menu-item-name' />
              </Label>
              <Field
                className='form-control'
                name='name'
                validate={validateName}
              />
              {errors.name && touched.name && (
                <div className='invalid-feedback d-block'>{errors.name}</div>
              )}
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='menu.menu-item-description' />
              </Label>
              <Field
                className='form-control'
                name='description'
                validate={validateDescription}
              />
              {errors.description && touched.description && (
                <div className='invalid-feedback d-block'>
                  {errors.description}
                </div>
              )}
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='menu.menu-item-price' />
              </Label>
              <Field
                className='form-control'
                name='price'
                validate={validatePrice}
              />
              {errors.price && touched.price && (
                <div className='invalid-feedback d-block'>{errors.price}</div>
              )}
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='menu.menu-item-image' />
              </Label>
              <Field
                className='form-control'
                name='image'
                validate={validateImage}
              />
              {errors.image && touched.image && (
                <div className='invalid-feedback d-block'>{errors.image}</div>
              )}
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='menu.menu-item-index' />
              </Label>
              <Field
                className='form-control'
                name='index'
                validate={validateIndex}
              />
              {errors.index && touched.index && (
                <div className='invalid-feedback d-block'>{errors.index}</div>
              )}
            </FormGroup>

            {/* <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='menu.group-index' />
              </Label>
              <Field
                className='form-control'
                name='index'
                type='number'
                validate={validateIndex}
              />
              {errors.index && touched.index && (
                <div className='invalid-feedback d-block'>{errors.index}</div>
              )}
            </FormGroup> */}

            <Button
              color='primary'
              className={`btn-shadow btn-multiple-state ${
                props.loading ? 'show-spinner' : ''
              }`}
              size='lg'
            >
              <span className='spinner d-inline-block'>
                <span className='bounce1' />
                <span className='bounce2' />
                <span className='bounce3' />
              </span>
              <span className='label'>
                <IntlMessages id='menu.menu-item-create-btn' />
              </span>
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

// export default MenuItemCreate

const mapStateToProps = ({ restaurantMenu }) => ({
  restaurantMenu,
})

export default connect(mapStateToProps, {})(MenuItemCreate)
