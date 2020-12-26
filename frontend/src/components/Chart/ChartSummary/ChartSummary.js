import React from 'react'
import PropTypes from 'prop-types'
import classes from './ChartSummary.module.css'
import Button from '../../UI/Button/Button'
import LeftArrowButton from '../../UI/LeftArrowButton/LeftArrowButton'
import RightArrowButton from '../../UI/RightArrowButton/RightArrowButton'
import PieChart from './PieChart/PieChart'

const ChartSummary = props => (
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
    <PieChart names={props.names} amounts={props.amounts} />
  </div>
)

ChartSummary.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  leftArrowClick: PropTypes.func,
  rightArrowClick: PropTypes.func,
  names: PropTypes.arrayOf(PropTypes.string),
  amounts: PropTypes.arrayOf(PropTypes.number),
  openModal: PropTypes.func,
  buttonContent: PropTypes.string
}

export default ChartSummary
