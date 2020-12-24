import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './SummaryDetailModal.module.css'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'

const SummaryDetailModal = props => {
  const [formIsValid, setFormIsValid] = useState(false)
  const [formElements, setFormElements] = useState({
    name: {
      type: 'input',
      config: {
        type: 'text',
        placeholder: 'Name'
      },
      value: props.name,
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    amount: {
      type: 'input',
      config: {
        type: 'number',
        placeholder: 'Amount'
      },
      value: props.amount,
      validation: {
        required: true,
        minLength: 8
      },
      valid: false,
      touched: false
    },
    description: {
      type: 'textarea',
      config: {
        placeholder: 'Description'
      },
      value: props.description,
      validation: {
        required: true,
        minLength: 8
      },
      valid: false,
      touched: false
    }
  })

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
    <div className={classes.SummaryDetailModal}>
      <Button size='thin' color='neutral' clicked={props.onCancel}>
        X
      </Button>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          type={formElement.config.type}
          config={formElement.config.config}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id)} />
      ))}
      <Button
        size='thin'
        color='neutral'
        clicked={props.onSuccess}
        disabled={!formIsValid}>
        Update
      </Button>
      <Button
        size='thin'
        color='neutral'
        clicked={props.onDelete}>
        Delete
      </Button>
    </div>
  )
}

SummaryDetailModal.propTypes = {
  name: PropTypes.string,
  amount: PropTypes.string,
  description: PropTypes.string,
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
  onDelete: PropTypes.func
}

export default SummaryDetailModal
