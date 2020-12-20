import React from 'react'
import PropTypes from 'prop-types'
import classes from './Input.module.css'

const Input = props => {
  return (
    <input
      type='text'
      placeholder={props.placeholder}
      className={classes.Input} />
  )
}

Input.propTypes = {
  placeholder: PropTypes.string
}

export default Input
