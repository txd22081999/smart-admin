import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Main extends Component {
  render() {
    console.log('Main')
    const accessToken = localStorage.getItem('access_token')
    // const merchantId = localStorage.getItem('merchant_id')
    console.log(accessToken)

    // if (accessToken !== '') {
    //   return <Redirect to='/app' />
    // }

    return <Redirect to='/admin/login' />
  }
}
export default Main
