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
          // id: restaurantId = `8a9beb82-7c3f-45a5-883b-9d96a794d1f2`,
          id: restaurantId,
        },
      },
      restaurantMenu: { menus, loading, error, menu, menuItems = [] },
      getMenu,
      getMenuItems,
      getMenuGroup,
    } = this.props

    // const merchantId = `2487f7ec-2f25-4692-a2d5-97a7a471ebbd`

    // BUGGG
    const merchantId = localStorage.getItem('merchant_id')
    const restaurantIdLocal = localStorage.getItem('restaurant_id')
    // const menuId = menus[0]?.id || `93e90bca-09f6-4cf2-9915-883fccb14276`
    getMenu(merchantId, restaurantIdLocal)
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextProps.restaurantMenu.menuGroup)
    // console.log(this.props.restaurantMenu.menuGroup)
    if (
      nextProps.restaurantMenu.menuItems.length >
        this.props.restaurantMenu.menuItems.length ||
      nextProps.restaurantMenu.menus.length >
        this.props.restaurantMenu.menus.length ||
      nextProps.restaurantMenu.menuGroup.length >
        this.props.restaurantMenu.menuGroup.length ||
      nextState.tableData.data.length > this.state.tableData.data.length
    ) {
      console.log('UPDATE')
      return true
    }
    return false
  }

  componentDidUpdate(prevProps) {
    console.log('DID UPDATE')
    const {
      restaurantMenu: {
        menus,
        loading,
        error,
        menu,
        menuItems = [],
        menuGroup = [],
      },
      getMenuItems,
      getMenuGroup,
    } = this.props
    const pageSize = 10
    if (menus.length > 0) {
      console.log(menus)
      const menuId = menus[0].id
      const merchantId = localStorage.getItem('merchant_id')
      const {
        restaurantInfo: {
          restaurant: {
            // id: restaurantId = `8a9beb82-7c3f-45a5-883b-9d96a794d1f2`,
            id: restaurantId,
          },
        },
      } = this.props
      if (menuGroup.length === 0) {
        console.log('FETCH MENU GROUP')
        getMenuGroup({ merchantId, restaurantId, menuId })
      }
      if (menuItems.length === 0) {
        console.log('FETCH MENU ITEMS')
        getMenuItems({ merchantId, restaurantId, menuId })
      }
    }

    console.log(menuItems.length !== 0)
    console.log(this.state.tableData.data.length === 0)
    console.log(menuGroup.length > 0)
    // console.log(
    //   menuItems.length !== 0 &&
    //     this.state.tableData.data.length === 0 &&
    //     menuGroup.length > 0
    // )
    if (
      menuItems.length !== 0 &&
      this.state.tableData.data.length === 0 &&
      menuGroup.length > 0
    ) {
      const newMenuItems = menuItems.map(
        ({ id, name, imageUrl, description, menuGroupId }) => {
          const group = findMenuGroupById(menuGroupId, menuGroup)

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

      console.log(newMenuItems)

      const newTableData = {
        status: true,
        totalItem: menuItems.length,
        totalPage: Math.ceil(menuItems.length / pageSize),
        pageSize,
        currentPage: '1',
        data: newMenuItems,
      }

      console.log(newTableData)

      console.log('SET STATE')
      this.setState({
        tableData: newTableData,
      })
    }
  }

  render() {
    console.log('RENDER')
    const { history, getMenu, restaurantMenu } = this.props
    const {
      loadingMenuItems = false,
      loadingGetMenus = false,
      menus = [],
    } = restaurantMenu
    const { tableData = {} } = this.state

    console.log(menus)

    if (loadingMenuItems) {
      return <div className='loading' />
    }

    // if (!loadingGetMenus && menus.length === 0) {
    //   return <div>Create new menu</div>
    // }

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
            {/* {tableData.data.length > 0 && ( */}
            {true && <DataList history={history} data={tableData} />}
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
