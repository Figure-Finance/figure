import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './SignInForm.module.css'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import { checkInputValidity } from '../../validation'

const SignInForm = ({ changeForm, onSubmit }) => {
  const [formIsValid, setFormIsValid] = useState(false)
  const [formElements, setFormElements] = useState({
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
      validText: 'Looks good!',
      invalidText: 'Must be a valid email',
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
      validText: 'Looks good!',
      invalidText: 'Must be at least 8 characters',
      valid: false,
      touched: false
    }
  })

  const signInHandler = event => {
    event.preventDefault()
    onSubmit({
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
      <form onSubmit={signInHandler} className={classes.Form}>
        {formElementsArray.map(formElement => {
          let legend = ''
          if (!formElement.config.valid && formElement.config.touched) {
            legend = formElement.config.invalidText
          } else if (formElement.config.valid) {
            legend = formElement.config.validText
          }
          return (
            <fieldset key={formElement.id}>
              <Input
                color='primary'
                type={formElement.config.type}
                config={formElement.config.config}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                onChange={event => inputChangedHandler(event, formElement.id)} />
              <p className='danger'>
                {legend}
              </p>
            </fieldset>
          )
        })}
        <Button
          onClick={signInHandler}
          color='primary'
          size='large'
          type='sumbit'
          disabled={!formIsValid}>
          Sign In
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

SignInForm.propTypes = {
  changeForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default SignInForm
