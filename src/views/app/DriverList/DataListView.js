import React from 'react'
import { Card, CustomInput, Badge } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'
import { ContextMenuTrigger } from 'react-contextmenu'
import { Colxx } from '../../../components/common/CustomBootstrap'
import clsx from 'clsx'

const DataListView = ({
  product: driver,
  isSelect,
  collect,
  onCheckItem,
  subItems = [],
  large,
  isTopping,
}) => {
  if (!driver) {
    return <div className='loading'></div>
  }

  const isBanned = driver.isVerified

  return (
    <Colxx xxs='12' className={clsx('mb-3')}>
      <ContextMenuTrigger id='menu_id' data={driver.id} collect={collect}>
        <Card
          // onClick={(event) => onCheckItem(event, driver.restaurantId)}
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
                to={`/app/drivers/${driver.id}`}
                className='w-sm-100'
                style={{ width: '25%' }}
              >
                <p className='list-item-heading mb-1 truncate'>
                  {driver.name}
                </p>
              </NavLink>
              <p
                className='mb-1 text-muted text-md-small w-sm-100'
                style={{ width: '15%' }}
              >
                {driver.phoneNumber}
              </p>

              <p
                className='mb-1 text-muted text-md-small w-sm-100'
                style={{ width: '15%' }}
              >
                {driver.city}
              </p>


        
              <div
                className='w-sm-100'
                style={{ width: '10%', textAlign: 'center' }}
              >
                {driver.isActive && (
                  <Badge color='warning' pill>
                    Đang hoạt động
                  </Badge>
                )}
              </div>
              <div
                className='w-sm-100'
                style={{ width: '10%', textAlign: 'center' }}
              >
                <Badge
                  color={driver.isVerified ? 'primary' : 'danger'}
                  pill
                >
                  {driver.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                </Badge>
              </div>

              <div
                className='w-sm-100'
                style={{ width: '10%', textAlign: 'center' }}
              >
                {driver.isBanned && (
                  <Badge color='danger' pill>
                    Bị cấm
                  </Badge>
                )}
              </div>

            </div>
            {/* <div>Hello</div> */}
            {/* <div className='custom-control custom-checkbox pl-1 align-self-center pr-4'>
              <CustomInput
                className='item-check mb-0'
                type='checkbox'
                id={`check_${driver.restaurantId}`}
                checked={isSelect}
                onChange={() => {}}
                label=''
              />
            </div> */}
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  )
}

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView)
