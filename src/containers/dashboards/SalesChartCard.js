import React from 'react'
import {
  Card,
  CardBody,
  CardTitle,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap'

import IntlMessages from '../../helpers/IntlMessages'
import { LineChart } from '../../components/charts'

import { lineChartData, saleByMonthData } from '../../data/charts'

const SalesChartCard = (props) => {
  const { day, month } = props

  return (
    <Card>
      <div className='position-absolute card-top-buttons'>
        <UncontrolledDropdown>
          <DropdownToggle color='' className='btn btn-header-light icon-button'>
            <i className='simple-icon-refresh' />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <IntlMessages id='dashboards.sales' />
            </DropdownItem>
            <DropdownItem>
              <IntlMessages id='dashboards.orders' />
            </DropdownItem>
            <DropdownItem>
              <IntlMessages id='dashboards.refunds' />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <CardBody>
        <CardTitle>
          <IntlMessages id='dashboards.sales' />
        </CardTitle>
        <div className='dashboard-line-chart'>
          {day && <LineChart shadow data={lineChartData} />}
          {month && <LineChart shadow data={saleByMonthData} />}
        </div>
      </CardBody>
    </Card>
  )
}

export default SalesChartCard
