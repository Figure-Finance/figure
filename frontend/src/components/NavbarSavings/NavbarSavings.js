import React from 'react'
import PropTypes from 'prop-types'
import classes from './NavbarSavings.module.css'
import Container from '../UI/Container/Container'
import NavItem from '../Navbar/NavItem/NavItem'

const NavbarSavings = props => (
  <div className={classes.NavbarSavings}>
    <Container>
      <NavItem
        color='neutral'
        size='smallSquare'
        link='/savings'
        active={props.active === '1w'}>
        1W
      </NavItem>
      <NavItem
        color='neutral'
        size='smallSquare'
        link='/savings'
        active={props.active === '1m'}>
        1M
      </NavItem>
      <NavItem
        color='neutral'
        size='smallSquare'
        link='/savings'
        active={props.active === '3m'}>
        3M
      </NavItem>
      <NavItem
        color='neutral'
        size='smallSquare'
        link='/savings'
        active={props.active === '1y'}>
        1Y
      </NavItem>
      <NavItem
        color='neutral'
        size='smallSquare'
        link='/savings'
        active={props.active === 'a'}>
        A
      </NavItem>
    </Container>
  </div>
)

NavbarSavings.propTypes = {
  active: PropTypes.string
}

export default NavbarSavings
