import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import PropTypes from 'prop-types'
import classes from './BreakdownDetailModal.module.css'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'

const BreakdownDetailModal = ({ color, item, onUpdate, onDelete, onClose }) => {
  const [formIsValid, setFormIsValid] = useState(true)
  const [formElements, setFormElements] = useState({
    type: {
      type: 'input',
      config: {
        type: 'text',
        label: 'Type',
      },
      value: item.type,
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
    amount: {
      type: 'input',
      config: {
        type: 'number',
        label: 'Amount',
        min: '0',
        step: '0.01',
      },
      value: item.amount,
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
    location: {
      type: 'input',
      config: {
        type: 'text',
        label: 'Location',
      },
      value: item.location,
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
    description: {
      type: 'input',
      config: {
        type: 'text',
        label: 'Description',
      },
      value: item.description,
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
    date: {
      type: 'input',
      config: {
        type: 'date',
        label: 'Date',
      },
      value: item.date,
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
  })

  const queryClient = useQueryClient()
  const mutateUpdate = useMutation((newItem) => onUpdate(newItem), {
    onSuccess: (data) => queryClient.invalidateQueries(),
  })
  const mutateDelete = useMutation(() => onDelete(item.id), {
    onSuccess: (data) => queryClient.invalidateQueries(),
  })

  const updateHandler = () => {
    onClose()
    mutateUpdate.mutate({
      category: formElements.type.value,
      amount: formElements.amount.value,
      location: formElements.location.value,
      description: formElements.description.value,
      date: formElements.date.value,
    })
  }

  const deleteHandler = () => {
    onClose()
    mutateDelete.mutate()
  }

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedAuthForm = {
      ...formElements,
    }
    const updatedFormElement = {
      ...updatedAuthForm[inputIdentifier],
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

  const formElementsArray = useMemo(() => [], [])

  const updateFormElementsArray = useCallback(() => {
    formElementsArray.length = 0
    for (const key in formElements) {
      formElementsArray.push({
        id: key,
        config: formElements[key],
      })
    }
  }, [formElements, formElementsArray])

  useEffect(updateFormElementsArray, [updateFormElementsArray])

  return (
    <div className={classes.BreakdownDetailModal}>
      <div className={classes.Inputs}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            color={color}
            type={formElement.config.type}
            config={formElement.config.config}
            value={
              formElement.config.config.type === 'number'
                ? (+formElement.config.value).toFixed(2).toString()
                : formElement.config.value
            }
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            onChange={(event) => inputChangedHandler(event, formElement.id)}
          />
        ))}
      </div>
      <div className={classes.Buttons}>
        <Button size="medium" color={color} width="48%" onClick={deleteHandler}>
          Delete
        </Button>
        <Button
          size="medium"
          color={color}
          width="48%"
          onClick={updateHandler}
          disabled={!formIsValid}>
          Update
        </Button>
      </div>
    </div>
  )
}

BreakdownDetailModal.propTypes = {
  color: PropTypes.string,
  item: PropTypes.object,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onClose: PropTypes.func,
}

export default BreakdownDetailModal
