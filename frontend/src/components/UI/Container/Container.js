import React from 'react'
import PropTypes from 'prop-types'
import classes from './Container.module.css'

const Container = props => {
  return (
    <div
      className={classes.Container}
      style={{
        width: props.width,
        height: props.height,
        borderRadius: props.borderRadius || '30px'
      }}>
      {props.children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.any,
  height: PropTypes.string,
  width: PropTypes.string,
  borderRadius: PropTypes.string
}

export default Container
