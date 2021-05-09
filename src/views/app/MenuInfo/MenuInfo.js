import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Card, CardBody } from 'reactstrap'

import MenuItem from '../MenuItem'
import { getMenuGroup, getMenuItems, setMenu } from 'src/redux/actions'

import './MenuInfo.scss'

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
    getMenuItems({ merchantId, restaurantId, menuId })
  }, [])

  const onGroupClick = () => {
    //   history.push(`/app/dishes/create/${id}`)
  }

  return (
    <Card
      style={{ cursor: 'pointer', marginBottom: '40px' }}
      onClick={onGroupClick}
    >
      <CardBody>
        <h2>{name}</h2>
        <p>Index: {index}</p>
        <p>{isActive ? 'Active' : 'Inactive'} </p>

        <div>
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
      </CardBody>
    </Card>
  )
}

const MenuInfo = (props) => {
  console.log(props)
  const {
    location: { pathname },
    setMenu,
    getMenuGroup,
    getMenuItems,
    // authUser: {user: {id: merchantId}},
    // restaurantInfo: {restaurant: {id: restaurantId}},
    restaurantMenu: { menus, menu, menuGroup, loading, error, menuItems },
  } = props

  const menuId = pathname.split(`/app/dishes/create/`)[1]
  const merchantId = `2487f7ec-2f25-4692-a2d5-97a7a471ebbd`
  const restaurantId = `0053dc1a-5473-4000-9e99-6ec2f9f2e14d`

  useEffect(() => {
    setMenu(menuId)
    getMenuGroup({ merchantId, restaurantId, menuId })
    console.log('HIHI')
  }, [])

  if (loading) {
    // return <p>Loading</p>
    return <div className='loading'></div>
  }

  if (menuGroup.length === 0) {
    return <p>There's no menu group yet. Create one!</p>
  }

  return (
    <div>
      <h2>Thực đơn (theo nhóm)</h2>
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
})(MenuInfo)
