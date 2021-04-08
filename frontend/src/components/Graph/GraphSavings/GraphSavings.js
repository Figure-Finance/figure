import React from 'react'
import PropTypes from 'prop-types'
import GraphSummary from '../GraphSummary/GraphSummary'

const GraphSavings = ({ onChange, active, labels, data }) => (
  <GraphSummary
    onNavSavingsChange={onChange}
    active={active}
    labels={labels}
    data={data}
    isSavings
  />
)

GraphSavings.propTypes = {
  onChange: PropTypes.func,
  active: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.object,
}

export default GraphSavings
