import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './Input.module.css'

const Input = props => {
  const [value, setValue] = useState('')
  const classNames = [classes.Input]

  if (props.color === 'primary') {
    classNames.push(classes.Primary)
  } else if (props.color === 'neutral') {
    classNames.push(classes.Neutral)
  } else if (props.color === 'danger') {
    classNames.push(classes.Danger)
  }

  return (
    <input
      type='text'
      value={value}
      placeholder={props.placeholder}
      className={classNames.join(' ')}
      style={{ width: props.width || '100%' }}
      onChange={e => setValue(e.target.value)} />
  )
}

Input.propTypes = {
  color: PropTypes.string,
  placeholder: PropTypes.string,
  width: PropTypes.string
}

export default Input
