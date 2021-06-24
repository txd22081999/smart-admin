import React, { Component, Fragment, useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
import { Row } from 'reactstrap'
import axios from 'axios'

import { Colxx, Separator } from '../../../components/common/CustomBootstrap'
import Breadcrumb from '../../../containers/navs/Breadcrumb'

import ProfileStatuses from '../../../containers/dashboards/ProfileStatuses'
import SortableStaticticsRow from '../../../containers/dashboards/SortableStaticticsRow'
import SmallLineCharts from '../../../containers/dashboards/SmallLineCharts'
import SalesChartCard from '../../../containers/dashboards/SalesChartCard'
import ProductCategoriesDoughnut from '../../../containers/dashboards/ProductCategoriesDoughnut'
import WebsiteVisitsChartCard from '../../../containers/dashboards/WebsiteVisitsChartCard'
import ConversionRatesChartCard from '../../../containers/dashboards/ConversionRatesChartCard'
import OrderStockRadarChart from '../../../containers/dashboards/OrderStockRadarChart'
import ProductCategoriesPolarArea from '../../../containers/dashboards/ProductCategoriesPolarArea'
import OrderByAreaChartCard from '../../../containers/dashboards/OrderByMonthChartCard'
import { USER_URL } from 'src/constants'
import OrderRevenueChartCard from 'src/containers/dashboards/OrderRevenueChartCard'
import RevenueInsightChartCard from 'src/containers/dashboards/RevenueInsightChartCard'

const Analytics = (props) => {
  const restaurantId = localStorage.getItem('restaurant_id')
  const merchantId = localStorage.getItem('merchant_id')
  const accessToken = localStorage.getItem('access_token')

  const [statisticType, setStatisticType] = useState('week')
  const [statisticMonth, setStatisticMonth] = useState('week')
  const [orderCountByMonth, setOrderCountByMonthData] = useState({
    labels: [],
    dataArr: [],
    labelsDataset: [],
  })
  const [orderRevenue, setOrderRevenue] = useState({
    labels: [],
    dataArr: [],
    labelsDataset: [],
  })
  const [revenueInsight, setRevenueInsight] = useState({
    labels: [],
    dataArr: [],
    labelsDataset: [],
  })

  useEffect(() => {
    fetchAnalyticsData()
    fetchRevenueInsight()
  }, [])

  useEffect(() => {
    // fetchOrderByTime()
  }, [statisticType])

  const fetchAnalyticsData = async () => {
    fetchOrderByTime()
    fetchRevenueInsight()
    // fetchOrderByArea()
  }

  const fetchOrderByTime = async () => {
    try {
      let restaurantId = `6587f789-8c76-4a2e-9924-c14fc30629ef` // Fixed
      const { data } = await axios({
        method: 'POST',
        url: `${USER_URL}/${merchantId}/restaurant/${restaurantId}/order-statistics`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          from: '2021-06-01',
          to: '2021-06-30',
          groupByInterval: statisticType,
        },
      })
      if (!data) return

      const {
        data: { statistics = [] },
      } = data

      const labels = statistics.map((item) => item.columnName)

      const posCount = []
      const saleCount = []
      const allCount = []

      const posRevenue = []
      const saleRevenue = []
      const allRevenue = []

      statistics.forEach((item) => {
        const {
          columnName,
          allOrderCount,
          allOrderTotalRevenue,
          posOrderCount,
          posOrderTotalRevenue,
          saleOrderCount,
          saleOrderTotalRevenue,
        } = item

        posCount.push(posOrderCount)
        saleCount.push(saleOrderCount)
        allCount.push(allOrderCount)

        posRevenue.push(posOrderTotalRevenue)
        saleRevenue.push(saleOrderTotalRevenue)
        allRevenue.push(allOrderTotalRevenue)
      })

      setOrderCountByMonthData({
        labels,
        dataArr: [posCount, saleCount, allCount],
        labelsDataset: ['POS', 'Sale', 'All'],
      })
      setOrderRevenue({
        labels,
        dataArr: [posRevenue, saleRevenue, allRevenue],
        labelsDataset: ['POS', 'Sale', 'All'],
      })
    } catch (error) {
      console.log('Error in fetchOrderByTime')
      console.error(error)
    }
  }

  const fetchRevenueInsight = async () => {
    try {
      let restaurantId = `6587f789-8c76-4a2e-9924-c14fc30629ef` // Fixed
      const { data } = await axios({
        method: 'POST',
        url: `${USER_URL}/${merchantId}/restaurant/${restaurantId}/revenue-insight`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          from: '2021-06-01',
          to: '2021-06-30',
        },
      })
      if (!data) return

      const {
        data: { revenueInsight = [] },
      } = data

      console.log(revenueInsight)

      const labelMapping = {
        actualRevenue: 'Doanh thu thực tế',
        feeTotal: 'Tổng phí',
        feePaid: 'Tổng phí phải trả',
        feeBilling: 'Phí đã thanh toán',
        allOrderTotalRevenue: 'Doanh thu tất cả đơn',
        saleOrderTotalRevenue: 'Doanh thu đơn sale',
        saleOnlineOrderTotalRevenue: 'Doanh thu đơn online',
        saleCODOrderTotalRevenue: 'Doanh thu đơn COD',
        posOrderTotalRevenue: 'Doanh thu đơn POS',
      }

      const labels = Object.keys(revenueInsight)
        .filter((item) => Object.keys(labelMapping).includes(item))
        .map((item) => {
          console.log(item)
          return labelMapping[item]
        })
      const dataArr = Object.values(revenueInsight)
      const labelsDataset = Object.keys(revenueInsight)

      setRevenueInsight({
        labels,
        dataArr,
        labelsDataset,
      })
    } catch (error) {
      console.log('Error in fetchOrderByTime')
      console.error(error)
    }
  }

  const fetchOrderByArea = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${USER_URL}/${merchantId}/restaurant/${restaurantId}/statistic`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      console.log(data)
    } catch (error) {
      console.log('Error in fetchOrderByArea')
      console.error(error)
    }
  }

  const handleTypeChange = (value) => {
    setStatisticType(value)
  }

  const { messages } = props.intl

  return (
    <Fragment>
      <Row>
        <Colxx xxs='12'>
          <Breadcrumb heading='menu.analytics' match={props.match} />
          <Separator className='mb-5' />
        </Colxx>
      </Row>
      <Row>
        <Colxx sm='12' md='6' className='mb-4'>
          {/* <WebsiteVisitsChartCard /> */}
          <OrderByAreaChartCard
            {...orderCountByMonth}
            handleTypeChange={handleTypeChange}
          />
        </Colxx>
        <Colxx sm='12' md='6' className='mb-4'>
          {/* <ConversionRatesChartCard /> */}
          <OrderRevenueChartCard
            {...orderRevenue}
            handleTypeChange={handleTypeChange}
          />
        </Colxx>
      </Row>

      <Row>
        <Colxx sm='12' md='12' className='mb-4'>
          {/* <WebsiteVisitsChartCard /> */}
          <RevenueInsightChartCard
            {...revenueInsight}
            handleTypeChange={handleTypeChange}
          />
        </Colxx>
      </Row>

      <Row>
        <Colxx xl='4' lg='6' md='12' className='mb-4'>
          <ProductCategoriesDoughnut />
        </Colxx>
        <Colxx xl='4' lg='6' md='12' className='mb-4'>
          <ProfileStatuses cardClass='dashboard-progress' />
        </Colxx>
        <Colxx xl='4' lg='12' md='12'>
          <SmallLineCharts itemClass='dashboard-small-chart-analytics' />
        </Colxx>
      </Row>

      {/* <SortableStaticticsRow messages={messages} /> */}

      {/* <Row>
          <Colxx xxs='12' lg='6' className='mb-4'>
            <ProductCategoriesPolarArea />
          </Colxx>
          <Colxx xxs='12' lg='6' className='mb-4'>
            <OrderStockRadarChart />
          </Colxx>
        </Row> */}

      <Row>
        <Colxx xxs='12' className='mb-4'>
          <SalesChartCard day />
        </Colxx>

        <Colxx xxs='12' className='mb-4'>
          <SalesChartCard month />
        </Colxx>
      </Row>
    </Fragment>
  )
}
export default injectIntl(Analytics)
