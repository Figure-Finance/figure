import React from 'react'
import PropTypes from 'prop-types'
import classes from './Input.module.css'

const Input = props => {
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
      value={props.value}
      placeholder={props.placeholder}
      className={classNames.join(' ')}
      style={{ width: props.width || '100%' }}
      onChange={e => props.onChange(e.target.value)} />
  )
}

Input.propTypes = {
  color: PropTypes.string,
  placeholder: PropTypes.string,
  width: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func

}

export default Input
