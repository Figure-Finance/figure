import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Container from '../UI/Container/Container'
import ChartSummary from './ChartSummary/ChartSummary'
import ChartModal from './ChartModal/ChartModal'

const Chart = props => {
  const [number, setNumber] = useState(1)
  const [showModal, setShowModal] = useState(false)

  const weeks = []

  for (let i = 1; i <= 53; i++) {
    weeks.push(`Week ${i}`)
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const incrementNumber = () => {
    if (props.title === 'Week' && number < 53) {
      setNumber(number + 1)
    } else if (props.title === 'Month' && number < 12) {
      setNumber(number + 1)
    }
  }

  const decrementNumber = () => {
    if (number > 1) {
      setNumber(number - 1)
    }
  }

  const openModalHandler = () => {
    setShowModal(true)
  }

  const changeSelection = event => {
    if (props.title === 'Week') {
      const index = weeks.findIndex(el => el === event.target.innerHTML)
      setNumber(index + 1)
      setShowModal(false)
    } else if (props.title === 'Month') {
      const index = months.findIndex(el => el === event.target.innerHTML)
      setNumber(index + 1)
      setShowModal(false)
    }
  }

  const names = props.data.map(item => item.name)
  const amounts = props.data.map(item => item.amount)

  let buttonContent = (
    `${props.title} ${number}`
  )

  if (props.title === 'Month') {
    buttonContent = months[number - 1]
  }

  let content = (
    <ChartSummary
      buttonContent={buttonContent}
      names={names}
      amounts={amounts}
      openModal={openModalHandler}
      leftArrowClick={decrementNumber}
      rightArrowClick={incrementNumber} />
  )

  if (showModal && props.title === 'Month') {
    content = (
      <ChartModal selection={months} onClick={changeSelection} />
    )
  } else if (showModal && props.title === 'Week') {
    content = (
      <ChartModal selection={weeks} onClick={changeSelection} />
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Chart
