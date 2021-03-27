import React from 'react'
import PropTypes from 'prop-types'
import classes from './ChartModal.module.css'
import Button from '../../UI/Button/Button'

const ChartModal = ({ onClick, timePeriods }) => {
  const content = timePeriods.map((item, index) => (
    <Button key={index} size="large" color="danger" onClick={onClick}>
      {item}
    </Button>
  ))

  return (
    <div className={classes.ChartModal}>
      <div className={classes.Buttons}>{content}</div>
    </div>
  )
}

ChartModal.propTypes = {
  onClick: PropTypes.func,
  timePeriods: PropTypes.arrayOf(PropTypes.string),
}

export default ChartModal
