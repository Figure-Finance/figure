import React from 'react'
import PropTypes from 'prop-types'
import classes from './ButtonProgressBar.module.css'
import ButtonProgress from './ButtonProgress/ButtonProgress'

const ButtonProgressBar = ({ color, percent }) => {
  return (
    <div className={classes.ButtonProgressBar}>
      <ButtonProgress
        color={color}
        percent={percent} />
    </div>
  )
}

ButtonProgressBar.propTypes = {
  color: PropTypes.string,
  percent: PropTypes.number
}

export default ButtonProgressBar
