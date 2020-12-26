import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import classes from './NavItem.module.css'
import Button from '../../UI/Button/Button'

const NavItem = props => (
  <div
    className={
      props.size === 'small' ? classes.NavItem : classes.NavItemSmall
    }>
    <NavLink to={props.link}>
      <Button
        color={props.color}
        size={props.size}
        active={props.active}>
        {props.children}
      </Button>
    </NavLink>
  </div>
)

NavItem.propTypes = {
  children: PropTypes.string,
  color: PropTypes.string,
  active: PropTypes.bool,
  link: PropTypes.string,
  size: PropTypes.string
}

export default NavItem
