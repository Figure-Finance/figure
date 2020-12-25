import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import RightArrow from '../../Icons/RightArrow/RightArrow'

const RightArrowButton = props => {
  return (
    <Button color={props.color} size='square' onClick={props.onClick}>
      <RightArrow fill={props.color} />
    </Button>
  )
}

RightArrowButton.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func
}

export default RightArrowButton
