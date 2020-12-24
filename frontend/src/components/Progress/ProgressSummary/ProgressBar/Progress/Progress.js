import React from 'react'
import PropTypes from 'prop-types'
import classes from './Progress.module.css'

const Progress = props => {
  const classNames = [classes.Progress]

  if (props.position === 'left') {
    classNames.push(classes.Left)
  } else if (props.position === 'right') {
    classNames.push(classes.Right)
  }

  if (props.single) {
    classNames.push(classes.Single)
  }

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

Progress.propTypes = {
  color: PropTypes.string,
  percent: PropTypes.number,
  position: PropTypes.string,
  single: PropTypes.bool
}

export default Progress
