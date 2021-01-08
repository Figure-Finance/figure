import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Container from '../UI/Container/Container'
import ChartSummary from './ChartSummary/ChartSummary'
import ChartModal from './ChartModal/ChartModal'

const Chart = ({
  timePeriods,
  currentTimePeriod,
  data,
  previousTimePeriod,
  nextTimePeriod,
  selectTimePeriod
}) => {
  const [showModal, setShowModal] = useState(false)

  const openModalHandler = () => {
    setShowModal(true)
  }

  const closeModalHandler = event => {
    selectTimePeriod(event)
    setShowModal(false)
  }

  const names = data.map(item => item.name || item.category)
  const amounts = data.map(item => item.amount)

  let content = (
    <ChartSummary
      buttonContent={currentTimePeriod}
      names={names}
      amounts={amounts}
      openModal={openModalHandler}
      leftArrowClick={previousTimePeriod}
      rightArrowClick={nextTimePeriod} />
  )

  if (showModal) {
    content = (
      <ChartModal
        timePeriods={timePeriods}
        onClick={closeModalHandler} />
    )
  }

  return (
    <Container height='100%' width='33%'>
      {content}
    </Container>
  )
}

Chart.propTypes = {
  timePeriods: PropTypes.arrayOf(PropTypes.string),
  currentTimePeriod: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  previousTimePeriod: PropTypes.func,
  nextTimePeriod: PropTypes.func,
  selectTimePeriod: PropTypes.func
}

export default Chart
