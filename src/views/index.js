import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Main extends Component {
  render() {
    const accessToken = localStorage.getItem('access_token')
    const merchantId = localStorage.getItem('merchant_id')

    if (accessToken && merchantId) {
      return <Redirect to='/app' />
    }

    return <Redirect to='/merchant' />
  }
}
export default Main
