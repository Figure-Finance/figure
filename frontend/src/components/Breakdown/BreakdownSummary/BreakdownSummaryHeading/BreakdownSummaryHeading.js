import React from 'react'
import PropTypes from 'prop-types'

const BreakdownSummaryHeading = ({ color, children }) => (
  <h1 className={color}>
    {children}
  </h1>
)

BreakdownSummaryHeading.propTypes = {
  color: PropTypes.string,
  children: PropTypes.string
}

export default BreakdownSummaryHeading
