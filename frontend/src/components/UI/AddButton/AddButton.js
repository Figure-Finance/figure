import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import Add from '../../Icons/Add/Add'

const AddButton = ({ color, onClick, disabled }) => {
  let fill = 'black'

  if (color === 'primary') {
    fill = '#05F29B'
  } else if (color === 'neutral') {
    fill = '#65C8FF'
  } else if (color === 'danger') {
    fill = '#FF6565'
  }

  return (
    <Button
      width='100%'
      color={color}
      size='medium'
      onClick={onClick}
      disabled={disabled}>
      <Add fill={fill} />
    </Button>
  )
}

AddButton.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

export default AddButton
