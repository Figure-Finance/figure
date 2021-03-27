import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as Plus } from '../../../assets/plus.svg'

const Add = ({ fill }) => (
  <Plus style={{ width: '30px', marginTop: '6px', fill: fill }} />
)

Add.propTypes = {
  fill: PropTypes.string,
}

export default Add
