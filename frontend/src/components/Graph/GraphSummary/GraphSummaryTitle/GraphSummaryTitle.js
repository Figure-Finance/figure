import React from 'react'
import PropTypes from 'prop-types'
import classes from './GraphSummaryTitle.module.css'
import Button from '../../../UI/Button/Button'
import LeftArrowButton from '../../../UI/LeftArrowButton/LeftArrowButton'
import RightArrowButton from '../../../UI/RightArrowButton/RightArrowButton'

const GraphSummaryTitle = ({
  openModal,
  buttonContent,
  decrementNumber,
  incrementNumber
}) => {
  return (
    <div className={classes.Buttons}>
      <LeftArrowButton color='danger' onClick={decrementNumber} />
      <Button
        onClick={openModal}
        color='danger'
        size='large'
        width='300px'>
        {buttonContent}
      </Button>
      <RightArrowButton color='danger' onClick={incrementNumber} />
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
