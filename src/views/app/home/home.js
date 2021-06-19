import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { Row } from 'reactstrap'
import IntlMessages from '../../../helpers/IntlMessages'
import { Badge } from 'reactstrap'
import { connect } from 'react-redux'
import Pusher from 'pusher-js'

import { Colxx, Separator } from '../../../components/common/CustomBootstrap'
import Breadcrumb from '../../../containers/navs/Breadcrumb'
// import Banner from '../../../assets/images/banner.jpg'
// import Banner from './banner.jpg'
// import Banner from './banner.jpg'
import { getMerchant } from '../../../redux/actions'

import './home.scss'
import { PUSHER_APP_CLUSTER, PUSHER_APP_KEY } from 'src/constants/config'

class Home extends Component {
  // componentDidMount() {
  //   // getMerchantInfo()
  //   const {
  //     getMerchant,
  //     authUser: {
  //       user: { id: merchantId } =,
  //     },
  //   } = this.props
  //   console.log('EDIT')
  //   // getMerchant(merchantId)
  // }

  render() {
    // console.log(Banner)
    const {
      merchantUser: { error, loading, merchant },
      restaurantInfo: {
        restaurant: {
          name,
          area,
          address,
          city,
          contractId,
          isActive,
          isVerified,
          phone,
          posAppKey,
          coverImageUrl = 'https://cdn.daynauan.info.vn/wp-content/uploads/2019/11/com-chien-ca-man.jpg',
        },
      },
    } = this.props

    if (loading) {
      return <p>Loading</p>
    }

    return (
      <Fragment>
        <Row>
          <Colxx xxs='12'>
            <Breadcrumb heading='menu.home' match={this.props.match} />
            <Separator className='mb-5' />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs='12' className='mb-4'>
            <div className='Home'>
              <div className='img-container'></div>
              <div className='store-info'>
                <div className='profile-info d-flex'>
                  <div className='profile-img'>
                    <img
                      // src='https://lh3.googleusercontent.com/proxy/81uC5i5ElutTe7HhCBfH18vDRI7HmIvy9EyAwGeWZOItoGhbVUwy0UEBMzh-6laQBzwkk4UZXTRG9Tc_wuAnJ3fpgnwucdGKey1ozbMu1nhlm_j3eUqfsSAoJ_SkX8bnUuklxVK05139BdoNQlTB8fuk'
                      src={coverImageUrl}
                      alt='avatar'
                    />
                  </div>
                  <div className='text'>
                    <div className='text-header d-flex align-items-center justify-content-between'>
                      <h3 className='name text-orange'>{name}</h3>

                      <div className=' d-flex align-items-center'>
                        <Badge
                          color='primary'
                          pill
                          style={{ padding: '5px 10px' }}
                        >
                          Cơm
                        </Badge>

                        <Badge
                          color='primary'
                          pill
                          style={{ padding: '5px 10px', marginLeft: 10 }}
                        >
                          Hủ tíu
                        </Badge>

                        <NavLink to={`/app/home/edit`} className='black'>
                          <box-icon
                            name='edit-alt'
                            type='solid'
                            style={{ marginLeft: 20, cursor: 'pointer' }}
                          ></box-icon>
                        </NavLink>
                      </div>
                    </div>

                    <div className='d-flex align-items-center'>
                      <box-icon name='current-location'></box-icon>
                      <p className='location'>
                        {/* 670 Trường Chinh, Q.Tân Bình, Tp. Hồ Chí Minh */}
                        {address}
                      </p>
                    </div>

                    <div
                      className='d-flex align-items-center justify-content-between'
                      style={{ maxWidth: 300 }}
                    >
                      <div className='d-flex align-items-center'>
                        <box-icon type='solid' name='calendar-event'></box-icon>
                        <p className='calendar'>Thứ 2 - Thứ 6</p>
                      </div>
                      <div className='time d-flex align-items-center'>
                        <box-icon name='time-five'></box-icon>
                        <p>10:00 - 13:00</p>
                      </div>
                    </div>

                    <div className='d-flex align-items-center'>
                      <box-icon name='phone' type='solid'></box-icon>
                      <p className='contact'>{phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}

// export default Home
const mapStateToProps = ({ authUser, merchantUser, restaurantInfo }) => {
  return { merchantUser, authUser, restaurantInfo }
}
export default connect(mapStateToProps, { getMerchant })(Home)
