import React from 'react'
import { Card, CardBody, Row } from 'reactstrap'
import { Colxx, Separator } from '../../../components/common/CustomBootstrap'

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

  const onGroupClick = () => {}

  return (
    <Card
      style={{ cursor: 'pointer', marginBottom: '20px' }}
      onClick={onGroupClick}
    >
      <CardBody>
        <Row>
          <Colxx md='3'>
            <img
              style={{ maxWidth: '200px', maxHeight: '200px' }}
              src={imageUrl}
              alt=''
              className='menu-item-image'
            />
          </Colxx>
          <Colxx md='9'>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{price}</p>
            <p>Index: {index}</p>
            <p>{isActive ? 'Active' : 'Inactive'} </p>
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  )
}

export default MenuItem
