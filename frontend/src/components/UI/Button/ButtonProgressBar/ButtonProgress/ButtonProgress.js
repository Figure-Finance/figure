import React from 'react'
import PropTypes from 'prop-types'
import classes from './ButtonProgress.module.css'

const ButtonProgress = props => {
  const classNames = [classes.ButtonProgress]

  if (props.color === 'primary') {
    classNames.push(classes.Primary)
  } else if (props.color === 'neutral') {
    classNames.push(classes.Neutral)
  } else if (props.color === 'danger') {
    classNames.push(classes.Danger)
  }

  return (
    <div
      className={classNames.join(' ')}
      style={{ width: `${props.percent}%` }} />
  )
}

ButtonProgress.propTypes = {
  color: PropTypes.string,
  percent: PropTypes.number
}

export default ButtonProgress
