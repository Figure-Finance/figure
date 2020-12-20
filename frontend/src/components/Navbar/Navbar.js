import React from 'react'
import PropTypes from 'prop-types'
import classes from './Navbar.module.css'
import Container from '../UI/Container/Container'
import NavItem from './NavItem/NavItem'

const Navbar = props => {
  return (
    <div className={classes.Navbar}>
      <Container>
        <NavItem
          link='/'
          active={props.active === 'w'}>
          W
        </NavItem>
        <NavItem
          link='/monthly'
          active={props.active === 'm'}>
          M
        </NavItem>
        <NavItem
          link='/yearly'
          active={props.active === 'y'}>
          Y
        </NavItem>
        <NavItem
          link='/savings'
          active={props.active === 's'}>
          S
        </NavItem>
        <NavItem
          link='/profile'
          active={props.active === 'p'}>
          P
        </NavItem>
      </Container>
    </div>
  )
}

Navbar.propTypes = {
  active: PropTypes.string
}

export default Navbar
