import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './TypeAddModal.module.css'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'

const TypeAddModal = props => {
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
    }
  })

  const addItemHandler = () => {
    props.onSubmit(formElements.name.value, res => {
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
          onClick={props.closeModal}
          width='48%'>
          Cancel
        </Button>
        <Button
          color={props.color}
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
  name: PropTypes.string,
  closeModal: PropTypes.func,
  onSubmit: PropTypes.func
}

export default TypeAddModal
