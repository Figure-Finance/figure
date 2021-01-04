import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './ProgressModal.module.css'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'

const ProgressModal = props => {
  const [formIsValid, setFormIsValid] = useState(false)
  const [formElement, setFormElement] = useState({
    id: '0',
    type: 'input',
    config: {
      type: 'number',
      placeholder: 'Amount'
    },
    value: props.amount || '',
    validation: {
      required: true
    },
    valid: true,
    touched: false
  })

  const submitHandler = () => {
    props.onSubmit(+formElement.value)
  }

  const inputChangedHandler = (event) => {
    const updatedForm = {
      ...formElement
    }
    updatedForm.value = event.target.value
    updatedForm.valid = true
    updatedForm.touched = true

    setFormElement(updatedForm)
    setFormIsValid(updatedForm.valid)
  }

  return (
    <div className={classes.ProgressModal}>
      <Button
        onClick={props.closeModal}
        size='square'
        color={props.color}>
        X
      </Button>
      <div className={classes.Main}>
        <h1 className={props.color}>{props.title}</h1>
        <Input
          key={formElement.id}
          type={formElement.type}
          config={formElement.config}
          value={formElement.value}
          invalid={!formElement.valid}
          shouldValidate={formElement.validation}
          touched={formElement.touched}
          width='200px'
          onChange={event => inputChangedHandler(event)} />
      </div>
      <Button
        onClick={submitHandler}
        size='square'
        color={props.color}
        disabled={!formIsValid}>
        √
      </Button>
    </div>
  )
}

ProgressModal.propTypes = {
  closeModal: PropTypes.func,
  color: PropTypes.string,
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  amount: PropTypes.string
}

export default ProgressModal
