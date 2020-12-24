import React from 'react'
import PropTypes from 'prop-types'
import classes from './ProgressBar.module.css'
import Progress from './Progress/Progress.js'

const ProgressBar = props => {
  return (
    <div className={classes.ProgressBar}>
      <Progress
        color={props.leftColor}
        percent={props.leftPercent}
        position='left'
        single={props.single} />
      <Progress
        color={props.rightColor}
        percent={props.rightPercent}
        position='right' />
    </div>
  )
}

ProgressBar.propTypes = {
  leftPercent: PropTypes.number,
  rightPercent: PropTypes.number,
  leftColor: PropTypes.string,
  rightColor: PropTypes.string,
  single: PropTypes.bool
}

export default ProgressBar
