import React, { Component, Fragment } from 'react'
import { Row } from 'reactstrap'
import IntlMessages from '../../../helpers/IntlMessages'
import { Colxx, Separator } from '../../../components/common/CustomBootstrap'
import Breadcrumb from '../../../containers/navs/Breadcrumb'
import { Badge } from 'reactstrap'
import FormikBasicFieldLevel from '../../../containers/form-validations/FormikBasicFieldLevel'
import ProfileForm from '../../../components/forms/ProfileForm'
// import Banner from '../../../assets/images/banner.jpg'
// import Banner from './banner.jpg'
// import Banner from './banner.jpg'

import './edit.scss'

class Edit extends Component {
  render() {
    // console.log(Banner)
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
            {/* <FormikBasicFieldLevel /> */}
            <ProfileForm />
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}

export default Edit
