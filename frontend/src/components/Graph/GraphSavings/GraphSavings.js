import React from 'react'
import PropTypes from 'prop-types'
import GraphSummary from '../GraphSummary/GraphSummary'

const GraphSavings = props => (
  <GraphSummary
    onNavSavingsChange={props.onChange}
    active={props.active}
    isSavings />
)

GraphSavings.propTypes = {
  onChange: PropTypes.func,
  active: PropTypes.string
}

export default GraphSavings
