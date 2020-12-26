import React from 'react'
import PropTypes from 'prop-types'
import NavItem from '../NavItem/NavItem'

const Nav = props => (
  <>
    <NavItem
      color='primary'
      size='square'
      link='/'
      active={props.active === 'w'}>
      W
    </NavItem>
    <NavItem
      color='primary'
      size='square'
      link='/monthly'
      active={props.active === 'm'}>
      M
    </NavItem>
    <NavItem
      color='primary'
      size='square'
      link='/yearly'
      active={props.active === 'y'}>
      Y
    </NavItem>
    <NavItem
      color='primary'
      size='square'
      link='/savings'
      active={props.active === 's'}>
      S
    </NavItem>
    <NavItem
      color='primary'
      size='square'
      link='/profile'
      active={props.active === 'p'}>
      P
    </NavItem>
  </>
)

Nav.propTypes = {
  active: PropTypes.string
}

export default Nav
