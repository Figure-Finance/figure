import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Container from '../UI/Container/Container'
import ChartSummary from './ChartSummary/ChartSummary'
import ChartModal from './ChartModal/ChartModal'

const Chart = props => {
  const [showModal, setShowModal] = useState(false)
  const [
    currentTimePeriodIndex,
    setCurrentTimePeriodIndex
  ] = useState(props.timePeriods.length - 1)

  // const months = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December'
  // ]

  const openModalHandler = () => {
    setShowModal(true)
  }

  const changeSelection = event => {
    const index = props.timePeriods.findIndex(el => el === event.target.innerHTML)
    setCurrentTimePeriodIndex(index)
    setShowModal(false)
  }

  const previousTimePeriod = () => {
    if (currentTimePeriodIndex > 0) {
      setCurrentTimePeriodIndex(currentTimePeriodIndex - 1)
    }
  }

  const nextTimePeriod = () => {
    if (currentTimePeriodIndex < props.timePeriods.length - 1) {
      setCurrentTimePeriodIndex(currentTimePeriodIndex + 1)
    }
  }

  const names = props.data.map(item => item.name)
  const amounts = props.data.map(item => item.amount)

  const currentTimePeriod = props.timePeriods[currentTimePeriodIndex].toString()

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
        timePeriods={props.timePeriods}
        onClick={changeSelection} />
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Chart
