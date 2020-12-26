import React from 'react'
import PropTypes from 'prop-types'
import classes from './GraphModal.module.css'
import Button from '../../UI/Button/Button'

const GraphModal = props => {
  const content = (
    props.years.map((item, index) => (
      <Button
        key={index}
        size='large'
        color='danger'
        onClick={props.onClick}>
        {item}
      </Button>
    ))
  )

  return (
    <div className={classes.GraphModal}>
      <div className={classes.Buttons}>
        {content}
      </div>
    </div>
  )
}

GraphModal.propTypes = {
  years: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func
}

export default GraphModal
