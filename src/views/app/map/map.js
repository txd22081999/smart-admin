import React, { Component, Fragment } from 'react'
import { Row, Card, CardBody, CardTitle } from 'reactstrap'
import IntlMessages from '../../../helpers/IntlMessages'
// import { Colxx, Separator } from '../../../../components/common/CustomBootstrap'
import { Colxx, Separator } from '../../../components/common/CustomBootstrap'
import Breadcrumb from '../../../containers/navs/Breadcrumb'
import Pusher from 'pusher-js'

import { YMaps, Map, Placemark } from 'react-yandex-maps'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps'
import { PUSHER_APP_CLUSTER, PUSHER_APP_KEY } from 'src/constants/config'
import { listenNotification } from 'src/helpers/Utils'

const MapWithAMarker = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 10.7944422, lng: 106.6671633 }}
    >
      {/* <Marker position={{ lat: -34.397, lng: 150.644 }} /> */}
      {/* 10.7944422,106.6671633,17z */}
      <Marker position={{ lat: 10.7944422, lng: 106.6671633 }} />
    </GoogleMap>
  ))
)

export default class MapsUi extends Component {
  componentDidMount() {
    console.log('DID MOUNT')
    // const test_restaurant = `59648039-fb38-4a5a-8ce7-6938b27b76ab`
    // const restaurantId = localStorage.getItem('restaurant_id')
    listenNotification()
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs='12'>
            <Breadcrumb heading='menu.maps' match={this.props.match} />
            <Separator className='mb-5' />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs='12'>
            <Card className='mb-4'>
              <CardBody>
                <CardTitle>
                  <IntlMessages id='maps.google' />
                </CardTitle>
                <MapWithAMarker
                  googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCO8MfadmlotuuHC8wmjwL_46I5QAMIiRU&v=3.exp&libraries=geometry,drawing,places'
                  //   googleMapURL='https://goo.gl/maps/XJVJnLUGwVTjLYpt8'
                  loadingElement={<div className='map-item' />}
                  containerElement={<div className='map-item' />}
                  mapElement={<div className='map-item' />}
                />
              </CardBody>
            </Card>
            {/* 
            <Card className='mb-4'>
              <CardBody>
                <CardTitle>
                  <IntlMessages id='maps.yandex' />
                </CardTitle>
                <div className='map-item'>
                  <YMaps query={{ lang: 'en-US' }}>
                    <Map
                      className='map-item'
                      defaultState={{ center: [-34.397, 150.644], zoom: 9 }}
                    >
                      <Placemark defaultGeometry={[-34.397, 150.644]} />
                    </Map>
                  </YMaps>
                </div>
              </CardBody>
            </Card> */}
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}
