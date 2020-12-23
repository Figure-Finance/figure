import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as Right } from '../../../assets/right.svg'

const RightArrow = props => {
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
    <Right style={{ width: '30px', fill: fill, marginTop: '6px' }} />
  )
}

RightArrow.propTypes = {
  fill: PropTypes.string
}

export default RightArrow
