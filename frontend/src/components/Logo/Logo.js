import React from 'react'
import PropTypes from 'prop-types'
import classes from './Logo.module.css'
// import { ReactComponent as LogoIcon } from '../../assets/logo.svg'
import LogoIcon from '../../assets/logo.png'

const Logo = ({ height }) => (
  // <LogoIcon className={classes.Logo} />
  <div classes={classes.Logo}>
    <img
      height={height || 400}
      src={LogoIcon}
      alt="Figure logo"
      style={{
        display: 'block',
        margin: 'auto',
      }}
    />
  </div>
)

Logo.propTypes = {
  height: PropTypes.number,
}

export default Logo
