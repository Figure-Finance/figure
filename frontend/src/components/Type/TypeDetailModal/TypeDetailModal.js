import React from 'react'
import PropTypes from 'prop-types'
import classes from './TypeDetailModal.module.css'
import Button from '../../UI/Button/Button'

const TypeDetailModal = props => {
  return (
    <div className={classes.TypeDetailModal}>
      <h2>{props.type}</h2>
      <div className={classes.Buttons}>
        <Button
          size='medium'
          color={props.color}
          width='100%'
          onClick={props.closeModal}>
          Close
        </Button>
        <Button
          size='medium'
          color={props.color}
          width='100%'
          onClick={props.onDelete}>
          Delete
        </Button>
      </div>
    </div>
  )
}

TypeDetailModal.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  onDelete: PropTypes.func,
  closeModal: PropTypes.func
}

export default TypeDetailModal
