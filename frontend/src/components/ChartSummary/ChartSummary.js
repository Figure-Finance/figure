import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './ChartSummary.module.css'
import Container from '../UI/Container/Container'
import Button from '../UI/Button/Button'
import LeftArrowButton from '../UI/LeftArrowButton/LeftArrowButton'
import RightArrowButton from '../UI/RightArrowButton/RightArrowButton'
import ChartModal from './ChartModal/ChartModal'
import PieChart from './PieChart/PieChart'

const ChartSummary = props => {
  const [number, setNumber] = useState(1)
  const [showModal, setShowModal] = useState(false)
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

  let buttonContent = (
    `${props.title} ${number}`
  )

  if (props.title === 'Month') {
    buttonContent = months[number - 1]
  }

  const openModal = () => {
    setShowModal(true)
  }

  const changeSelection = event => {
    if (props.title === 'Week') {
      setNumber(number + 1)
    } else if (props.title === 'Month') {
      const index = months.findIndex(el => el === event.target.innerHTML)
      setNumber(index + 1)
      setShowModal(false)
    }
  }

  let content = (
    <div className={classes.ChartSummary}>
      <div className={classes.Buttons}>
        <LeftArrowButton clicked={decrementNumber} color='primary' />
        <Button
          color='primary'
          size='large'
          width='60%'
          clicked={openModal}>
          {buttonContent}
        </Button>
        <RightArrowButton clicked={incrementNumber} color='primary' />
      </div>
      <PieChart />
    </div>
  )

  if (showModal) {
    content = (
      <ChartModal selection={months} clicked={changeSelection} />
    )
  }

  return (
    <Container height='100%' width='33%'>
      {content}
    </Container>
  )
}

ChartSummary.propTypes = {
  title: PropTypes.string
}

export default ChartSummary
