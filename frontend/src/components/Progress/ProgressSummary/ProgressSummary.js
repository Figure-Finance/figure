import React from 'react'
import PropTypes from 'prop-types'
import classes from './ProgressSummary.module.css'
import ProgressBar from './ProgressBar/ProgressBar'
import Button from '../../UI/Button/Button'

const ProgressSummary = props => {
  let leftPercent = (
    (100 / (props.leftAmount + props.rightAmount)) * props.leftAmount
  )
  let rightPercent = (
    (100 / (props.leftAmount + props.rightAmount)) * props.rightAmount
  )

  if (props.single) {
    leftPercent = props.leftAmount / props.rightAmount * 100
    rightPercent = 0
  }

  return (
    <div className={classes.ProgressSummary}>
      <Button
        onClick={props.leftButtonClickHandler}
        color={props.leftColor}
        size='medium'>
        ${props.leftAmount.toFixed(2)}
      </Button>
      <ProgressBar
        leftColor={props.leftColor}
        rightColor={props.rightColor}
        leftPercent={leftPercent}
        rightPercent={rightPercent} />
      <Button
        onClick={props.rightButtonClickHandler}
        color={props.rightColor ? props.rightColor : props.leftColor}
        size='medium'>
        ${props.rightAmount.toFixed(2)}
      </Button>
    </div>
  )
}

ProgressSummary.propTypes = {
  leftColor: PropTypes.string,
  rightColor: PropTypes.string,
  leftAmount: PropTypes.number,
  rightAmount: PropTypes.number,
  single: PropTypes.bool,
  leftButtonClickHandler: PropTypes.func,
  rightButtonClickHandler: PropTypes.func
}

export default ProgressSummary
