import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Container from '../UI/Container/Container'
import ChartSummary from './ChartSummary/ChartSummary'
import ChartModal from './ChartModal/ChartModal'

const Chart = props => {
  const [showModal, setShowModal] = useState(false)

  const openModalHandler = () => {
    setShowModal(true)
  }

  const names = props.data.map(item => item.name || item.category)
  const amounts = props.data.map(item => item.amount)

  let content = (
    <ChartSummary
      buttonContent={props.currentTimePeriod}
      names={names}
      amounts={amounts}
      openModal={openModalHandler}
      leftArrowClick={props.previousTimePeriod}
      rightArrowClick={props.nextTimePeriod} />
  )

  if (showModal) {
    content = (
      <ChartModal
        timePeriods={props.timePeriods}
        onClick={props.changeTimePeriod} />
    )
  }

  return (
    <Container height='100%' width='33%'>
      {content}
    </Container>
  )
}

Chart.propTypes = {
  title: PropTypes.string,
  timePeriods: PropTypes.arrayOf(PropTypes.string),
  currentTimePeriod: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  previousTimePeriod: PropTypes.func,
  nextTimePeriod: PropTypes.func,
  changeTimePeriod: PropTypes.func
}

export default Chart
