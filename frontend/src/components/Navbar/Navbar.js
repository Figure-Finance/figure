import React from 'react'
import PropTypes from 'prop-types'
import classes from './Navbar.module.css'
import Container from '../UI/Container/Container'
import Button from '../UI/Button/Button'

const Navbar = props => {
  return (
    <div className={classes.Navbar}>
      <Container>
        <Button color='primary' size='square' active>W</Button>
        <Button color='primary' size='square'>M</Button>
        <Button color='primary' size='square'>Y</Button>
        <Button color='primary' size='square'>S</Button>
        <Button color='primary' size='square'>P</Button>
      </Container>
    </div>
  )
}

Navbar.propTypes = {
  active: PropTypes.string
}

export default Navbar
