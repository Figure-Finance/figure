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
        color='primary'
        clicked={props.clicked}
        width='100%'>
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
  clicked: PropTypes.func,
  selection: PropTypes.array
}

export default ChartModal
