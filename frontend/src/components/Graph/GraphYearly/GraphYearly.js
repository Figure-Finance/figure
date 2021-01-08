import React, { useState } from 'react'
import PropTypes from 'prop-types'
import GraphSummary from '../GraphSummary/GraphSummary'
import GraphModal from '../GraphModal/GraphModal'

const GraphYearly = ({
  timePeriods,
  buttonContent,
  onButtonClick,
  leftArrowClick,
  rightArrowClick,
  labels,
  data
}) => {
  const [showModal, setShowModal] = useState(false)

  const openModalHandler = () => {
    setShowModal(true)
  }

  const closeModalHandler = event => {
    onButtonClick(event)
    setShowModal(false)
  }

  let content = (
    <GraphSummary
      showYearly
      data={data}
      labels={labels}
      openModal={openModalHandler}
      buttonContent={buttonContent}
      decrementNumber={leftArrowClick}
      incrementNumber={rightArrowClick} />
  )

  if (showModal) {
    content = (
      <GraphModal
        years={timePeriods}
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
  rightArrowClick: PropTypes.func,
  labels: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.object
}

export default GraphYearly
