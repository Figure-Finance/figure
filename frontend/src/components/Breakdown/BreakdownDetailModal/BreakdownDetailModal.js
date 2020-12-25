import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './BreakdownDetailModal.module.css'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'

const BreakdownDetailModal = props => {
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
        required: true
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
        required: true
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
        required: true
      },
      valid: false,
      touched: false
    }
  })

  const addItemHandler = () => {
    props.onSubmit({
      name: formElements.name.value,
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
    <div className={classes.BreakdownDetailModal}>
      <Button size='thin' color='neutral' onClick={props.onCancel}>
        X
      </Button>
      <div className={classes.Inputs}>
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
      </div>
      <div className={classes.Buttons}>
        <Button
          size='thin'
          color='neutral'
          onClick={addItemHandler}
          disabled={!formIsValid}>
          Update
        </Button>
        <Button
          size='thin'
          color='neutral'
          onClick={props.onDelete}>
          Delete
        </Button>
      </div>
    </div>
  )
}

BreakdownDetailModal.propTypes = {
  name: PropTypes.string,
  amount: PropTypes.string,
  description: PropTypes.string,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func
}

export default BreakdownDetailModal
