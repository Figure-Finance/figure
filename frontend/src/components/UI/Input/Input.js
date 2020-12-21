import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './Input.module.css'

const Input = props => {
  const [value, setValue] = useState('')

  return (
    <input
      type='text'
      value={value}
      placeholder={props.placeholder}
      className={classes.Input}
      style={{ width: props.width || '100%' }}
      onChange={e => setValue(e.target.value)} />
  )
}

Input.propTypes = {
  placeholder: PropTypes.string,
  width: PropTypes.string
}

export default Input
