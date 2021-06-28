import React from 'react'
import { Card, CustomInput, Badge } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'
import { ContextMenuTrigger } from 'react-contextmenu'
import { Colxx } from '../../../components/common/CustomBootstrap'
import clsx from 'clsx'

const DataListView = ({
  product: restaurant,
  isSelect,
  collect,
  onCheckItem,
  subItems = [],
  large,
  isTopping,
}) => {
  if (!restaurant) {
    return <div className='loading'></div>
  }

  const hasPosKey = restaurant.posAppKey !== null

  return (
    <Colxx xxs='12' className={clsx('mb-3')}>
      <ContextMenuTrigger id='menu_id' data={restaurant.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, restaurant.restaurantId)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div className='pl-2 d-flex flex-grow-1 min-width-zero'>
            <div
              className='card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center'
              style={{
                padding: '1.75rem 0.75rem',
                // opacity: restaurant.isVerify ? 1 : 0.4,
              }}
            >
              <NavLink
                to={`?p=${restaurant.id}`}
                className='w-sm-100'
                style={{ width: '25%' }}
              >
                <p className='list-item-heading mb-1 truncate'>
                  {restaurant.name}
                </p>
              </NavLink>
              <p
                className='mb-1 text-muted text-md-small w-sm-100'
                style={{ width: '15%' }}
              >
                {restaurant.merchant.fullName}
              </p>
              <p
                className='mb-1 text-muted text-md-small w-sm-100'
                style={{ width: '25%' }}
              >
                {restaurant.address}
              </p>
              <p
                className='mb-1 text-muted text-md-small w-sm-100'
                style={{ width: '5%' }}
              >
                {restaurant.contractId}
              </p>

              <div
                className='w-sm-100'
                style={{ width: '10%', textAlign: 'center' }}
              >
                {hasPosKey && (
                  <Badge color='warning' pill>
                    POS Key
                  </Badge>
                )}
              </div>

              <div
                className='w-sm-100'
                style={{ width: '10%', textAlign: 'center' }}
              >
                {restaurant.hasDevice ? (
                  <Badge color='warning' pill>
                    Có TB
                  </Badge>
                ) : (
                  <Badge color='danger' pill>
                    Không TB
                  </Badge>
                )}
              </div>

              <div
                className='w-sm-100'
                style={{ width: '10%', textAlign: 'center' }}
              >
                <Badge
                  color={restaurant.isVerified ? 'primary' : 'danger'}
                  pill
                >
                  {restaurant.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                </Badge>
              </div>
            </div>
            {/* <div>Hello</div> */}
            <div className='custom-control custom-checkbox pl-1 align-self-center pr-4'>
              <CustomInput
                className='item-check mb-0'
                type='checkbox'
                id={`check_${restaurant.restaurantId}`}
                checked={isSelect}
                onChange={() => {}}
                label=''
              />
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  )
}

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView)
