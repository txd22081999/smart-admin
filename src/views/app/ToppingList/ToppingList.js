import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Row } from 'reactstrap'
import IntlMessages from '../../../helpers/IntlMessages'

import {
  getMenus,
  getMenu,
  getMenuItems,
  getMenuGroup,
  getToppingItems,
  getToppingGroup,
} from '../../../redux/actions'

import { Colxx, Separator } from '../../../components/common/CustomBootstrap'
import Breadcrumb from '../../../containers/navs/Breadcrumb'
import { findMenuGroupById as findToppingGroupById } from '../dishes/utils'

const DataList = React.lazy(() =>
  import(/* webpackChunkName: "product-data-list" */ './data-list')
)

class ToppingList extends Component {
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
      getToppingItems,
      getToppingGroup,
      restaurantInfo: {
        restaurant: {
          // id: restaurantId = `8a9beb82-7c3f-45a5-883b-9d96a794d1f2`,
          id: restaurantId,
        },
      },
      restaurantMenu: { menus, loading, error, menu, menuItems = [] },
      getMenu,
      getMenuItems,
      getMenuGroup,
    } = this.props

    const merchantId = localStorage.getItem('merchant_id')
    const menuId = menus[0]?.id || `93e90bca-09f6-4cf2-9915-883fccb14276`

    getMenu(merchantId, restaurantId)
    // getMenuGroup({ merchantId, restaurantId, menuId })
    // getMenuItems({ merchantId, restaurantId, menuId })
    getToppingItems({ merchantId, restaurantId, menuId })
    getToppingGroup({ merchantId, restaurantId, menuId })

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
    const {
      restaurantMenu: {
        menus,
        loading,
        error,
        menu,
        menuItems = [],
        menuGroup = [],
        toppingItems = [],
        toppingGroups = [],
      },
    } = this.props
    console.log(toppingGroups)
    console.log(toppingItems)
    const pageSize = 10
    if (
      toppingItems.length !== 0 &&
      this.state.tableData.data.length === 0 &&
      toppingGroups.length > 0
    ) {
      const newToppingItems = toppingItems.map(
        ({ id, name, imageUrl, description, toppingGroupId }) => {
          const group = findToppingGroupById(toppingGroupId, toppingGroups)

          return {
            id,
            title: name,
            img: imageUrl,
            // category: group.name || 'Unknown',
            category: group.name || 'Unknown',
            statusColor: 'secondary',
            description,
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
        data: newToppingItems,
      }

      this.setState({
        tableData: newTableData,
      })
    }
  }

  render() {
    const { history, getMenu, restaurantMenu } = this.props
    const { loadingToppingItems } = restaurantMenu
    console.log(loadingToppingItems)
    const { tableData = {} } = this.state

    if (loadingToppingItems) {
      return <div className='loading' />
    }

    return (
      <Fragment>
        <Row>
          <Colxx xxs='12'>
            <Breadcrumb heading='menu.toppings' match={this.props.match} />
            <Separator className='mb-5' />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs='12' className='mb-4'>
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
  getToppingItems,
  getToppingGroup,
})(ToppingList)
