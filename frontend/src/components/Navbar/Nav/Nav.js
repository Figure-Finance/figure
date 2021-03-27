import React from 'react'
import PropTypes from 'prop-types'
import NavItem from '../NavItem/NavItem'

const Nav = ({ active }) => (
  <>
    <NavItem color="primary" size="square" link="/" active={active === 'w'}>
      W
    </NavItem>
    <NavItem
      color="primary"
      size="square"
      link="/monthly"
      active={active === 'm'}>
      M
    </NavItem>
    <NavItem
      color="primary"
      size="square"
      link="/yearly"
      active={active === 'y'}>
      Y
    </NavItem>
    <NavItem
      color="primary"
      size="square"
      link="/savings"
      active={active === 's'}>
      S
    </NavItem>
    <NavItem
      color="primary"
      size="square"
      link="/profile"
      active={active === 'p'}>
      P
    </NavItem>
  </>
)

Nav.propTypes = {
  active: PropTypes.string,
}

export default Nav
