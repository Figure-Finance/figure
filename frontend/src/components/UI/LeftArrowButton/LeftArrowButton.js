import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import LeftArrow from '../../Icons/LeftArrow/LeftArrow'

const LeftArrowButton = props => {
  return (
    <Button color={props.color} size='square' clicked={props.clicked}>
      <LeftArrow fill={props.color} />
    </Button>
  )
}

LeftArrowButton.propTypes = {
  color: PropTypes.string,
  clicked: PropTypes.func
}

export default LeftArrowButton