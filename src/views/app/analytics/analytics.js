import React, { Component, Fragment } from 'react'
import { Row } from 'reactstrap'
import IntlMessages from '../../../helpers/IntlMessages'
import { Colxx, Separator } from '../../../components/common/CustomBootstrap'
import Breadcrumb from '../../../containers/navs/Breadcrumb'

export default class Analytics extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs='12'>
            <Breadcrumb heading='menu.analytics' match={this.props.match} />
            <Separator className='mb-5' />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs='12' className='mb-4'>
            <p>
              <IntlMessages id='menu.analytics' />
            </p>
            <h1>Hi</h1>
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}
