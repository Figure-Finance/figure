import React from 'react'
import PropTypes from 'prop-types'
import classes from './Navbar.module.css'
import Container from '../UI/Container/Container'
import NavSavings from './NavSavings/NavSavings'
import Nav from './Nav/Nav'

const Navbar = props => {
  let nav = (
    <Container>
      <Nav active={props.active} style={{ width: '500px' }} />
    </Container>
  )

  if (props.isSavings) {
    nav = (
      <Container borderRadius='20px'>
        <NavSavings
          navSavingsChange={props.onNavSavingsChange}
          active={props.active}
          style={{ width: '400px' }} />
      </Container>
    )
  }

  return (
    <div className={classes.Navbar}>
      {nav}
    </div>
  )
}

Navbar.propTypes = {
  active: PropTypes.string,
  isSavings: PropTypes.bool,
  onNavSavingsChange: PropTypes.func
}

export default Navbar
