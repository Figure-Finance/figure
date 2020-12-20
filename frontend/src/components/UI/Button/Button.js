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
  } else if (props.size === 'medium') {
    classNames.push(classes.Medium)
  } else if (props.size === 'small') {
    classNames.push(classes.Small)
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
  size: PropTypes.string
}

export default Button
