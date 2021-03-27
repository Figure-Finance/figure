import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as Left } from '../../../assets/left.svg'

const LeftArrow = ({ fill }) => {
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
    <Left
      style={{
        width: '30px',
        fill: fillHex,
        marginTop: '6px',
        marginRight: '6px',
      }}
    />
  )
}

LeftArrow.propTypes = {
  fill: PropTypes.string,
}

export default LeftArrow
