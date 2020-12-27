import React from 'react'
import PropTypes from 'prop-types'
import classes from './ButtonProgressBar.module.css'
import ButtonProgress from './ButtonProgress/ButtonProgress'

const ButtonProgressBar = props => {
  return (
    <div className={classes.ButtonProgressBar}>
      <ButtonProgress
        color={props.color}
        percent={props.percent} />
    </div>
  )
}

ButtonProgressBar.propTypes = {
  color: PropTypes.string,
  percent: PropTypes.number
}

export default ButtonProgressBar
