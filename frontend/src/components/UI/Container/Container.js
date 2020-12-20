import React from 'react'
import PropTypes from 'prop-types'
import classes from './Container.module.css'

const Container = props => {
  return (
    <div className={classes.Container}>
      {props.children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.any
}

export default Container
