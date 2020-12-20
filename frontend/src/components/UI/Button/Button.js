import React from 'react'
import PropTypes from 'prop-types'
import classes from './Button.module.css'

const Button = props => {
  const classNames = [classes.Button]

  if (props.color === 'primary') {
    classNames.push(classes.Primary)
  } else if (props.color === 'neutral') {
    classNames.push(classes.Neutral)
  }

  if (props.size === 'large') {
    classNames.push(classes.Large)
  } else if (props.size === 'square') {
    classNames.push(classes.Square)
  } else if (props.size === 'small') {
    classNames.push(classes.Small)
  }

  if (props.active) {
    classNames.push(classes.Active)
  }

  return (
    <button className={classNames.join(' ')}>
      {props.children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  active: PropTypes.bool
}

export default Button
