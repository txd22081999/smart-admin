import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardTitle } from 'reactstrap'

import { getMenus } from '../../../redux/actions'

const Menu = (props) => {
  const {
    menu: { id, index, isActive, name, restaurantMenu },
    history,
  } = props

  console.log(history)

  const onMenuClick = () => {
    history.push(`/app/dishes/create/${id}`)
  }

  return (
    <Card style={{ cursor: 'pointer' }} onClick={onMenuClick}>
      <CardBody>
        <h2>{name}</h2>
        <p>Index: {index}</p>
        <p>{isActive ? 'Active' : 'Inactive'} </p>
      </CardBody>
    </Card>
  )
}

const MenuCreate = (props) => {
  const {
    // authUser: {
    //   user: { id: merchantId }
    // },
    restaurantInfo: {
      restaurant: { id: restaurantId = `02573012-af6f-4e29-9c6a-55e616c1e7e8` },
    },
    restaurantMenu: { menus, loading, error, menu },
    getMenu,
    history,
  } = props

  const merchantId = `2487f7ec-2f25-4692-a2d5-97a7a471ebbd`

  useEffect(() => {
    console.log(merchantId)
    console.log(restaurantId)
    getMenu(merchantId, restaurantId)
  }, [])

  if (loading) {
    return <div className='loading'></div>
  }

  if (menus.length === 0) {
    return <div>Create a new Menu</div>
  }

  return (
    <div>
      <h2>Danh sách thực đơn</h2>
      {menus.map((menu) => {
        return <Menu key={menu.id} menu={menu} history={history} />
      })}
    </div>
  )
}

const mapStateToProps = ({ authUser, restaurantInfo, restaurantMenu }) => {
  return {
    authUser,
    restaurantInfo,
    restaurantMenu,
  }
}

export default connect(mapStateToProps, {
  getMenu: getMenus,
})(MenuCreate)
