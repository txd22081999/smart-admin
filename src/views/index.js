import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Main extends Component {
  render() {
    console.log('Main')
    const accessToken = localStorage.getItem('access_token')
    // const merchantId = localStorage.getItem('merchant_id')

    return <Redirect to='/app' />
    if (accessToken) {
      return <Redirect to='/app' />
    }

    return <Redirect to='/admin' />
  }
}
export default Main
