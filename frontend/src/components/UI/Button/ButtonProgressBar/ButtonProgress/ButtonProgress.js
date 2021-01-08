import React from 'react'
import PropTypes from 'prop-types'
import classes from './ButtonProgress.module.css'

const ButtonProgress = ({ color, percent }) => {
  const classNames = [classes.ButtonProgress]

  if (color === 'primary') {
    classNames.push(classes.Primary)
  } else if (color === 'neutral') {
    classNames.push(classes.Neutral)
  } else if (color === 'danger') {
    classNames.push(classes.Danger)
  }

  return (
    <div
      className={classNames.join(' ')}
      style={{ width: `${percent}%` }} />
  )
}

ButtonProgress.propTypes = {
  color: PropTypes.string,
  percent: PropTypes.number
}

export default ButtonProgress
