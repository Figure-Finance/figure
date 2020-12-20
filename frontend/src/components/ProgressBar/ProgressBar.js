import React from 'react'
import classes from './ProgressBar.module.css'
import Progress from './Progress/Progress.js'

const ProgressBar = props => {
  return (
    <div className={classes.ProgressBar}>
      <Progress
        color='primary'
        percent='69'
        position='left' />
      <Progress
        color='danger'
        percent='31'
        position='right' />
    </div>
  )
}

export default ProgressBar
