import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import classes from './NavItem.module.css'
import Button from '../../UI/Button/Button'

const NavItem = ({ children, color, active, link, size }) => (
  <div
    className={classes.NavItem}>
    <NavLink to={link}>
      <Button
        color={color}
        size={size}
        active={active}>
        {children}
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
