import React from 'react'
import PropTypes from 'prop-types'
import classes from './ChartSummary.module.css'
import Button from '../../UI/Button/Button'
import LeftArrowButton from '../../UI/LeftArrowButton/LeftArrowButton'
import RightArrowButton from '../../UI/RightArrowButton/RightArrowButton'
import PieChart from './PieChart/PieChart'

const ChartSummary = props => {
  let content = (
    <PieChart names={props.names} amounts={props.amounts} />
  )

  if (props.amounts.length === 0) {
    content = (
      <h2 className='danger'>No Data</h2>
    )
  }

  return (
    <div className={classes.ChartSummary}>
      <div className={classes.Buttons}>
        <LeftArrowButton onClick={props.leftArrowClick} color='danger' />
        <Button
          size='medium'
          width='60%'
          color='danger'
          onClick={props.openModal}>
          {props.buttonContent}
        </Button>
        <RightArrowButton onClick={props.rightArrowClick} color='danger' />
      </div>
      {content}
    </div>
  )
}

ChartSummary.propTypes = {
  leftArrowClick: PropTypes.func,
  rightArrowClick: PropTypes.func,
  names: PropTypes.arrayOf(PropTypes.string),
  amounts: PropTypes.arrayOf(PropTypes.number),
  openModal: PropTypes.func,
  buttonContent: PropTypes.string
}

export default ChartSummary
