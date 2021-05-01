import React, { Component, Fragment } from 'react'

class RestaurantLayout extends Component {
  componentDidMount() {
    document.body.classList.add('background')
  }
  componentWillUnmount() {
    document.body.classList.remove('background')
  }

  render() {
    return (
      <>
        <div className='merchant fixed-background' />
        <main>
          <div className='container'>{this.props.children}</div>
        </main>
      </>
    )
  }
}

export default RestaurantLayout
