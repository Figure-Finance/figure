import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import PropTypes from 'prop-types'
import classes from './BreakdownAddSavingsModal.module.css'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'

const BreakdownAddSavingsModal = ({ title, onClose, onAdd, color }) => {
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
    },
    amount: {
      type: 'input',
      config: {
        type: 'number',
        label: 'Amount'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    description: {
      type: 'input',
      config: {
        type: 'text',
        label: 'Description'
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
  const mutateAdd = useMutation(newItem => onAdd(newItem), {
    onSuccess: data => queryClient.invalidateQueries()
  })

  const addItemHandler = () => {
    onClose()
    mutateAdd.mutate({
      name: formElements.type.value,
      amount: formElements.amount.value,
      description: formElements.description.value
    })
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
          size='large'
          color={color}
          onClick={onClose}>
          Cancel
        </Button>
        <Button
          color={color}
          size='large'
          onClick={addItemHandler}
          disabled={!formIsValid}>
          Add
        </Button>
      </div>
    </div>
  )
}

BreakdownAddSavingsModal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  onAdd: PropTypes.func,
  color: PropTypes.string
}

export default BreakdownAddSavingsModal
