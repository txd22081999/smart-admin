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
import { BarChart } from '../../components/charts'

import './OrderByAreaChartCard.scss'

// const barChartData = {
//   labels: ['a', 'b', 'c', 'd', 'e'],
//   datasets: [
//     {
//       label: 'My First Dataset',
//       data: [65, 59, 80, 81, 56, 55, 40],
//       //   data: [400, 500, 600, 700, 900],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//         'rgba(255, 205, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(201, 203, 207, 0.2)',
//       ],
//       borderColor: [
//         'rgb(255, 99, 132)',
//         'rgb(255, 159, 64)',
//         'rgb(255, 205, 86)',
//         'rgb(75, 192, 192)',
//         'rgb(54, 162, 235)',
//         'rgb(153, 102, 255)',
//         'rgb(201, 203, 207)',
//       ],
//       borderWidth: 1,
//     },
//     {
//       label: 'My Second Dataset',
//       data: [55, 49, 20, 71, 86, 35, 30],
//       //   data: [400, 500, 600, 700, 900],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//         'rgba(255, 205, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(201, 203, 207, 0.2)',
//       ],
//       borderColor: [
//         'rgb(255, 99, 132)',
//         'rgb(255, 159, 64)',
//         'rgb(255, 205, 86)',
//         'rgb(75, 192, 192)',
//         'rgb(54, 162, 235)',
//         'rgb(153, 102, 255)',
//         'rgb(201, 203, 207)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// }

const barChartData = {
  labels: ['a', 'b', 'c', 'd', 'e'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      //   data: [400, 500, 600, 700, 900],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
      ],
      borderWidth: 1,
    },
    {
      label: 'My Second Dataset',
      data: [55, 49, 20, 71, 86, 35, 30],
      //   data: [400, 500, 600, 700, 900],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
      ],
      borderWidth: 1,
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const BACKGROUND_COLOR_1 = [
  'rgba(255, 99, 132, 0.6)',
  'rgba(255, 159, 64, 0.6)',
  'rgba(255, 205, 86, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(201, 203, 207, 0.6)',
]

const BORDER_COLOR_1 = [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(201, 203, 207)',
]

const BACKGROUND_COLORS = [BACKGROUND_COLOR_1]
const BORDER_COLORS = [BORDER_COLOR_1]

const OrderByAreaChartCard = (props) => {
  const { labels, data, dataArr, labelsDataset } = props

  let chartData = {
    labels,
    datasets: [
      {
        label: labelsDataset[0],
        data: dataArr[0],
      },
      {
        label: labelsDataset[1],
        data: dataArr[1],
      },
      {
        label: labelsDataset[2],
        data: dataArr[2],
      },
    ],
  }

  const LABELS = ['POS', 'Sale', 'All']
  const BACKGROUND_COLORS = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(255, 205, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
  ]
  const BORDER_COLORS = [
    'rgba(255, 99, 132)',
    'rgba(255, 205, 86)',
    'rgba(75, 192, 192)',
  ]

  chartData.datasets = chartData.datasets.map((item, index) => {
    return {
      ...item,
      backgroundColor: BACKGROUND_COLORS[index],
      borderColor: BORDER_COLORS[index],
      borderWidth: 1,
    }
  })

  console.log(chartData)

  return (
    <Card className='h-100'>
      <CardBody>
        <CardTitle>
          <IntlMessages id='dashboards.order-by-area' />
        </CardTitle>
        <div className='chart-container'>
          {labels.length === 0 ? (
            //   {true ? (
            <div className='chart-loading no-select '></div>
          ) : (
            <BarChart
              //   data={barChartData}
              data={chartData}
              options={options}
            />
          )}
        </div>
      </CardBody>
    </Card>
  )
}

export default OrderByAreaChartCard
