import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, Row, Button } from 'reactstrap'
import { Colxx, Separator } from '../../../components/common/CustomBootstrap'
import MenuItem from '../MenuItem'
import {
  getMenuGroup,
  getMenuItems,
  setMenu,
  createMenuGroup,
} from 'src/redux/actions'

import './MenuInfo.scss'
import MenuGroupCreate from '../MenuGroupCreate'
import clsx from 'clsx'
import IntlMessages from 'src/helpers/IntlMessages'
import { findMenuGroupById } from '../dishes/utils'

import './MenuInfo.scss'

const DataList = React.lazy(() =>
  import(/* webpackChunkName: "product-data-list" */ './data-list')
)

const MenuGroup = (props) => {
  const {
    group: { id: groupId, menuId, name, isActive, index },
    merchantId,
    restaurantId,
    history,
    getMenuItems,
    menuItems = [],
  } = props

  useEffect(() => {
    // getMenuItems({ merchantId, restaurantId, menuId })
  }, [])

  const onGroupClick = () => {
    //   history.push(`/app/dishes/create/${id}`)
  }

  return (
    <div
      style={{ cursor: 'pointer', marginBottom: '40px' }}
      onClick={onGroupClick}
      className='pt-2 pl-4'
    >
      <h2 className='font-weight-600' style={{ fontWeight: '1.6rem' }}>
        {name}
      </h2>
      {/* <p>Index: {index}</p> */}
      {/* <p>{isActive ? 'Active' : 'Inactive'} </p> */}

      <div className={clsx(isActive ? '' : 'opacity-05')}>
        {menuItems.map((menuItem) => {
          if (menuItem.menuGroupId === groupId) {
            return <MenuItem key={menuItem.id} menuItem={menuItem} />
          }
          return null
        })}
        {/* <MenuItem
            merchantId={merchantId}
            restaurantId={restaurantId}
            menuId={menuId}
            menuGroup={id}
          /> */}
      </div>
    </div>

    // <Card
    //   style={{ cursor: 'pointer', marginBottom: '40px' }}
    //   onClick={onGroupClick}
    // >
    //   <CardBody>
    //     <h2>{name}</h2>
    //     {/* <p>Index: {index}</p> */}
    //     {/* <p>{isActive ? 'Active' : 'Inactive'} </p> */}

    //     <div className={clsx(isActive ? '' : 'opacity-05')}>
    //       {menuItems.map((menuItem) => {
    //         if (menuItem.menuGroupId === groupId) {
    //           return <MenuItem key={menuItem.id} menuItem={menuItem} />
    //         }
    //         return null
    //       })}
    //       {/* <MenuItem
    //         merchantId={merchantId}
    //         restaurantId={restaurantId}
    //         menuId={menuId}
    //         menuGroup={id}
    //       /> */}
    //     </div>
    //   </CardBody>
    // </Card>
  )
}

