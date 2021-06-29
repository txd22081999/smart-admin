import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  Row,
  Card,
  CardTitle,
  CardBody,
  Label,
  FormGroup,
  Input,
  Button,
} from 'reactstrap'

import { Colxx, Separator } from '../../../components/common/CustomBootstrap'

import './RestaurantDetail.scss'
import { NotificationManager } from 'src/components/common/react-notifications'
import axios from 'axios'
import { ADMIN_URL } from 'src/constants'

const RestaurantDetail = (props) => {
  const { id } = useParams()

  const {
    restaurantInfo: { restaurants: restaurantList },
  } = props

  const [restaurantDetail, setRestaurantDetail] = useState({})
  const [loading, setLoading] = useState({
    removeDevice: false,
    genKey: false,
    verify: false,
  })
  const [posKeyValue, setPosKeyValue] = useState('')
  const [hasDevice, setHasDevice] = useState(false)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (restaurantList.length === 0) return
    const foundItem = restaurantList.find((item) => item.restaurantId === id)
    setRestaurantDetail(foundItem)
    const posKey = foundItem.posAppKey
    const hasPOSDevice = foundItem.hasDevice
    const isVerified = foundItem.isVerified
    if (posKey) {
      setPosKeyValue(posKey)
    }
    if (hasPOSDevice) {
      setHasDevice(hasPOSDevice)
    }
    if (isVerified) {
      setVerified(isVerified)
    }
  }, [restaurantList])

  const genKey = async () => {
    try {
      setLoading((prev) => ({
        ...prev,
        genKey: true,
      }))
      const accessToken = localStorage.getItem('access_token')

      const { data } = await axios({
        method: 'POST',
        url: `${ADMIN_URL}/generate-pos-key`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          restaurantId: id,
        },
      })
      if (!data) return

      const {
        data: { posAppKey },
      } = data

      setPosKeyValue(posAppKey)
      NotificationManager.success(
        `Generated POS Key succesfully!`,
        'Success',
        3000
      )
    } catch (error) {
      console.log('Error in Generate POS Key')
      console.error(error)
    } finally {
      setLoading((prev) => ({
        ...prev,
        genKey: false,
      }))
    }
  }

  const removeDevice = async () => {
    try {
      setLoading((prev) => ({
        ...prev,
        removeDevice: true,
      }))
      const accessToken = localStorage.getItem('access_token')

      const { data } = await axios({
        method: 'POST',
        url: `${ADMIN_URL}/remove-pos-device`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          restaurantId: id,
        },
      })

      setHasDevice(false)
      NotificationManager.success(
        `Removed POS device succesfully!`,
        'Success',
        3000
      )
    } catch (error) {
      console.log('Error in Generate POS Key')
      console.error(error)
    } finally {
      setLoading((prev) => ({
        ...prev,
        removeDevice: false,
      }))
    }
  }

  const verifyRestaurant = async () => {
    try {
      setLoading((prev) => ({
        ...prev,
        verify: true,
      }))
      const accessToken = localStorage.getItem('access_token')

      const { data } = await axios({
        method: 'POST',
        url: `${ADMIN_URL}/remove-pos-device`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          restaurantId: id,
        },
      })

      setVerified(true)
      NotificationManager.success(
        `Verified restaurant succesfully!`,
        'Success',
        3000
      )
    } catch (error) {
      console.log('Error in Generate POS Key')
      console.error(error)
    } finally {
      setLoading((prev) => ({
        ...prev,
        verify: false,
      }))
    }
  }

  if (Object.keys(restaurantDetail).length === 0) {
    return <div className='loading'></div>
  }

  console.log(restaurantDetail)

  const {
    name,
    isActive,
    isBanned,
    image,
    phone,
    address,
    contractId,
    merchant,
  } = restaurantDetail

  return (
    <div className='RestaurantDetail'>
      <Row>
        <h1 className='ml-4'>{name}</h1>
        <Colxx xxs='12' md='12' className='mx-auto my-auto'>
          <Card className='auth-card'>
            <CardBody>
              <div className='img-container mb-4'>
                <img src={image} alt='restaurant' />
              </div>
              <p>Số hợp đồng: {contractId}</p>
              <p>Chủ sở hữu: {merchant.fullName}</p>
              <p>Địa chỉ: {address}</p>
              <p className='mb-4'>Số điện thoại: {phone}</p>
              <p>{verified ? 'Đã xác thực' : 'Chưa xác thực'}</p>
              <p>{isActive ? 'Đang hoạt động' : 'Đang không hoạt động'}</p>
              <p>
                {posKeyValue ? `POS key: ${posKeyValue}` : 'Chưa có POS key'}
              </p>
              <p>{hasDevice ? `Đã có thiết bị` : 'Chưa có thiết bị'}</p>
              {isBanned && <p className='text-red'>Đã bị cấm</p>}

              <div className='d-flex'>
                {!verified && (
                  <Button
                    color='primary'
                    className={`btn-shadow btn-multiple-state mr-3 ${
                      loading.verify ? 'show-spinner' : ''
                    }`}
                    size='lg'
                    onClick={verifyRestaurant}
                    disabled={loading.verify}
                  >
                    <span className='spinner d-inline-block'>
                      <span className='bounce1' />
                      <span className='bounce2' />
                      <span className='bounce3' />
                    </span>
                    <span className='label'>Xác thực</span>
                  </Button>
                )}

                {!hasDevice && (
                  <Button
                    color='primary'
                    className={`btn-shadow btn-multiple-state mr-3 ${
                      loading.removeDevice ? 'show-spinner' : ''
                    }`}
                    size='lg'
                    onClick={removeDevice}
                    disabled={loading.removeDevice}
                  >
                    <span className='spinner d-inline-block'>
                      <span className='bounce1' />
                      <span className='bounce2' />
                      <span className='bounce3' />
                    </span>
                    <span className='label'>Xóa thiết bị</span>
                  </Button>
                )}

                <Button
                  color='primary'
                  className={`btn-shadow btn-multiple-state ${
                    loading.genKey ? 'show-spinner' : ''
                  }`}
                  size='lg'
                  onClick={genKey}
                  disabled={loading.genKey}
                >
                  <span className='spinner d-inline-block'>
                    <span className='bounce1' />
                    <span className='bounce2' />
                    <span className='bounce3' />
                  </span>
                  <span className='label'>Tạo POS Key</span>
                </Button>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </div>
  )
}

const mapStateToProps = ({ restaurantInfo }) => ({
  restaurantInfo,
})

export default connect(mapStateToProps, {})(RestaurantDetail)
