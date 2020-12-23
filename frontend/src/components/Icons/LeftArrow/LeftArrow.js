import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as Left } from '../../../assets/left.svg'

const LeftArrow = props => {
  let fill

  if (props.fill === 'primary') {
    fill = '#05F29B'
  } else if (props.fill === 'neutral') {
    fill = '#65C8FF'
  } else if (props.fill === 'danger') {
    fill = '#FF6565'
  } else {
    fill = '#CF79F7'
  }

  return (
    <Left style={{ width: '30px', fill: fill, marginTop: '6px', marginRight: '6px' }} />
  )
}

LeftArrow.propTypes = {
  fill: PropTypes.string
}

export default LeftArrow
