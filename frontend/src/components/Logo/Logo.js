import React from 'react'
import classes from './Logo.module.css'
// import { ReactComponent as LogoIcon } from '../../assets/logo.svg'
import LogoIcon from '../../assets/logo.png'

const Logo = () => (
  // <LogoIcon className={classes.Logo} />
  <div classes={classes.Logo}>
    <img
      height='400'
      src={LogoIcon}
      alt='Figure logo'
      style={{
        display: 'block',
        margin: 'auto'
      }} />
  </div>
)

export default Logo
