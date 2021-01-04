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
        label: 'Name'
      },
      value: props.name || '',
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
      value: props.amount || '',
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
      value: props.description || '',
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
      <Button
        size='medium'
        color={props.color}
        width='100%'
        onClick={props.onCancel}>
        Cancel
      </Button>
      <div className={classes.Inputs}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            color={props.color}
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
          color={props.color}
          width='100%'
          onClick={addItemHandler}
          disabled={!formIsValid}>
          Update
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

BreakdownDetailModal.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  amount: PropTypes.string,
  description: PropTypes.string,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func
}

export default BreakdownDetailModal
