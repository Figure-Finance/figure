import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import RightArrow from '../../Icons/RightArrow/RightArrow'

const RightArrowButton = props => {
  return (
    <Button color={props.color} size='square' clicked={props.clicked}>
      <RightArrow fill='#05F29B' />
    </Button>
  )
}

RightArrowButton.propTypes = {
  color: PropTypes.string,
  clicked: PropTypes.func
}

export default RightArrowButton
