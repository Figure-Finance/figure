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

  let left = (
    <h2 className={props.leftColor}>
      ${props.leftAmount.toFixed(2)}
    </h2>
  )

  let right = (
    <h2 className={props.rightColor}>
      ${props.rightAmount.toFixed(2)}
    </h2>
  )

  if (props.showButtons) {
    left = (
      <Button
        onClick={props.leftButtonClickHandler}
        color={props.leftColor}
        size='medium'>
        ${props.leftAmount.toFixed(2)}
      </Button>
    )
    right = (
      <Button
        onClick={props.rightButtonClickHandler}
        color={props.rightColor ? props.rightColor : props.leftColor}
        size='medium'>
        ${props.rightAmount.toFixed(2)}
      </Button>
    )
  }

  return (
    <div className={classes.ProgressSummary}>
      {left}
      <ProgressBar
        leftColor={props.leftColor}
        rightColor={props.rightColor}
        leftPercent={leftPercent}
        rightPercent={rightPercent}
        single={props.single} />
      {right}
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
  rightButtonClickHandler: PropTypes.func,
  showButtons: PropTypes.bool
}

export default ProgressSummary
