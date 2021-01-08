import React from 'react'
import classes from './Logo.module.css'
import { ReactComponent as LogoIcon } from '../../assets/logo.svg'

const Logo = () => (
  <LogoIcon className={classes.Logo} />
)

export default Logo
