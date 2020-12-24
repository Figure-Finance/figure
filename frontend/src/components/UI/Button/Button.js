import React from 'react'
import PropTypes from 'prop-types'
import classes from './Button.module.css'

const Button = props => {
  const classNames = [classes.Button]
  let content = props.children

  if (props.color === 'primary') {
    classNames.push(classes.Primary)
  } else if (props.color === 'neutral') {
    classNames.push(classes.Neutral)
  } else if (props.color === 'danger') {
    classNames.push(classes.Danger)
  } else {
    classNames.push(classes.Default)
  }

  if (props.size === 'large') {
    classNames.push(classes.Large)
  } else if (props.size === 'medium') {
    classNames.push(classes.Medium)
  } else if (props.size === 'square') {
    classNames.push(classes.Square)
  } else if (props.size === 'thin') {
    classNames.push(classes.Thin)
  }

  if (props.active) {
    classNames.push(classes.Active)
  }

  if (props.dual) {
    classNames.push(classes.Dual)
  }

  if (props.secondary) {
    content = (
      <>
        <span>
          {props.children}
        </span>
        <span className={classes.Split}></span>
        <span>
          {props.secondary}
        </span>
      </>
    )
  }

  return (
    <button
      className={classNames.join(' ')}
      onClick={props.onClick}
      style={{ width: props.width }}
      disabled={props.disabled}>
      {content}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string,
  size: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  dual: PropTypes.bool,
  secondary: PropTypes.string,
  width: PropTypes.string,
  disabled: PropTypes.bool
}

export default Button
