import React from 'react'
import PropTypes from 'prop-types'
import classes from './Container.module.css'

const Container = ({ children, height, width, borderRadius }) => {
  return (
    <div
      className={classes.Container}
      style={{
        width: width,
        height: height,
        borderRadius: borderRadius || '30px'
      }}>
      {children}
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
