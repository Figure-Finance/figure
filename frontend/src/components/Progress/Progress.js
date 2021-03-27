import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './Progress.module.css'
import Container from '../UI/Container/Container'
import ProgressSummary from './ProgressSummary/ProgressSummary'
import ProgressModal from './ProgressModal/ProgressModal'

const Progress = ({
  updateProgress,
  updateGoal,
  leftColor,
  rightColor,
  leftAmount,
  rightAmount,
  single,
  showButtons,
}) => {
  const [showLeftModal, setShowLeftModal] = useState(false)
  const [showRightModal, setShowRightModal] = useState(false)

  const leftModalCloseHandler = () => {
    setShowLeftModal(false)
  }

  const leftModalSubmitHandler = (value) => {
    updateProgress(value)
    leftModalCloseHandler()
  }

  const rightModalCloseHandler = () => {
    setShowRightModal(false)
  }

  const rightModalSubmitHandler = (value) => {
    updateGoal(value)
    rightModalCloseHandler()
  }

  let content = (
    <ProgressSummary
      leftButtonClickHandler={() => setShowLeftModal(true)}
      rightButtonClickHandler={() => setShowRightModal(true)}
      leftAmount={leftAmount}
      rightAmount={rightAmount}
      leftColor={leftColor}
      rightColor={rightColor}
      single={single}
      showButtons={showButtons}
    />
  )

  if (showLeftModal) {
    content = (
      <ProgressModal
        title="Deposit"
        closeModal={leftModalCloseHandler}
        onSubmit={leftModalSubmitHandler}
        color={leftColor}
      />
    )
  } else if (showRightModal) {
    content = (
      <ProgressModal
        title="Update Goal"
        amount={rightAmount.toString()}
        closeModal={rightModalCloseHandler}
        onSubmit={rightModalSubmitHandler}
        color={rightColor || leftColor}
      />
    )
  }

  return (
    <div className={classes.Progress}>
      <Container height="100px">{content}</Container>
    </div>
  )
}

Progress.propTypes = {
  updateProgress: PropTypes.func,
  updateGoal: PropTypes.func,
  leftColor: PropTypes.string,
  rightColor: PropTypes.string,
  leftAmount: PropTypes.number,
  rightAmount: PropTypes.number,
  single: PropTypes.bool,
  showButtons: PropTypes.bool,
}

export default Progress
