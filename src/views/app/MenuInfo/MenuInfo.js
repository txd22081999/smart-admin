import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Card, CardBody } from 'reactstrap'

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
  console.log(props)

  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showCreateItem, setShowCreateItem] = useState(false)

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

  const menuId = pathname.split(`/app/dishes/create/`)[1]
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
    console.log('MenuInfo Mounted')
  }, [])

  useEffect(() => {
    setShowCreateGroup(false)
    setShowCreateItem(false)
  }, [menuGroup])

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

  if (loading) {
    // return <p>Loading</p>
    return <div className='loading'></div>
  }

  // if (menuGroup.length === 0) {
  //   return <p>There's no menu group yet. Create one!</p>
  // }

  return (
    <div>
      <div className='d-flex align-items-center justify-content-space-between mb-2'>
        <h2>Thực đơn (theo nhóm)</h2>
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
