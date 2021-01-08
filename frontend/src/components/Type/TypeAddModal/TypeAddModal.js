import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import PropTypes from 'prop-types'
import classes from './TypeAddModal.module.css'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'

const TypeAddModal = ({ color, onClose, onAdd }) => {
  const [formIsValid, setFormIsValid] = useState(false)
  const [formElements, setFormElements] = useState({
    name: {
      type: 'input',
      config: {
        type: 'text',
        label: 'Name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    }
  })

  const queryClient = useQueryClient()
  // const mutateAdd = useMutation(newType => onAdd(newType), {
  //   onSuccess: data => queryClient.setQueryData(
  //     ['profile', { id: data.id, category: formElements.name.value, isIncome: true }],
  //     data
  //   )
  // })
  // TODO: instead of invalidating the query set the query data. This allows us to save a call to the backend
  const mutateAdd = useMutation(newType => onAdd(newType), {
    onSuccess: data => queryClient.invalidateQueries()
  })

  const addItemHandler = () => {
    onClose()
    mutateAdd.mutate(formElements.name.value)
  }

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedAuthForm = {
      ...formElements
    }
    const updatedFormElement = {
      ...updatedAuthForm[inputIdentifier]
    }
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = true
    // updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true
    updatedAuthForm[inputIdentifier] = updatedFormElement

    let formIsValid = true
    for (const inputIdentifier in updatedAuthForm) {
      formIsValid = updatedAuthForm[inputIdentifier].valid && formIsValid
    }
    setFormElements(updatedAuthForm)
    setFormIsValid(formIsValid)
  }

  const formElementsArray = []
  for (const key in formElements) {
    formElementsArray.push({
      id: key,
      config: formElements[key]
    })
  }

  return (
    <div className={classes.BreakdownAddModal}>
      <div className={classes.Inputs}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            color={color}
            type={formElement.config.type}
            config={formElement.config.config}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            onChange={event => inputChangedHandler(event, formElement.id)} />
        ))}
      </div>
      <div className={classes.Buttons}>
        <Button
          size='medium'
          color={color}
          onClick={onClose}
          width='48%'>
          Cancel
        </Button>
        <Button
          color={color}
          size='medium'
          onClick={addItemHandler}
          disabled={!formIsValid}
          width='48%'>
          Add
        </Button>
      </div>
    </div>
  )
}

TypeAddModal.propTypes = {
  color: PropTypes.string,
  onClose: PropTypes.func,
  onAdd: PropTypes.func
}

export default TypeAddModal
