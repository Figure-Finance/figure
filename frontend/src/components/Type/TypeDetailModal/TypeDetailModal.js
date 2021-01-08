import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import PropTypes from 'prop-types'
import classes from './TypeDetailModal.module.css'
import Button from '../../UI/Button/Button'

const TypeDetailModal = ({ type, color, onDelete, onClose }) => {
  const queryClient = useQueryClient()
  const mutateDelete = useMutation(() => onDelete(type.id), {
    onSuccess: data => queryClient.invalidateQueries()
  })

  const deleteItemHandler = () => {
    onClose()
    mutateDelete.mutate()
  }

  return (
    <div className={classes.TypeDetailModal}>
      <h1 className={color}>
        {type.category}
      </h1>
      <div className={classes.Buttons}>
        <Button
          size='medium'
          color={color}
          width='100%'
          onClick={onClose}>
          Close
        </Button>
        <Button
          size='medium'
          color={color}
          width='100%'
          onClick={deleteItemHandler}>
          Delete
        </Button>
      </div>
    </div>
  )
}

TypeDetailModal.propTypes = {
  type: PropTypes.object,
  color: PropTypes.string,
  onDelete: PropTypes.func,
  onClose: PropTypes.func
}

export default TypeDetailModal
