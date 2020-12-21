import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as Right } from '../../../assets/right.svg'

const RightArrow = props => (
  <Right style={{ width: '30px', fill: props.fill, marginTop: '6px' }} />
)

RightArrow.propTypes = {
  fill: PropTypes.string
}

export default RightArrow
