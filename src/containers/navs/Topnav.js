import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input,
  Tooltip,
} from 'reactstrap'

import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import IntlMessages from '../../helpers/IntlMessages'
import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
  changeLocale,
  getRestaurant,
} from '../../redux/actions'

import {
  menuHiddenBreakpoint,
  searchPath,
  localeOptions,
  isDarkSwitchActive,
} from '../../constants/defaultValues'

import { MobileMenuIcon, MenuIcon } from '../../components/svg'
import TopnavEasyAccess from './Topnav.EasyAccess'
import TopnavNotifications from './Topnav.Notifications'
import TopnavDarkSwitch from './Topnav.DarkSwitch'

import { getDirection, setDirection } from '../../helpers/Utils'

class TopNav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isInFullScreen: false,
      searchKeyword: '',
      tooltipOpen: false,
    }
  }

  componentDidMount() {}

  handleChangeLocale = (locale, direction) => {
    this.props.changeLocale(locale)

    const currentDirection = getDirection().direction
    if (direction !== currentDirection) {
      setDirection(direction)
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }

  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    )
  }

  handleSearchIconClick = (e) => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target
      if (!e.target.classList.contains('search')) {
        if (e.target.parentElement.classList.contains('search')) {
          elem = e.target.parentElement
        } else if (
          e.target.parentElement.parentElement.classList.contains('search')
        ) {
          elem = e.target.parentElement.parentElement
        }
      }

      if (elem.classList.contains('mobile-view')) {
        this.search()
        elem.classList.remove('mobile-view')
        this.removeEventsSearch()
      } else {
        elem.classList.add('mobile-view')
        this.addEventsSearch()
      }
    } else {
      this.search()
    }
  }

  addEventsSearch = () => {
    document.addEventListener('click', this.handleDocumentClickSearch, true)
  }

  removeEventsSearch = () => {
    document.removeEventListener('click', this.handleDocumentClickSearch, true)
  }

  handleDocumentClickSearch = (e) => {
    let isSearchClick = false
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('navbar') ||
        e.target.classList.contains('simple-icon-magnifier'))
    ) {
      isSearchClick = true
      if (e.target.classList.contains('simple-icon-magnifier')) {
        this.search()
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains('search')
    ) {
      isSearchClick = true
    }

    if (!isSearchClick) {
      const input = document.querySelector('.mobile-view')
      if (input && input.classList) input.classList.remove('mobile-view')
      this.removeEventsSearch()
      this.setState({
        searchKeyword: '',
      })
    }
  }

  handleSearchInputChange = (e) => {
    this.setState({
      searchKeyword: e.target.value,
    })
  }

  handleSearchInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.search()
    }
  }

  search = () => {
    this.props.history.push(searchPath + '/' + this.state.searchKeyword)
    this.setState({
      searchKeyword: '',
    })
  }

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen()

    var docElm = document.documentElement
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen()
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen()
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen()
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen,
    })
  }

  handleLogout = () => {
    this.props.logoutUser(this.props.history)
  }

  menuButtonClick = (e, menuClickCount, containerClassnames) => {
    e.preventDefault()

    setTimeout(() => {
      var event = document.createEvent('HTMLEvents')
      event.initEvent('resize', false, false)
      window.dispatchEvent(event)
    }, 350)
    this.props.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      this.props.selectedMenuHasSubItems
    )
  }

  mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault()
    this.props.clickOnMobileMenu(containerClassnames)
  }

  handleSelectRestaurant = () => {
    const { history } = this.props
    history.replace({
      pathname: '/restaurant/select',
      // search: '?query=abc',
      // state:{isActive: true}
    })
  }

  toggleTooltip = () => {
    this.setState((prevState) => ({
      tooltipOpen: !prevState.tooltipOpen,
    }))
  }

  selectRestaurant = () => {
    this.props.history.replace({
      pathname: '/restaurant/select',
    })
  }

  redirectToEditProfile = () => {
    console.log('click')
    const { history } = this.props
    history.push('/app/home/edit')
  }

  render() {
    const {
      containerClassnames,
      menuClickCount,
      locale,
      profileImg,
      restaurantInfo,
      authUser: {user} = {user: {}}
    } = this.props
    const { messages } = this.props.intl
    const {
      restaurant: { name: restaurantName = '', coverImageUrl },
    } = restaurantInfo

    const { tooltipOpen } = this.state

    return (
      <nav className='navbar fixed-top'>
        <div className='d-flex align-items-center'>
          <NavLink
            to='#'
            className='menu-button d-none d-md-block'
            onClick={(e) =>
              this.menuButtonClick(e, menuClickCount, containerClassnames)
            }
          >
            <MenuIcon />
          </NavLink>

          <NavLink
            to='#'
            className='menu-button-mobile d-xs-block d-sm-block d-md-none'
            onClick={(e) => this.mobileMenuButtonClick(e, containerClassnames)}
          >
            <MobileMenuIcon />
          </NavLink>

          {/* <div className='search' data-search-path='/app/pages/search'>
            <Input
              name='searchKeyword'
              id='searchKeyword'
              placeholder={messages['menu.search']}
              value={this.state.searchKeyword}
              onChange={(e) => this.handleSearchInputChange(e)}
              onKeyPress={(e) => this.handleSearchInputKeyPress(e)}
            />
            <span
              className='search-icon'
              onClick={(e) => this.handleSearchIconClick(e)}
            >
              <i className='simple-icon-magnifier' />
            </span>
          </div> */}

          {/* <div className='d-inline-block'>
            <UncontrolledDropdown className='ml-2'>
              <DropdownToggle
                caret
                color='light'
                size='sm'
                className='language-button'
              >
                <span className='name'>{locale.toUpperCase()}</span>
              </DropdownToggle>
              <DropdownMenu className='mt-3' right>
                {localeOptions.map((l) => {
                  return (
                    <DropdownItem
                      onClick={() => this.handleChangeLocale(l.id, l.direction)}
                      key={l.id}
                    >
                      {l.name}
                    </DropdownItem>
                  )
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div> */}

          {/* <div className='position-relative d-none d-none d-lg-inline-block'>
            <a
              className='btn btn-outline-primary btn-sm ml-2'
              target='_top'
              href='https://themeforest.net/cart/configure_before_adding/22544383?license=regular&ref=ColoredStrategies&size=source'
            >
              <IntlMessages id='user.buy' />
            </a>
          </div> */}
        </div>

        <a className='navbar-logo' href='/app'>
          <span className='site-logo'>
            Smart<span className='text-purple'>Admin</span>
          </span>
          {/* <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" /> */}
        </a>

        <div className='navbar-right'>
          {isDarkSwitchActive && <TopnavDarkSwitch />}

          <div className='header-icons d-inline-block align-middle'>
            {/* <div
              style={{ display: 'inline-block', padding: '0.6rem' }}
              onMouseOver={() => {
                this.setState({
                  tooltipOpen: true,
                })
              }}
              onClick={this.selectRestaurant}
            >
              <span
                style={{ marginBottom: -2, cursor: 'pointer' }}
                class='iconify'
                data-icon='bi:shop'
                data-inline='false'
                data-width='22'
                data-height='22'
                color='#aaaaaa'
                id='selectRestaurant'
              ></span>
              <Tooltip
                placement='bottom'
                isOpen={tooltipOpen}
                target={'selectRestaurant'}
                toggle={this.toggleTooltip}
              >
                Chọn nhà hàng
              </Tooltip>
            </div> */}

            <TopnavEasyAccess />
            {/* <TopnavNotifications /> */}
            <button
              className='header-icon btn btn-empty d-none d-sm-inline-block'
              type='button'
              id='fullScreenButton'
              onClick={this.toggleFullScreen}
            >
              {this.state.isInFullScreen ? (
                <i className='simple-icon-size-actual d-block' />
              ) : (
                <i className='simple-icon-size-fullscreen d-block' />
              )}
            </button>
          </div>
          <div className='user d-inline-block'>
            <UncontrolledDropdown className='dropdown-menu-right'>
              <DropdownToggle className='p-0' color='empty'>
                <span className='name mr-1'>
                  {user?.username || 'Admin'}
                </span>
                <span>
                  {/* <img alt='Profile' src='/assets/img/profile-pic-l.jpg' /> */}
                  <img
                    style={{ width: '40px', height: '40px' }}
                    alt='Profile'
                    src={
                      'data:image/png;base64,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'
                      // coverImageUrl ||
                      // 'https://cdn.daynauan.info.vn/wp-content/uploads/2019/11/com-chien-ca-man.jpg'
                    }
                  />
                </span>
              </DropdownToggle>
              <DropdownMenu className='mt-3' right>
                <DropdownItem onClick={this.redirectToEditProfile}>
                  Tài khoản
                </DropdownItem>
                {/* <DropdownItem>Features</DropdownItem>
                <DropdownItem>History</DropdownItem> */}
                <DropdownItem>Hỗ trợ</DropdownItem>
                <DropdownItem divider />
                {/* <DropdownItem onClick={() => this.handleSelectRestaurant()}>
                  Chọn nhà hàng
                </DropdownItem> */}
                <DropdownItem onClick={() => this.handleLogout()}>
                  Đăng xuất
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = ({ menu, settings, restaurantInfo, authUser }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu
  const { locale } = settings
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
    restaurantInfo,
    authUser
  }
}
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnames,
    clickOnMobileMenu,
    logoutUser,
    changeLocale,
    getRestaurant,
  })(TopNav)
)
