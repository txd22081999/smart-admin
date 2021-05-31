import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Field, Formik } from 'formik'
import { NavLink } from 'react-router-dom'
import { Button, Form, FormGroup, Label } from 'reactstrap'
import IntlMessages from 'src/helpers/IntlMessages'
import ReactSelect from 'react-select'
// import makeAnimated from 'react-select'

import {
  getMenuItems,
  getToppingItems,
  setToppingByMenuItems,
  updateToppingWithMenuItems,
} from '../../../redux/actions'

const SelectTopping = (props) => {
  const {
    getToppingGroup,
    getToppingItems,
    getMenuItems,
    setToppingByMenuItems,
    loading,
    authUser,
    restaurantMenu: {
      toppingGroups = [],
      menus = [{ id: '' }],
      menuItems = [],
      toppingItems = [],
      toppingByMenuItems = [],
    },
    restaurantInfo,
    updateToppingWithMenuItems,
  } = props

  const [toppingItemsOption, setToppingItemsOption] = useState([])
  const [menuItemsOption, setMenuItemsOption] = useState([])
  const [formInfo, setFormInfo] = useState({
    menuItem: {},
    toppingItems: [],
  })

  useEffect(() => {
    // const {
    //   user: { id: merchantId } = {
    //     id: '2487f7ec-2f25-4692-a2d5-97a7a471ebbd',
    //     username: 'merchant123',
    //   },
    // } = authUser
    // const merchantId = '2487f7ec-2f25-4692-a2d5-97a7a471ebbd'
    const merchantId = localStorage.getItem('merchant_id')
    const {
      restaurant: { id: restaurantId },
    } = restaurantInfo
    const menuId = menus[0].id || ''
    console.log(merchantId, restaurantId, menuId)
    getToppingItems({ merchantId, restaurantId, menuId })
    getMenuItems({ merchantId, restaurantId, menuId })
  }, [])

  useEffect(() => {
    if (toppingItemsOption.length > 0) return

    const newToppingItemsSelection = toppingItems.map(({ name, id }) => {
      return {
        value: id,
        label: name,
      }
    })
    setToppingItemsOption(newToppingItemsSelection)
  }, [toppingItems])

  useEffect(() => {
    if (menuItemsOption.length > 0) return

    const newMenuItemsSelection = menuItems.map(({ name, id }) => {
      return {
        value: id,
        label: name,
      }
    })
    setMenuItemsOption(newMenuItemsSelection)
  }, [menuItems])

  const initialValues = {
    name: 'Cơm',
    index: 65537,
    isActive: true,
  }

  const handleSave = (values) => {
    console.log(values)
    const { createMenuGroup, loading, history } = props

    if (
      Object.keys(formInfo.menuItem).length === 0 ||
      formInfo.toppingItems.length === 0
    ) {
      console.log('EMPTY')
      return
    }

    const data = formInfo.toppingItems.map((topppingItem, i) => {
      return {
        toppingItem: {
          ...formInfo.toppingItems[i],
          menuItem: [
            {
              ...formInfo.menuItem,
            },
          ],
        },
      }
    })

    setToppingByMenuItems(data)
  }

  const handleComplete = () => {
    const merchantId = localStorage.getItem('merchant_id')
    const {
      restaurant: { id: restaurantId },
    } = restaurantInfo
    const menuId = menus[0].id || ''
    // const toppingItemId = formInfo.toppingItems
    console.log(merchantId, restaurantId, menuId)
    toppingByMenuItems.forEach((toppingByMenuItem) => {
      const {
        toppingItem: { id: toppingItemId, menuItem: menuItemArr },
      } = toppingByMenuItem
      const menuItems = menuItemArr.map((item) => ({
        menuItemId: item.id,
        customPrice: 0,
      }))
      const data = {
        menuItemToppings: menuItems,
      }

      console.log(data)
      updateToppingWithMenuItems({
        merchantId,
        restaurantId,
        menuId,
        toppingItemId,
        data,
      })
      console.log('SENT')
    })

    console.log('call api')
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

  const validateIndex = (value) => {
    let error
    if (!value) {
      error = `Please enter menu group's index`
    } else if (isNaN(value)) {
      error = 'Value must be a number'
    }
    return error
  }

  const handleMenuItemChange = ({ value, label }) => {
    setFormInfo({
      ...formInfo,
      menuItem: {
        id: value,
        name: label,
      },
    })
  }

  const handleToppingChange = (e) => {
    const newToppingItems = e.map((item) => ({
      id: item.value,
      name: item.label,
    }))
    setFormInfo((prevInfo) => {
      return {
        ...prevInfo,
        toppingItems: newToppingItems,
      }
    })
  }

  const menuGroupOption = [
    { value: 1, label: '1111' },
    { value: 2, label: '2222' },
    { value: 4, label: '3333' },
  ]

  return (
    <div className='mb-4'>
      <Formik initialValues={initialValues}>
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
                <IntlMessages id='menu.menu-item-select' />
              </Label>
              <ReactSelect
                placeholder=''
                name='menuItem'
                options={menuItemsOption}
                className='basic-multi-select'
                classNamePrefix='select'
                // noOptionsMessage='Không có món ăn nào có sẵn'
                onChange={handleMenuItemChange}
                // onChange={onToppingItemsChange}
              />
            </FormGroup>

            <FormGroup className='form-group has-float-label'>
              <Label>
                <IntlMessages id='menu.menu-topping-select' />
              </Label>
              <ReactSelect
                isMulti
                // components={makeAnimated()}
                closeMenuOnSelect={false}
                placeholder=''
                name='toppingItems'
                options={toppingItemsOption}
                className='basic-multi-select'
                classNamePrefix='select'
                noOptionsMessage={() => <p>Không có topping nào có sẵn</p>}
                onChange={handleToppingChange}
              />

              {/* <FormGroup className='form-group has-float-label'>
                <Label>
                  <IntlMessages id='menu.menu-item-index' />
                </Label>
                <Field
                  className='form-control'
                  name='index'
                  type='number'
                  validate={validateIndex}
                  onChange={(e) => {
                    console.log(e)
                    handleChange(e)
                  }}
                />
                {errors.index && touched.index && (
                  <div className='invalid-feedback d-block'>{errors.index}</div>
                )}
              </FormGroup> */}

              {/* <select
                name='menuGroup'
                className='form-control'
                value={values.menuGroup}
                multiple
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
              ) : null} */}
            </FormGroup>

            <Button
              color='primary'
              className={`btn-shadow btn-multiple-state mr-3 ${
                props.loading ? 'show-spinner' : ''
              }`}
              size='lg'
              onClick={handleSave}
            >
              <span className='spinner d-inline-block'>
                <span className='bounce1' />
                <span className='bounce2' />
                <span className='bounce3' />
              </span>
              <span className='label'>
                <IntlMessages id='menu.save-btn' />
              </span>
            </Button>

            <Button
              color='primary'
              className={`btn-shadow btn-multiple-state ${
                props.loading ? 'show-spinner' : ''
              }`}
              size='lg'
              onClick={handleComplete}
            >
              <span className='spinner d-inline-block'>
                <span className='bounce1' />
                <span className='bounce2' />
                <span className='bounce3' />
              </span>
              <span className='label'>
                <IntlMessages id='menu.complete-btn' />
              </span>
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

// export default SelectTopping

const mapStateToProps = ({ authUser, restaurantInfo, restaurantMenu }) => {
  return { authUser, restaurantInfo, restaurantMenu }
}

export default connect(mapStateToProps, {
  getToppingItems,
  getMenuItems,
  setToppingByMenuItems,
  updateToppingWithMenuItems,
})(SelectTopping)
