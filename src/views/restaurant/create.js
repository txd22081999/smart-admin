import React, { Component } from 'react'
import { Row, Card, CardTitle, Form, Label, Input, Button } from 'reactstrap'

// import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from '../../redux/actions'

import IntlMessages from '../../helpers/IntlMessages'
import { Colxx } from '../../components/common/CustomBootstrap'

import './create-restaurant.scss'
import Upload from '../../components/common/UploadImage'

const cityOptions = ['Ho Chi Minh', 'Ha Noi', 'Da Nang']

class CreateRestaurant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: 'mechant123@foa.com',
      password: '123123',
      name: 'Quán Phở Ngon',
      phone: '0943123456',
      idNumber: '272699300',
      pictures: [],
      images: [],
    }
  }

  onUserRegister = () => {
    const { username, name, password, email, phone, idNumber } = this.state
    if (username !== '' && email !== '' && password !== '') {
      // this.props.history.push('/')
      const user = {
        username,
        password,
        email,
        phone,
        fullName: name,
        IDNumber: idNumber,
      }
      console.log(user)
      registerUser(user, this.props.history)
      // registerUser()
    }
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

  render() {
    // return (
    //   <div>
    //     <Row className='h-100'>
    //       <Upload />
    //     </Row>
    //   </div>
    // )
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

                <Form>
                  <Label className='form-group has-float-label mb-4'>
                    <Input type='text' defaultValue={this.state.name} />
                    <IntlMessages id='restaurant.name' />
                  </Label>
                  <Label className='form-group has-float-label mb-4'>
                    <Input type='number' defaultValue={this.state.phone} />
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
                    {/* <Input type='number' defaultValue={this.state.phone} /> */}
                    <IntlMessages id='restaurant.position' />
                  </Label>

                  <div className='d-flex justify-content-end align-items-center'>
                    <Button
                      color='primary'
                      className='btn-shadow'
                      size='lg'
                      onClick={() => this.onUserRegister()}
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
  const { user, loading } = authUser
  return { user, loading }
}

export default connect(mapStateToProps, {
  registerUser,
})(CreateRestaurant)
