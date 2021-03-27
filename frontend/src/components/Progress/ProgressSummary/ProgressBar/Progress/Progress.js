import React from 'react'
import PropTypes from 'prop-types'
import classes from './Progress.module.css'

const Progress = ({ color, percent, position, single }) => {
  const classNames = [classes.Progress]

  if (position === 'left') {
    classNames.push(classes.Left)
  } else if (position === 'right') {
    classNames.push(classes.Right)
  }

  if (single || percent === 100) {
    classNames.push(classes.Single)
  }

  if (color === 'primary') {
    classNames.push(classes.Primary)
  } else if (color === 'neutral') {
    classNames.push(classes.Neutral)
  } else if (color === 'danger') {
    classNames.push(classes.Danger)
  }

  return (
    <div className={classNames.join(' ')} style={{ width: `${percent}%` }} />
  )
}

Progress.propTypes = {
  color: PropTypes.string,
  percent: PropTypes.number,
  position: PropTypes.string,
  single: PropTypes.bool,
}

export default Progress
