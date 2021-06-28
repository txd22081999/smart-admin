import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { Field, Formik, useFormik, Form } from 'formik'
import Bluebird from 'bluebird'
import { NavLink } from 'react-router-dom'
import { Button, FormGroup, Label, Row, Col } from 'reactstrap'
import { Colxx, Separator } from '../../../components/common/CustomBootstrap'
import IntlMessages from 'src/helpers/IntlMessages'
import ReactSelect from 'react-select'
import { verifyRestaurant } from '../../../redux/actions'

import DataList from './data-list'
import axios from 'axios'
import { ADMIN_URL } from 'src/constants'

import './DriverList.scss'
import { NotificationManager } from 'src/components/common/react-notifications'

const PAGE_SIZE = 10

const DriverList = (props) => {
  const { dispatch, history } = props
  const [formInfo, setFormInfo] = useState({
    restaurantId: '5b866b5f-d32a-440a-b230-ac0dd7ff9157',
  })
  const [tableData, setTableData] = useState({ data: [] })
  const [loading, setLoading] = useState(true)
  const [loadingTable, setLoadingTable] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItems, setSelectedItems] = useState([])

  useEffect(() => {
    fetchAllRestaurants(currentPage)
  }, [])

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

  const fetchAllRestaurants = async (page = 1) => {
    try {
      setLoading(true)

      const accessToken = localStorage.getItem('access_token')
      const { data } = await axios({
        method: 'GET',
        url: `${ADMIN_URL}/restaurant`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: page - 1,
          size: PAGE_SIZE,
          // q: '',
        },
      })

      if (!data) return

      const { data: dataList } = data
      getTableFromData(dataList, page)
    } catch (error) {
      console.log('Error in fetching all restaurants list')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getTableFromData = (dataList, currentPage = 1) => {
    const { results = [], size, total } = dataList
    console.log(currentPage)
    const newTableData = {
      status: true,
      totalItem: total,
      totalPage: Math.ceil(total / PAGE_SIZE),
      pageSize: PAGE_SIZE,
      currentPage,
      data: results,
    }

    setTableData(newTableData)
  }

  const onChangePage = async (page) => {
    setCurrentPage(page)
    await fetchAllRestaurants(page)
  }

  const onSelect = (ids) => {
    setSelectedItems(ids)
  }

  const onVerifyItems = async () => {
    try {
      setLoadingTable(true)
      const accessToken = localStorage.getItem('access_token')

      await Bluebird.map(selectedItems, async (restaurantId) => {
        const { data } = await axios({
          method: 'POST',
          url: `${ADMIN_URL}/verify-restaurant`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            restaurantId,
          },
        })
        if (!data) return
      })

      setTableData((prevState) => {
        return {
          ...prevState,
          data: prevState.data.map((item) => {
            const isVerified = selectedItems.includes(item.id)
              ? false
              : item.isVerified
            return {
              ...item,
              isVerified,
            }
          }),
        }
      })

      NotificationManager.success(
        `Verified ${selectedItems.length} restaurants!`,
        'Success',
        3000
      )
    } catch (error) {
      console.log('Error in Verify restaurant')
      console.error(error)
    } finally {
      setLoadingTable(false)
    }
  }

  const onGenKeyItems = async () => {
    try {
      setLoadingTable(true)
      const accessToken = localStorage.getItem('access_token')

      await Bluebird.map(selectedItems, async (restaurantId) => {
        const { data } = await axios({
          method: 'POST',
          url: `${ADMIN_URL}/generate-pos-key`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            restaurantId,
          },
        })
        if (!data) return
      })

      setTableData((prevState) => {
        return {
          ...prevState,
          data: prevState.data.map((item) => {
            // const isVerified = selectedItems.includes(item.id)
            //   ? false
            //   : item.isVerified
            return {
              ...item,
              // isVerified,
            }
          }),
        }
      })

      NotificationManager.success(
        `Generated POS Key for ${selectedItems.length} restaurants!`,
        'Success',
        3000
      )
    } catch (error) {
      console.log('Error in Generate POS Key')
      console.error(error)
    } finally {
      setLoadingTable(false)
    }
  }

  const onRemoveDeviceItems = async () => {
    try {
      setLoadingTable(true)
      const accessToken = localStorage.getItem('access_token')

      await Bluebird.map(selectedItems, async (restaurantId) => {
        const { data } = await axios({
          method: 'POST',
          url: `${ADMIN_URL}/remove-pos-device`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            restaurantId,
          },
        })
        if (!data) return
      })

      setTableData((prevState) => {
        return {
          ...prevState,
          data: prevState.data.map((item) => {
            // const isVerified = selectedItems.includes(item.id)
            //   ? false
            //   : item.isVerified
            return {
              ...item,
              // isVerified,
            }
          }),
        }
      })

      NotificationManager.success(
        `Removed POS device for ${selectedItems.length} restaurants!`,
        'Success',
        3000
      )
    } catch (error) {
      console.log('Error in Generate POS Key')
      console.error(error)
    } finally {
      setLoadingTable(false)
    }
  }

  if (loading) {
    return <div className='loading'></div>
  }

  return (
    <div className='DriverList p-4'>
      {/* <h4 className='pb-2'>
        <IntlMessages id='menu.restaurant-list' />
      </h4> */}

      {tableData.data.length === 0 ? (
        <p>Hiện tại chưa có tài xế nào nào tồn tại!</p>
      ) : (
        <Row>
          <Colxx xxs='12' className='mb-4'>
            <DataList
              history={history}
              data={tableData}
              onChangePage={onChangePage}
              currentPage={currentPage}
              isLoading={loadingTable}
              onSelect={onSelect}
              onVerifyItems={onVerifyItems}
              onGenKeyItems={onGenKeyItems}
              onRemoveDeviceItems={onRemoveDeviceItems}
              // onSelect={onSelect}
              // toggleDisplayByCategory={toggleDisplayByCategory}
              // onDeleteItems={onDeleteItems}
              // onDeactiveItems={onDeactivateItems}
              // onActiveItems={onActivateItems}
            />
          </Colxx>
        </Row>
      )}
      {/* <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
      </Formik> */}
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
})(DriverList)
