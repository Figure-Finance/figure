import React from 'react'
import PropTypes from 'prop-types'
import classes from './NavSavings.module.css'
import Button from '../../UI/Button/Button'

const NavSavings = ({ active, navSavingsChange }) => (
  <div className={classes.NavSavings}>
    <Button
      color="neutral"
      size="smallSquare"
      onClick={navSavingsChange}
      active={active === '1W'}>
      1W
    </Button>
    <Button
      color="neutral"
      size="smallSquare"
      onClick={navSavingsChange}
      active={active === '1M'}>
      1M
    </Button>
    <Button
      color="neutral"
      size="smallSquare"
      onClick={navSavingsChange}
      active={active === '3M'}>
      3M
    </Button>
    <Button
      color="neutral"
      size="smallSquare"
      onClick={navSavingsChange}
      active={active === '1Y'}>
      1Y
    </Button>
    <Button
      color="neutral"
      size="smallSquare"
      onClick={navSavingsChange}
      active={active === 'A'}>
      A
    </Button>
  </div>
)

NavSavings.propTypes = {
  active: PropTypes.string,
  navSavingsChange: PropTypes.func,
}

export default NavSavings
