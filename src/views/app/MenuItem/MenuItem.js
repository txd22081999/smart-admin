import React from 'react'
import { Card, CardBody } from 'reactstrap'

import './MenuItem.scss'

const MenuItem = (props) => {
  const {
    menuItem: {
      id,
      menuId,
      menuGroupId,
      name,
      description,
      price,
      imageUrl,
      isActive,
      index,
    },
    merchantId,
    restaurantId,
  } = props

  console.log(props)

  const onGroupClick = () => {}

  return (
    <Card
      style={{ cursor: 'pointer', marginBottom: '20px' }}
      onClick={onGroupClick}
    >
      <CardBody>
        <h2>{name}</h2>
        <p>{description}</p>
        <p>{price}</p>
        <img
          style={{ maxWidth: '200px', maxHeight: '200px' }}
          src={imageUrl}
          alt=''
        />
        <p>Index: {index}</p>
        <p>{isActive ? 'Active' : 'Inactive'} </p>
      </CardBody>
    </Card>
  )
}

export default MenuItem
