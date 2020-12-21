import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import Add from '../../Icons/Add/Add'

const AddButton = props => {
  let fill = 'black'

  if (props.color === 'primary') {
    fill = '#05F29B'
  } else if (props.color === 'neutral') {
    fill = '#65C8FF'
  } else if (props.color === 'danger') {
    fill = '#FF6565'
  }

  return (
    <Button color={props.color} size='square' clicked={props.clicked}>
      <Add fill={fill} />
    </Button>
  )
}

AddButton.propTypes = {
  color: PropTypes.string,
  clicked: PropTypes.func
}

export default AddButton
