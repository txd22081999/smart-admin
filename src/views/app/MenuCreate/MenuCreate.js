import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
} from 'reactstrap'
import { Field, Formik } from 'formik'
import IntlMessages from 'src/helpers/IntlMessages'

import { getMenus } from '../../../redux/actions'

const Menu = (props) => {
  const {
    menu: { id, index, isActive, name, restaurantMenu },
    history,
  } = props

  console.log(history)

  const onMenuClick = () => {
    history.push(`/app/dishes/create/${id}`)
  }

  return (
    <Card style={{ cursor: 'pointer' }} onClick={onMenuClick}>
      <CardBody>
        <h2>{name}</h2>
        <p>Index: {index}</p>
        <p>{isActive ? 'Active' : 'Inactive'} </p>
      </CardBody>
    </Card>
  )
}

const MenuCreate = (props) => {
  const {
    // authUser: {
    //   user: { id: merchantId }
    // },
    restaurantInfo: {
      restaurant: { id: restaurantId = `02573012-af6f-4e29-9c6a-55e616c1e7e8` },
    },
    restaurantMenu: { menus, loading, error, menu },
    getMenu,
    history,
  } = props

  // const merchantId = `2487f7ec-2f25-4692-a2d5-97a7a471ebbd`
  const merchantId = localStorage.getItem('merchant_id')

  useEffect(() => {
    console.log(props)
    console.log(merchantId)
    console.log(restaurantId)
    // getMenu(merchantId, restaurantId)
  }, [])

  if (loading) {
    return <div className='loading'></div>
  }

  if (menus.length === 0) {
    return (
      <div>
        <h3>Create a new Menu</h3>

        {/* <div className='mt-4'>
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
                    <div className='invalid-feedback d-block'>
                      {errors.name}
                    </div>
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
                    type='number'
                    validate={validatePrice}
                  />
                  {errors.price && touched.price && (
                    <div className='invalid-feedback d-block'>
                      {errors.price}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className='form-group has-float-label'>
                  <Label>
                    <IntlMessages id='menu.menu-item-image' />
                  </Label>
                  <Field
                    className='form-control'
                    name='imageUrl'
                    validate={validateImage}
                  />
                  {errors.imageUrl && touched.imageUrl && (
                    <div className='invalid-feedback d-block'>
                      {errors.imageUrl}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className='form-group has-float-label'>
                  <Label>
                    <IntlMessages id='menu.menu-item-index' />
                  </Label>
                  <Field
                    className='form-control'
                    name='index'
                    type='number'
                    validate={validateIndex}
                  />
                  {errors.index && touched.index && (
                    <div className='invalid-feedback d-block'>
                      {errors.index}
                    </div>
                  )}
                </FormGroup>

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
        </div> */}
      </div>
    )
  }

  return (
    <div>
      <h2>Danh sách thực đơn</h2>
      {menus.map((menu) => {
        return <Menu key={menu.id} menu={menu} history={history} />
      })}
    </div>
  )
}

const mapStateToProps = ({ authUser, restaurantInfo, restaurantMenu }) => {
  return {
    authUser,
    restaurantInfo,
    restaurantMenu,
  }
}

export default connect(mapStateToProps, {
  getMenu: getMenus,
})(MenuCreate)
