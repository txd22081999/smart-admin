import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Row } from 'reactstrap'
import IntlMessages from '../../../helpers/IntlMessages'

import {
  getMenus,
  getMenu,
  getMenuItems,
  getMenuGroup,
} from '../../../redux/actions'

import { Colxx, Separator } from '../../../components/common/CustomBootstrap'
import Breadcrumb from '../../../containers/navs/Breadcrumb'
import { findMenuGroupById } from './utils'

const DataList = React.lazy(() =>
  import(/* webpackChunkName: "product-data-list" */ './data-list')
)

class Dishes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData: {
        data: [],
      },
    }
  }

  componentDidMount() {
    const {
      history,
      // authUser: {
      //   user: { id: merchantId }
      // },
      restaurantInfo: {
        restaurant: {
          id: restaurantId = `8a9beb82-7c3f-45a5-883b-9d96a794d1f2`,
        },
      },
      restaurantMenu: { menus, loading, error, menu, menuItems = [] },
      getMenu,
      getMenuItems,
      getMenuGroup,
    } = this.props

    const merchantId = `2487f7ec-2f25-4692-a2d5-97a7a471ebbd`
    const menuId = menus[0]?.id || `93e90bca-09f6-4cf2-9915-883fccb14276`
    console.log(menuItems)

    getMenu(merchantId, restaurantId)
    getMenuGroup({ merchantId, restaurantId, menuId })
    getMenuItems({ merchantId, restaurantId, menuId })

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

  componentDidUpdate() {
    console.log('Update', this.props)
    const {
      restaurantMenu: {
        menus,
        loading,
        error,
        menu,
        menuItems = [],
        menuGroup = [],
      },
    } = this.props
    const pageSize = 10
    if (
      menuItems.length !== 0 &&
      this.state.tableData.data.length === 0 &&
      menuGroup.length > 0
    ) {
      console.log('Have data')
      console.log(menuItems)

      const newMenuItems = menuItems.map(
        ({ id, name, imageUrl, description, menuGroupId }) => {
          const group = findMenuGroupById(menuGroupId, menuGroup)
          console.log(group)
          return {
            id,
            title: name,
            img: imageUrl,
            // category: group.name || 'Unknown',
            category: group.name || 'Unknown',
            statusColor: 'secondary',
            description,
            sales: 574,
            stock: 16,
            date: '01.04.2021',
          }
        }
      )

      const newTableData = {
        status: true,
        totalItem: menuItems.length,
        totalPage: Math.ceil(menuItems.length / pageSize),
        pageSize,
        currentPage: '1',
        data: newMenuItems,
      }

      // {
      //   "status": true,
      //   "totalItem": 20,
      //   "totalPage": 2,
      //   "pageSize": "10",
      //   "currentPage": "1",
      //   "data": [
      //       {
      //           "id": 18,
      //           "title": "Cơm chiên",
      //           "img": "/assets/img/bebinca-thumb.jpg",
      //           "category": "Món chính",
      //           "status": "Đang chuẩn bị",
      //           "statusColor": "secondary",
      //           "description": "Homemade cheesecake with fresh berries and mint",
      //           "sales": 574,
      //           "stock": 16,
      //           "date": "01.04.2021"
      //       },
      this.setState({
        tableData: newTableData,
      })
    }
  }

  render() {
    console.log(this.state)
    // console.log(this.props)
    const { history, getMenu } = this.props
    const { tableData = {} } = this.state

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
            {tableData.data.length > 0 && (
              <DataList history={history} data={tableData} />
            )}
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}

// export default Dishes

const mapStateToProps = ({ authUser, restaurantInfo, restaurantMenu }) => {
  return {
    authUser,
    restaurantInfo,
    restaurantMenu,
  }
}

export default connect(mapStateToProps, {
  getMenu,
  getMenuItems,
  getMenuGroup,
})(Dishes)
