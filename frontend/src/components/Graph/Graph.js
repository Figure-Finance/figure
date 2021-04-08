import React from 'react'
import PropTypes from 'prop-types'
import Container from '../UI/Container/Container'
import GraphYearly from './GraphYearly/GraphYearly'
import GraphSavings from './GraphSavings/GraphSavings'

const Graph = ({
  onNavSavingsChange,
  isSavings,
  active,
  timePeriods,
  currentTimePeriod,
  previousTimePeriod,
  nextTimePeriod,
  selectTimePeriod,
  labels,
  data,
}) => {
  let content = (
    <GraphYearly
      data={data}
      labels={labels}
      timePeriods={timePeriods}
      buttonContent={currentTimePeriod}
      onButtonClick={selectTimePeriod}
      leftArrowClick={previousTimePeriod}
      rightArrowClick={nextTimePeriod}
    />
  )

  if (isSavings) {
    content = (
      <GraphSavings
        active={active}
        labels={labels}
        data={data}
        onChange={onNavSavingsChange}
      />
    )
  }

  return (
    <Container height="100%" width="66%">
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
  selectTimePeriod: PropTypes.func,
  labels: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.object,
}

export default Graph
