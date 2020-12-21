import React from 'react'
import PropTypes from 'prop-types'
import classes from './ProgressBar.module.css'
import Progress from './Progress/Progress.js'

const ProgressBar = props => {
  return (
    <div className={classes.ProgressBar}>
      <Progress
        color={props.left}
        percent='69'
        position='left' />
      <Progress
        color={props.right}
        percent='31'
        position='right' />
    </div>
  )
}

ProgressBar.propTypes = {
  left: PropTypes.string,
  right: PropTypes.string
}

export default ProgressBar
