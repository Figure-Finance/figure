import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import classes from './NavItem.module.css'
import Button from '../../UI/Button/Button'

const NavItem = props => (
  <div className={classes.NavItem}>
    <NavLink to={props.link}>
      <Button
        color='primary'
        size='square'
        active={props.active}>
        {props.children}
      </Button>
    </NavLink>
  </div>
)

NavItem.propTypes = {
  children: PropTypes.string,
  active: PropTypes.bool,
  link: PropTypes.string
}

export default NavItem
