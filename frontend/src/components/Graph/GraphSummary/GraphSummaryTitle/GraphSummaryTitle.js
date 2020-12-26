import React from 'react'
import PropTypes from 'prop-types'
import classes from './GraphSummaryTitle.module.css'
import Button from '../../../UI/Button/Button'
import LeftArrowButton from '../../../UI/LeftArrowButton/LeftArrowButton'
import RightArrowButton from '../../../UI/RightArrowButton/RightArrowButton'

const GraphSummaryTitle = props => {
  return (
    <div className={classes.Buttons}>
      <LeftArrowButton color='danger' onClick={props.decrementNumber} />
      <Button
        onClick={props.openModal}
        color='danger'
        size='large'
        width='300px'>
        {props.buttonContent}
      </Button>
      <RightArrowButton color='danger' onClick={props.incrementNumber} />
    </div>
  )
}

GraphSummaryTitle.propTypes = {
  openModal: PropTypes.func,
  buttonContent: PropTypes.string,
  decrementNumber: PropTypes.func,
  incrementNumber: PropTypes.func
}

export default GraphSummaryTitle
