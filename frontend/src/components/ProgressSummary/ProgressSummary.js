import React from 'react'
import PropTypes from 'prop-types'
import classes from './ProgressSummary.module.css'
import Container from '../UI/Container/Container'
import ProgressBar from './ProgressBar/ProgressBar'

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
      <Container height='100px' width='98%'>
        <h1 className={props.left}>
          ${props.leftAmount.toFixed(2)}
        </h1>
        <ProgressBar
          leftColor={props.left}
          rightColor={props.right}
          leftPercent={leftPercent}
          rightPercent={rightPercent} />
        <h1 className={props.right ? props.right : props.left}>
          ${props.rightAmount.toFixed(2)}
        </h1>
      </Container>
    </div>
  )
}

ProgressSummary.propTypes = {
  left: PropTypes.string,
  right: PropTypes.string,
  leftAmount: PropTypes.number,
  rightAmount: PropTypes.number,
  single: PropTypes.bool
}

export default ProgressSummary
