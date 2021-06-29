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

  const [tableData, setTableData] = useState({ data: [] })
  const [loading, setLoading] = useState(true)
  const [loadingTable, setLoadingTable] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItems, setSelectedItems] = useState([])

  useEffect(() => {
    fetchAllDrivers(currentPage)
  }, [])

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

  const fetchAllDrivers = async (
    page = 1,
    size = 10,
    from = '2021-06-01',
    to = '2021-06-30'
  ) => {
    try {
      setLoading(true)

      const accessToken = localStorage.getItem('access_token')
      const { data } = await axios({
        method: 'GET',
        url: `${ADMIN_URL}/list-driver`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: page,
          size: PAGE_SIZE,
          from,
          to,
          // q: '',
        },
      })

      if (!data) return

      console.log(data)
      // const { data: drivers } = data
      // getTableFromData(drivers, page)
    } catch (error) {
      console.log('Error in fetching all restaurants list')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getTableFromData = (dataList, currentPage = 1) => {
    const { drivers = [], size, total } = dataList
    console.log(currentPage)
    const newTableData = {
      status: true,
      totalItem: total || drivers.length,
      totalPage: Math.ceil(total / PAGE_SIZE),
      pageSize: PAGE_SIZE,
      currentPage,
      data: drivers,
    }

    setTableData(newTableData)
  }

  const onChangePage = async (page) => {
    setCurrentPage(page)
    // await fetchAllRestaurants(page)
    await fetchAllDrivers(page)
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
