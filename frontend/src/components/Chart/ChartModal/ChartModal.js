import React from 'react'
import PropTypes from 'prop-types'
import classes from './ChartModal.module.css'
import Button from '../../UI/Button/Button'

const ChartModal = props => {
  const content = (
    props.selection.map((item, index) => (
      <Button
        key={index}
        size='large'
        color='default'
        onClick={props.onClick}>
        {item}
      </Button>
    ))
  )

  return (
    <div className={classes.ChartModal}>
      <div className={classes.Buttons}>
        {content}
      </div>
    </div>
  )
}

ChartModal.propTypes = {
  onClick: PropTypes.func,
  selection: PropTypes.array
}

export default ChartModal
