import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Container from '../UI/Container/Container'
import ProgressSummary from './ProgressSummary/ProgressSummary'
import ProgressModal from './ProgressModal/ProgressModal'
import Loader from '../Loader/Loader'

const Progress = props => {
  const [showLeftModal, setShowLeftModal] = useState(false)
  const [showRightModal, setShowRightModal] = useState(false)

  const leftModalCloseHandler = () => {
    setShowLeftModal(false)
  }

  const leftModalSubmitHandler = value => {
    props.updateProgress(value, res => {
      leftModalCloseHandler()
    })
  }

  const rightModalCloseHandler = () => {
    setShowRightModal(false)
  }

  const rightModalSubmitHandler = value => {
    props.updateGoal(value, data => {
      rightModalCloseHandler()
    })
  }

  let content = (
    <ProgressSummary
      leftButtonClickHandler={() => setShowLeftModal(true)}
      rightButtonClickHandler={() => setShowRightModal(true)}
      leftAmount={props.leftAmount}
      rightAmount={props.rightAmount}
      leftColor={props.leftColor}
      rightColor={props.rightColor}
      single={props.single} />
  )

  if (showLeftModal) {
    content = (
      <ProgressModal
        title='Deposit'
        closeModal={leftModalCloseHandler}
        onSubmit={leftModalSubmitHandler}
        color={props.leftColor} />
    )
  } else if (showRightModal) {
    content = (
      <ProgressModal
        title='Update Goal'
        amount={props.rightAmount.toString()}
        closeModal={rightModalCloseHandler}
        onSubmit={rightModalSubmitHandler}
        color={props.rightColor || props.leftColor} />
    )
  }

  if (props.loading) {
    content = <Loader />
  }

  return (
    <Container height='100px'>
      {content}
    </Container>
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
  loading: PropTypes.bool
}

export default Progress
