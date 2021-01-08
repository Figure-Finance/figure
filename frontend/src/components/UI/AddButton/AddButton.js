import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import Add from '../../Icons/Add/Add'

const AddButton = ({ color, onClick, size, width, disabled }) => {
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
      width={width}
      color={color}
      size={size || 'square'}
      onClick={onClick}
      disabled={disabled}>
      <Add fill={fill} />
    </Button>
  )
}

AddButton.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
  width: PropTypes.string,
  disabled: PropTypes.bool
}

export default AddButton
