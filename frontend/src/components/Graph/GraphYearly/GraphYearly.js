import React, { useState } from 'react'
import PropTypes from 'prop-types'
import GraphSummary from '../GraphSummary/GraphSummary'
import GraphModal from '../GraphModal/GraphModal'

const GraphYearly = props => {
  const [showModal, setShowModal] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(props.timePeriods.length - 1)

  const openModalHandler = () => {
    setShowModal(true)
  }

  const changeSelection = event => {
    const index = props.timePeriods.findIndex(el => el === event.target.innerHTML)
    setCurrentIndex(index)
    setShowModal(false)
  }

  const decrementNumber = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const incrementNumber = () => {
    if (currentIndex < currentIndex.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const currentTimePeriod = props.timePeriods[currentIndex].toString()

  let content = (
    <GraphSummary
      showYearly
      openModal={openModalHandler}
      buttonContent={currentTimePeriod}
      incrementNumber={incrementNumber}
      decrementNumber={decrementNumber} />
  )

  if (showModal) {
    content = (
      <GraphModal
        years={props.timePeriods}
        onClick={changeSelection} />
    )
  }

  return content
}

GraphYearly.propTypes = {
  timePeriods: PropTypes.arrayOf(PropTypes.string)
}

export default GraphYearly
