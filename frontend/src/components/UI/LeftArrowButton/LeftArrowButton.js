import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import LeftArrow from '../../Icons/LeftArrow/LeftArrow'

const LeftArrowButton = ({ color, onClick }) => {
  return (
    <Button color={color} size="square" onClick={onClick}>
      <LeftArrow fill={color} />
    </Button>
  )
}

LeftArrowButton.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default LeftArrowButton
