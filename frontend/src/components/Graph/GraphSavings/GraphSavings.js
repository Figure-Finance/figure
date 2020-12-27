import React from 'react'
import PropTypes from 'prop-types'
import GraphSummary from '../GraphSummary/GraphSummary'

const GraphSavings = props => (
  <GraphSummary
    onNavSavingsChange={props.onChange}
    active={props.active}
    labels={props.labels}
    isSavings />
)

GraphSavings.propTypes = {
  onChange: PropTypes.func,
  active: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.string)
}

export default GraphSavings
