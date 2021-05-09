import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Row } from 'reactstrap'
import IntlMessages from '../../../helpers/IntlMessages'

import { getMenus } from '../../../redux/actions'

import { Colxx, Separator } from '../../../components/common/CustomBootstrap'
import Breadcrumb from '../../../containers/navs/Breadcrumb'

const DataList = React.lazy(() =>
  import(/* webpackChunkName: "product-data-list" */ './data-list')
)

class Dishes extends Component {
  componentDidMount() {
    // const {
    //   // authUser: {
    //   //   user: { id: merchantId }
    //   // },
    //   restaurantInfo: {
    //     restaurant: {
    //       id: restaurantId = `0053dc1a-5473-4000-9e99-6ec2f9f2e14d`,
    //     },
    //   },
    //   getMenu,
    // } = this.props
    // const merchantId = `2487f7ec-2f25-4692-a2d5-97a7a471ebbd`
    // console.log(merchantId)
    // console.log(restaurantId)
    // getMenu(merchantId, restaurantId)
  }

  render() {
    // console.log(this.props)
    const { history, getMenu } = this.props

    return (
      <Fragment>
        <Row>
          <Colxx xxs='12'>
            <Breadcrumb heading='menu.dishes' match={this.props.match} />
            <Separator className='mb-5' />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs='12' className='mb-4'>
            <p>
              <IntlMessages id='menu.dishes' />
            </p>
            <DataList history={history} />
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}

export default Dishes

const mapStateToProps = ({ authUser, restaurantInfo }) => {
  return {
    authUser,
    restaurantInfo,
  }
}

// export default connect(mapStateToProps, {
//   getMenu,
// })(Dishes)
