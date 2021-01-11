import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import { checkInputValidity } from '../../validation'

const SignUpForm = ({ changeForm, onSubmit }) => {
  const [formIsValid, setFormIsValid] = useState(false)
  const [formElements, setFormElements] = useState({
    firstName: {
      type: 'input',
      config: {
        type: 'text',
        label: 'First Name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    lastName: {
      type: 'input',
      config: {
        type: 'text',
        label: 'Last Name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      type: 'input',
      config: {
        type: 'email',
        label: 'Email'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      type: 'input',
      config: {
        type: 'password',
        label: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 8
      },
      valid: false,
      touched: false
    }
  })

  const signUpHandler = event => {
    event.preventDefault()
    onSubmit({
      firstName: formElements.firstName.value,
      lastName: formElements.lastName.value,
      email: formElements.email.value,
      password: formElements.password.value
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
    updatedFormElement.valid = checkInputValidity(
      updatedFormElement.value, updatedFormElement.validation
    )
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
    <>
      <form onSubmit={signUpHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            color='primary'
            type={formElement.config.type}
            config={formElement.config.config}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            onChange={event => inputChangedHandler(event, formElement.id)} />
        ))}
        <Button
          onClick={signUpHandler}
          color='primary'
          size='large'
          type='submit'
          disabled={!formIsValid}>
          Sign Up
        </Button>
      </form>
      <Button
        onClick={changeForm}
        color='primary'
        size='small'>
        Change
      </Button>
    </>
  )
}

SignUpForm.propTypes = {
  changeForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default SignUpForm
