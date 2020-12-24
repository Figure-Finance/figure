import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Container from '../UI/Container/Container'
import ProgressSummary from './ProgressSummary/ProgressSummary'
import LeftModal from './LeftModal/LeftModal'
import RightModal from './RightModal/RightModal'
import Loader from '../Loader/Loader'

const Progress = props => {
  const [showLeftModal, setShowLeftModal] = useState(false)
  const [showRightModal, setShowRightModal] = useState(false)

  const leftModalCloseHandler = () => {
    setShowLeftModal(false)
  }

  const leftModalSubmitHandler = body => {
    console.log('here')
    props.updateProgress(body, res => {
      console.log(res.data)
      leftModalCloseHandler()
    })
  }

  const rightModalCloseHandler = () => {
    setShowRightModal(false)
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
      <LeftModal
        closeModal={leftModalCloseHandler}
        onSubmit={leftModalSubmitHandler}
        color={props.leftColor} />
    )
  } else if (showRightModal) {
    content = (
      <RightModal
        closeModal={rightModalCloseHandler}
        color={props.rightColor} />
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
  leftColor: PropTypes.string,
  rightColor: PropTypes.string,
  leftAmount: PropTypes.number,
  rightAmount: PropTypes.number,
  single: PropTypes.bool,
  loading: PropTypes.bool
}

export default Progress
