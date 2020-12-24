import React from 'react'
import PropTypes from 'prop-types'

const BreakdownSummaryHeading = props => (
  <h1 className={props.color}>
    {props.children ? props.children : 'Types'}
  </h1>
)

BreakdownSummaryHeading.propTypes = {
  color: PropTypes.string,
  children: PropTypes.string
}

export default BreakdownSummaryHeading
