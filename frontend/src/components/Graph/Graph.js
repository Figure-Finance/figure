import React from 'react'
import PropTypes from 'prop-types'
import Container from '../UI/Container/Container'
import GraphYearly from './GraphYearly/GraphYearly'
import GraphSavings from './GraphSavings/GraphSavings'

const Graph = props => {
  let content = (
    <GraphYearly timePeriods={props.timePeriods} />
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
  timePeriods: PropTypes.arrayOf(PropTypes.string)
}

export default Graph
