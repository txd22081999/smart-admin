import React, { Component } from 'react'
import { Row, Card, CardTitle, Form, Label, Input, Button } from 'reactstrap'

// import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { createRestaurant } from '../../redux/actions'

import IntlMessages from '../../helpers/IntlMessages'
import { Colxx } from '../../components/common/CustomBootstrap'

import './create-restaurant.scss'
import Upload from '../../components/common/UploadImage'
import { NotificationManager } from 'src/components/common/react-notifications'

const cityOptions = ['Ho Chi Minh', 'Ha Noi', 'Da Nang']

class CreateRestaurant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: 'mechant123@foa.com',
      address: '324 Trần Hưng Đạo',
      password: '123123',
      name: 'Quán Phở Ngon',
      phone: '0943123456',
      idNumber: '272699300',
      pictures: [],
      images: [],
    }
  }

  onMerchantCreate = () => {
    const { name, password, email, phone, address } = this.state
    const { authUser, createRestaurant } = this.props
    if (Object.values(this.state).includes('')) {
      NotificationManager.error('Please complete the form', 'Error', 3000)
    }
    // this.props.history.push('/')
    const openHours = [
      {
        fromHour: 8,
        fromMinute: 0,
        toHour: 22,
        toMinute: 0,
        day: 'Monday',
      },
      {
        fromHour: 8,
        fromMinute: 0,
        toHour: 22,
        toMinute: 0,
        day: 'Tuesday',
      },
      {
        fromHour: 8,
        fromMinute: 0,
        toHour: 22,
        toMinute: 0,
        day: 'Wednesday',
      },
      {
        fromHour: 8,
        fromMinute: 0,
        toHour: 22,
        toMinute: 0,
        day: 'Thursday',
      },
      {
        fromHour: 8,
        fromMinute: 0,
        toHour: 22,
        toMinute: 0,
        day: 'Friday',
      },
    ]

    const restaurant = {
      name,
      phone,
      address,
      geo: {
        latitude: 3.253,
        longitude: -12.7589,
      },
      city: '',
      area: 'TPHCM',
      openHours,
      categories: ['RESTAURANT'],

      coverImageUrl: 'http://lorempixel.com/640/480',
      verifiedImageUrl: 'http://lorempixel.com/640/480',
      videoUrl: 0,
    }
    console.log(restaurant)
    // const merchantId = authUser.user.id
    const merchantId = localStorage.getItem('merchant_id')
    createRestaurant(merchantId, restaurant, this.props.history)
  }

  onDrop = (picture) => {
    console.log(picture)
    this.setState({
      pictures: this.state.pictures.concat(picture),
    })
  }

  onImageChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex)
    this.setState({ images: imageList })
  }

  onFormChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <Row className='h-100'>
        <Colxx xxs='12' md='10' className='mx-auto my-auto'>
          <div className='create-restaurant-container'>
            <Card style={{ padding: '30px 40px' }}>
              <div className='form-restaurant'>
                {/* <NavLink to={`/`} className='white'>
                  <span className='logo-single' />
                </NavLink> */}
                <CardTitle className='mb-4'>
                  <IntlMessages id='restaurant.create' />
                </CardTitle>

                <div className='img-upload-container'>
                  <span className='upload-label'>
                    <IntlMessages id='restaurant.coverImg' />
                  </span>
                  <div className='img-upload'>
                    <Upload onImageChange={this.onImageChange} />
                  </div>
                </div>

                <Form onChange={this.onFormChange}>
                  <Label className='form-group has-float-label mb-4'>
                    <Input
                      type='text'
                      name='name'
                      defaultValue={this.state.name}
                    />
                    <IntlMessages id='restaurant.name' />
                  </Label>

                  <Label className='form-group has-float-label mb-4'>
                    <Input
                      type='text'
                      name='phone'
                      defaultValue={this.state.phone}
                    />
                    <IntlMessages id='restaurant.phone' />
                  </Label>

                  <Label className='form-group has-float-label mb-4'>
                    <Input type='select' name='selectMulti' id='city-slect'>
                      {cityOptions.map((city) => (
                        <option>{city}</option>
                      ))}
                    </Input>
                    <IntlMessages id='restaurant.city' />
                  </Label>

                  <Label className='form-group has-float-label mb-4'>
                    <Input
                      type='text'
                      name='address'
                      defaultValue={this.state.address}
                    />
                    <IntlMessages id='restaurant.address' />
                  </Label>

                  <Label className='form-group has-float-label mb-4'>
                    {/* <Input type='number' defaultValue={this.state.phone} /> */}
                    <IntlMessages id='restaurant.position' />
                  </Label>

                  <div className='d-flex justify-content-end align-items-center'>
                    <Button
                      color='primary'
                      className='btn-shadow'
                      size='lg'
                      onClick={() => this.onMerchantCreate()}
                    >
                      <IntlMessages id='restaurant.create-button' />
                    </Button>
                  </div>
                </Form>
              </div>
            </Card>
          </div>
        </Colxx>
      </Row>
    )
  }
}
const mapStateToProps = ({ authUser }) => {
  return authUser
}

export default connect(mapStateToProps, {
  createRestaurant,
})(CreateRestaurant)
