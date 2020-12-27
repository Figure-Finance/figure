import React, { useState } from 'react'
import PropTypes from 'prop-types'
import GraphSummary from '../GraphSummary/GraphSummary'
import GraphModal from '../GraphModal/GraphModal'

const GraphYearly = props => {
  const [showModal, setShowModal] = useState(false)

  const openModalHandler = () => {
    setShowModal(true)
  }

  const closeModalHandler = event => {
    props.onButtonClick(event)
    setShowModal(false)
  }

  let content = (
    <GraphSummary
      showYearly
      openModal={openModalHandler}
      buttonContent={props.buttonContent}
      decrementNumber={props.leftArrowClick}
      incrementNumber={props.rightArrowClick} />
  )

  if (showModal) {
    content = (
      <GraphModal
        years={props.timePeriods}
        onClick={closeModalHandler} />
    )
  }

  return content
}

GraphYearly.propTypes = {
  timePeriods: PropTypes.arrayOf(PropTypes.string),
  buttonContent: PropTypes.string,
  onButtonClick: PropTypes.func,
  leftArrowClick: PropTypes.func,
  rightArrowClick: PropTypes.func
}

export default GraphYearly
