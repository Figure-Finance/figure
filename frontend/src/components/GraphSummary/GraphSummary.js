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

  if (props.year) {
    title = (
      <div className={classes.Buttons}>
        <Button color='primary' size='square' clicked={decrementNumber}>
          <LeftArrowButton />
        </Button>
        <Button
          color='primary'
          size='large'
          width='300px'>
          {number}
        </Button>
        <Button color='primary' size='square' clicked={incrementNumber}>
          <RightArrowButton />
        </Button>
      </div>
    )
  }

  return (
    <Container height='100%' width='66%'>
      {title}
      <Graph />
    </Container>
  )
}

GraphSummary.propTypes = {
  year: PropTypes.boolean
}

export default GraphSummary
