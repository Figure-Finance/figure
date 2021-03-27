import React from 'react'
import PropTypes from 'prop-types'
import GraphSummary from '../GraphSummary/GraphSummary'

const GraphSavings = ({ onChange, active, labels }) => (
  <GraphSummary
    onNavSavingsChange={onChange}
    active={active}
    labels={labels}
    isSavings
  />
)

GraphSavings.propTypes = {
  onChange: PropTypes.func,
  active: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.string),
}

export default GraphSavings
