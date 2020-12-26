import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './BreakdownAddModal.module.css'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'

const BreakdownAddModal = props => {
  const [formIsValid, setFormIsValid] = useState(false)
  const [formElements, setFormElements] = useState({
    type: {
      type: 'input',
      config: {
        type: 'text',
        placeholder: 'Type'
      },
      value: props.type || '',
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
      value: props.amount || '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    location: {
      type: 'input',
      config: {
        type: 'text',
        placeholder: 'Location'
      },
      value: props.location || '',
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
      value: props.description || '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    date: {
      type: 'input',
      config: {
        type: 'date',
        placeholder: 'Date'
      },
      value: props.date || '',
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
    }, res => {
      console.log(res.data)
      props.closeModal()
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
      <h1 className={props.color}>
        {`Add ${props.title}`}
      </h1>
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
            changed={event => inputChangedHandler(event, formElement.id)} />
        ))}
      </div>
      <div className={classes.Buttons}>
        <Button
          size='large'
          color={props.color}
          onClick={props.closeModal}>
          Cancel
        </Button>
        <Button
          color={props.color}
          size='large'
          onClick={addItemHandler}
          disabled={!formIsValid}>
          Add
        </Button>
      </div>
    </div>
  )
}

BreakdownAddModal.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  amount: PropTypes.number,
  location: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  closeModal: PropTypes.func,
  onSubmit: PropTypes.func,
  color: PropTypes.string,
  isIncome: PropTypes.bool
}

export default BreakdownAddModal
