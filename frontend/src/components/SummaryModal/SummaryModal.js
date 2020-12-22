import React, { useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../api'
import classes from './SummaryModal.module.css'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import AddButton from '../UI/AddButton/AddButton'

const SummaryModal = props => {
  const [type, setType] = useState('')
  const [amount, setAmount] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  let isIncome
  let heading

  if (props.color === 'primary') {
    isIncome = true
    heading = 'Add Income'
  } else {
    isIncome = false
    heading = 'Add Expense'
  }

  const sendTransaction = () => {
    api.post('dash-weekly', {
      category: type,
      amount,
      location,
      description,
      date,
      isIncome
    }).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className={classes.SummaryModal}>
      <h1 className={props.color}>
        {heading}
      </h1>
      <div className={classes.Inputs}>
        <Input
          placeholder='Type'
          color={props.color}
          value={type}
          onChange={value => setType(value)} />
        <Input
          placeholder='Amount'
          color={props.color}
          value={amount}
          onChange={value => setAmount(value)} />
        <Input
          placeholder='Company/Location'
          color={props.color}
          value={location}
          onChange={value => setLocation(value)} />
        <Input
          placeholder='Description'
          color={props.color}
          value={description}
          onChange={value => setDescription(value)} />
        <Input
          placeholder='Date'
          color={props.color}
          value={date}
          onChange={value => setDate(value)} />
      </div>
      <div className={classes.Buttons}>
        <Button
          size='large'
          color={props.color}
          clicked={props.clicked}
          width='100%'>
          X
        </Button>
        <AddButton
          color={props.color}
          size='large'
          width='100%'
          clicked={sendTransaction} />
      </div>
    </div>
  )
}

SummaryModal.propTypes = {
  clicked: PropTypes.func,
  color: PropTypes.string
}

export default SummaryModal
