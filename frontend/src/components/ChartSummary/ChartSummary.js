import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './ChartSummary.module.css'
import Container from '../UI/Container/Container'
import Button from '../UI/Button/Button'
import LeftArrow from '../Icons/LeftArrow/LeftArrow'
import RightArrow from '../Icons/RightArrow/RightArrow'
import PieChart from './PieChart/PieChart'

const ChartSummary = props => {
  const [number, setNumber] = useState(1)

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

  return (
    <Container height='100%' width='33%'>
      <div className={classes.ChartSummary}>
        <div className={classes.Buttons}>
          <Button color='primary' size='square' clicked={decrementNumber}>
            <LeftArrow />
          </Button>
          <Button color='primary' size='large' width='60%'>
            {props.title} {number}
          </Button>
          <Button color='primary' size='square' clicked={incrementNumber}>
            <RightArrow />
          </Button>
        </div>
        <PieChart />
      </div>
    </Container>
  )
}

ChartSummary.propTypes = {
  title: PropTypes.string
}

export default ChartSummary
