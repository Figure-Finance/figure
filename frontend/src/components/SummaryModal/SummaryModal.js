import React from 'react'
import PropTypes from 'prop-types'
import classes from './SummaryModal.module.css'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import AddButton from '../UI/AddButton/AddButton'

const SummaryModal = props => {
  return (
    <div className={classes.SummaryModal}>
      <h1 className={props.color}>
        Add Income
      </h1>
      <div className={classes.Inputs}>
        <Input placeholder='Type' color={props.color} />
        <Input placeholder='Amount' color={props.color} />
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
          width='100%' />
      </div>
    </div>
  )
}

SummaryModal.propTypes = {
  clicked: PropTypes.func,
  color: PropTypes.string
}

export default SummaryModal
