import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import RightArrow from '../../Icons/RightArrow/RightArrow'

const RightArrowButton = ({ color, onClick }) => {
  return (
    <Button color={color} size="square" onClick={onClick}>
      <RightArrow fill={color} />
    </Button>
  )
}

RightArrowButton.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default RightArrowButton
