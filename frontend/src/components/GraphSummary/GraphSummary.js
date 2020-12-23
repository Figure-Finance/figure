import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './GraphSummary.module.css'
import Graph from './Graph/Graph'
import Container from '../UI/Container/Container'
import Button from '../UI/Button/Button'
import LeftArrowButton from '../UI/LeftArrowButton/LeftArrowButton'
import RightArrowButton from '../UI/RightArrowButton/RightArrowButton'

const GraphSummary = props => {
  const [number, setNumber] = useState(2021)

  const incrementNumber = () => {
    setNumber(number + 1)
  }

  const decrementNumber = () => {
    if (number > 2020) {
      setNumber(number - 1)
    }
  }

  let title = null

  if (props.showYearly) {
    title = (
      <div className={classes.Buttons}>
        <LeftArrowButton clicked={decrementNumber} />
        <Button
          color='default'
          size='large'
          width='300px'>
          {number}
        </Button>
        <RightArrowButton clicked={incrementNumber} />
      </div>
    )
  }

  return (
    <Container height='100%' width='66%'>
      {title}
      <Graph isSavings={props.isSavings} />
    </Container>
  )
}

GraphSummary.propTypes = {
  showYearly: PropTypes.bool,
  isSavings: PropTypes.bool
}

export default GraphSummary
