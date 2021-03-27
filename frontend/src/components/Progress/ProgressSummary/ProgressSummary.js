import React from 'react'
import PropTypes from 'prop-types'
import classes from './ProgressSummary.module.css'
import ProgressBar from './ProgressBar/ProgressBar'
import Button from '../../UI/Button/Button'

const ProgressSummary = ({
  leftColor,
  rightColor,
  leftAmount,
  rightAmount,
  single,
  leftButtonClickHandler,
  rightButtonClickHandler,
  showButtons,
}) => {
  let leftPercent = (100 / (leftAmount + rightAmount)) * leftAmount
  let rightPercent = (100 / (leftAmount + rightAmount)) * rightAmount

  if (single) {
    leftPercent = (leftAmount / rightAmount) * 100
    rightPercent = 0
  }

  let left = (
    <h2 className={leftColor}>
      ${leftAmount ? leftAmount.toFixed(2) : (+'0').toFixed(2)}
    </h2>
  )

  let right = (
    <h2 className={rightColor}>
      ${rightAmount ? rightAmount.toFixed(2) : (+'0').toFixed(2)}
    </h2>
  )

  if (showButtons) {
    left = (
      <Button onClick={leftButtonClickHandler} color={leftColor} size="medium">
        ${leftAmount ? leftAmount.toFixed(2) : (+'0').toFixed(2)}
      </Button>
    )
    right = (
      <Button
        onClick={rightButtonClickHandler}
        color={rightColor || leftColor}
        size="medium">
        ${rightAmount ? rightAmount.toFixed(2) : (+'0').toFixed(2)}
      </Button>
    )
  }

  return (
    <div className={classes.ProgressSummary}>
      {left}
      <ProgressBar
        leftColor={leftColor}
        rightColor={rightColor}
        leftPercent={leftPercent}
        rightPercent={rightPercent}
        single={single}
      />
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
  showButtons: PropTypes.bool,
}

export default ProgressSummary
