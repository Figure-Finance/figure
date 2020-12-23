import React from 'react'
import PropTypes from 'prop-types'

const SummaryHeading = props => (
  <h1 className={props.color}>
    {props.children ? props.children : 'Types'}
  </h1>
)

SummaryHeading.propTypes = {
  color: PropTypes.string,
  children: PropTypes.string
}

export default SummaryHeading
