import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as Right } from '../../../assets/right.svg'

const RightArrow = ({ fill }) => {
  let fillHex

  if (fill === 'primary') {
    fillHex = '#05F29B'
  } else if (fill === 'neutral') {
    fillHex = '#65C8FF'
  } else if (fill === 'danger') {
    fillHex = '#FF6565'
  } else {
    fillHex = '#CF79F7'
  }

  return (
    <Right style={{ width: '30px', fill: fillHex, marginTop: '6px' }} />
  )
}

RightArrow.propTypes = {
  fill: PropTypes.string
}

export default RightArrow
