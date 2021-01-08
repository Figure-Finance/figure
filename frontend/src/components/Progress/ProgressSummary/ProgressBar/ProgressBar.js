import React from 'react'
import PropTypes from 'prop-types'
import classes from './ProgressBar.module.css'
import Progress from './Progress/Progress.js'

const ProgressBar = ({
  leftPercent, rightPercent, leftColor, rightColor, single
}) => (
  <div className={classes.ProgressBar}>
    <Progress
      color={leftColor}
      percent={leftPercent || 0}
      position='left'
      single={single} />
    <Progress
      color={rightColor}
      percent={rightPercent || 0}
      position='right' />
  </div>
)

ProgressBar.propTypes = {
  leftPercent: PropTypes.number,
  rightPercent: PropTypes.number,
  leftColor: PropTypes.string,
  rightColor: PropTypes.string,
  single: PropTypes.bool
}

export default ProgressBar