const MenuInfo = (props) => {
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showCreateItem, setShowCreateItem] = useState(false)
  const [tableData, setTableData] = useState({ data: [] })
  const [showByCategory, setShowByCategory] = useState(false)

  const {
    location: { pathname },
    setMenu,
    getMenuGroup,
    getMenuItems,
    createMenuGroup,
    history,
    // authUser: {user: {id: merchantId}},
    // restaurantInfo: {restaurant: {id: restaurantId}},
    restaurantMenu: {
      menus,
      menu,
      menuGroup,
      loading,
      error,
      menuItems,
      loadingMenuGroups,
    },
    restaurantInfo,
  } = props

  const menuId =
    pathname.split(`/app/dishes/create/`)[1] || pathname.split(`/`)[3]
  const merchantId = localStorage.getItem('merchant_id')
  const restaurantId =
    restaurantInfo.restaurant.id || localStorage.getItem('restaurant_id')

  useEffect(() => {
    // setMenu(menuId)
    // getMenuGroup({ merchantId, restaurantId, menuId })
    if (menuGroup.length === 0) {
      console.log({ merchantId, restaurantId, menuId })
      getMenuGroup({ merchantId, restaurantId, menuId })
    }
    if (menuItems.length === 0) {
      console.log({ merchantId, restaurantId, menuId })
      getMenuItems({ merchantId, restaurantId, menuId })
    }
  }, [])

  useEffect(() => {
    if (
      menuItems.length !== 0 &&
      tableData.data.length === 0 &&
      menuGroup.length > 0
    ) {
      const pageSize = 10
      const newMenuItems = menuItems.map(
        ({ id, name, imageUrl, description, menuGroupId, isActive, price }) => {
          const group = findMenuGroupById(menuGroupId, menuGroup)

          return {
            id,
            title: name,
            img: imageUrl,
            category: group.name || 'Unknown',
            statusColor: 'secondary',
            description,
            isActive,
            price,
            date: '01-06-2021',
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
      setTableData(newTableData)
    }
  }, [menuItems, menuGroup])

  useEffect(() => {
    setShowCreateGroup(false)
    setShowCreateItem(false)
  }, [menuGroup])

  const toggleDisplayByCategory = () => {
    setShowByCategory((prevState) => !prevState)
  }

  const onMenuGroupCreateClick = () => {
    console.log(props)
    setShowCreateGroup(true)
  }

  const onMenuItemCreateClick = () => {
    console.log('Creat item')
    history.push('/app/dishes/create/menu-item')
  }

  const onToppingGroupCreateClick = () => {
    console.log('Creat topping group')
    history.push('/app/dishes/create/topping-group')
  }

  const onToppingItemCreateClick = () => {
    console.log('Creat topping item')
    history.push('/app/dishes/create/topping-item')
  }

  const onSetupToppingClick = () => {
    history.push('/app/dishes/select-topping')
  }

  const onMenuGroupCreate = (values) => {
    console.log('Creat group')
    console.log({ merchantId, restaurantId, menuId, data: values })
    createMenuGroup({ merchantId, restaurantId, menuId, data: values })
  }

  const getMenuName = () => {
    const params = window.location.href.split('/')
    const menuId = params[params.length - 1]
    const foundMenu = menus.find((menu) => menu.id === menuId)
    if (foundMenu) return foundMenu.name
    return 'Thực đơn'
  }

  if (loading) {
    // return <p>Loading</p>
    return <div className='loading'></div>
  }

  // if (menuGroup.length === 0) {
  //   return <p>There's no menu group yet. Create one!</p>
  // }

  return (
    <div className='MenuInfo'>
      <div className='d-flex align-items-center justify-content-space-between mb-2'>
        <h2>{getMenuName()}</h2>
        {/* <span className='button'>Hello</span> */}
        <div>
          <button
            type='button'
            className='btn-shadow btn btn-primary btn-md mr-3 font-weight-600'
            onClick={onMenuGroupCreateClick}
          >
            <span>
              <IntlMessages id='menu.menu-group-create' />
            </span>
          </button>

          <button
            type='button'
            className='btn-shadow btn btn-primary mr-3 font-weight-600'
            onClick={onMenuItemCreateClick}
          >
            <span>
              <IntlMessages id='menu.menu-create-btn' />
            </span>
          </button>

          <button
            type='button'
            className='btn-shadow btn btn-primary mr-3 font-weight-600'
            onClick={onToppingGroupCreateClick}
          >
            <span>
              <IntlMessages id='menu.topping-group-create' />
            </span>
          </button>

          <button
            type='button'
            className='btn-shadow btn btn-primary mr-3 font-weight-600'
            onClick={onToppingItemCreateClick}
          >
            <span>
              <IntlMessages id='menu.topping-item-create' />
            </span>
          </button>

          <button
            type='button'
            className='btn-shadow btn btn-primary font-weight-600'
            onClick={onSetupToppingClick}
          >
            <span>
              <IntlMessages id='menu.select-topping' />
            </span>
          </button>
        </div>
      </div>

      {showCreateGroup && (
        <div className={clsx(loadingMenuGroups ? 'opacity-05' : 'opacity-1')}>
          <MenuGroupCreate onSubmit={onMenuGroupCreate} />
        </div>
      )}
      {showByCategory ? (
        <>
          <div
          // className='d-flex align-item'
          >
            <Button
              color='primary'
              size='lg'
              className='show-by-btn top-right-button'
              onClick={() => toggleDisplayByCategory()}
            >
              {/* <IntlMessages id='pages.add-new' /> */}
              Theo danh sách
            </Button>
          </div>
          {menuGroup.map((group) => {
            return (
              <MenuGroup
                menuItems={menuItems}
                getMenuItems={getMenuItems}
                merchantId={merchantId}
                restaurantId={restaurantId}
                group={group}
                key={group.id}
              />
            )
          })}
        </>
      ) : (
        <Row>
          <Colxx xxs='12' className='mb-4'>
            <DataList
              history={history}
              data={tableData}
              toggleDisplayByCategory={toggleDisplayByCategory}
            />
          </Colxx>
        </Row>
      )}
    </div>
  )
}

const mapStateToProps = ({ authUser, restaurantInfo, restaurantMenu }) => {
  return { authUser, restaurantInfo, restaurantMenu }
}
// export default MenuInfo

export default connect(mapStateToProps, {
  getMenuGroup,
  setMenu,
  getMenuItems,
  createMenuGroup,
})(MenuInfo)
