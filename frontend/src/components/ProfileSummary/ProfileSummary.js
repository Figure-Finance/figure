import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './ProfileSummary.module.css'
import Container from '../UI/Container/Container'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'

const ProfileSummary = ({
  height, firstName, lastName, email
}) => {
  const [formIsValid, setFormIsValid] = useState(false)
  const [formElements, setFormElements] = useState({
    firstName: {
      type: 'input',
      config: {
        type: 'text',
        label: 'First Name'
      },
      value: firstName,
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
      value: lastName,
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
      value: email,
      validation: {
        required: true
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

  // const formElementsArray = useMemo(() => [], [])
  //
  // const updateFormElementsArray = useCallback(() => {
  //   formElementsArray.length = 0
  //   for (const key in formElements) {
  //     formElementsArray.push({
  //       id: key,
  //       config: formElements[key]
  //     })
  //   }
  // }, [formElements, formElementsArray])
  //
  // useEffect(updateFormElementsArray, [updateFormElementsArray])

  const formElementsArray = []

  for (const key in formElements) {
    formElementsArray.push({
      id: key,
      config: formElements[key]
    })
  }

  return (
    <Container
      height='auto'
      width='100%'>
      <div className={classes.ProfileSummary}>
        <h1 className='primary'>Profile</h1>
        <div className={classes.Inputs}>
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
        </div>
        <Button
          size='medium'
          color='primary'
          width='100%'
          disabled={!formIsValid}>
          Update
        </Button>
      </div>
    </Container>
  )
}

ProfileSummary.propTypes = {
  height: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string
}

export default ProfileSummary
