import React, { useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import classes from './BreakdownDetailSavingsModal.module.css'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'

const BreakdownDetailSavingsModal = props => {
  const [formIsValid, setFormIsValid] = useState(true)
  const [formElements, setFormElements] = useState({
    name: {
      type: 'input',
      config: {
        type: 'text',
        label: 'Type'
      },
      value: props.name,
      validation: {
        required: true
      },
      valid: true,
      touched: false
    },
    amount: {
      type: 'input',
      config: {
        type: 'number',
        label: 'Amount',
        min: '0',
        step: '0.01'
      },
      value: props.amount,
      validation: {
        required: true
      },
      valid: true,
      touched: false
    },
    description: {
      type: 'input',
      config: {
        type: 'text',
        label: 'Description'
      },
      value: props.description,
      validation: {
        required: true
      },
      valid: true,
      touched: false
    }
  })

  const updateHandler = () => {
    props.onSubmit({
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

  const formElementsArray = useMemo(() => [], [])

  const updateFormElementsArray = useCallback(() => {
    formElementsArray.length = 0
    for (const key in formElements) {
      formElementsArray.push({
        id: key,
        config: formElements[key]
      })
    }
  }, [formElements, formElementsArray])

  useEffect(updateFormElementsArray, [updateFormElementsArray])

  return (
    <div className={classes.BreakdownDetailSavingsModal}>
      <Button
        size='medium'
        color={props.color}
        width='100%'
        onClick={() => props.onAllocate('10')}>
        Allocate
      </Button>
      <div className={classes.Inputs}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            color={props.color}
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
            onChange={event => inputChangedHandler(event, formElement.id)} />
        ))}
      </div>
      <div className={classes.Buttons}>
        <Button
          size='medium'
          color={props.color}
          width='48%'
          onClick={props.onDelete}>
          Delete
        </Button>
        <Button
          size='medium'
          color={props.color}
          width='48%'
          onClick={updateHandler}
          disabled={!formIsValid}>
          Update
        </Button>
      </div>
    </div>
  )
}

BreakdownDetailSavingsModal.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  amount: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  location: PropTypes.string,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  onAllocate: PropTypes.func
}

export default BreakdownDetailSavingsModal
