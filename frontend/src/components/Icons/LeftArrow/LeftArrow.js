import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as Left } from '../../../assets/left.svg'

const LeftArrow = props => (
  <Left style={{ width: '30px', fill: props.fill, marginTop: '6px', marginRight: '6px' }} />
)

LeftArrow.propTypes = {
  fill: PropTypes.string
}

export default LeftArrow
