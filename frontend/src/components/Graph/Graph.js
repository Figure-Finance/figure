import React from 'react'
import PropTypes from 'prop-types'
import Container from '../UI/Container/Container'
import GraphYearly from './GraphYearly/GraphYearly'
import GraphSavings from './GraphSavings/GraphSavings'

const Graph = props => {
  let content = (
    <GraphYearly
      timePeriods={props.timePeriods}
      buttonContent={props.currentTimePeriod}
      onButtonClick={props.selectTimePeriod}
      leftArrowClick={props.previousTimePeriod}
      rightArrowClick={props.nextTimePeriod} />
  )

  if (props.isSavings) {
    content = (
      <GraphSavings
        active={props.active}
        onChange={props.onNavSavingsChange} />
    )
  }

  return (
    <Container height='100%' width='66%'>
      {content}
    </Container>
  )
}

Graph.propTypes = {
  onNavSavingsChange: PropTypes.func,
  isSavings: PropTypes.bool,
  active: PropTypes.string,
  timePeriods: PropTypes.arrayOf(PropTypes.string),
  currentTimePeriod: PropTypes.string,
  previousTimePeriod: PropTypes.func,
  nextTimePeriod: PropTypes.func,
  selectTimePeriod: PropTypes.func
}

export default Graph
