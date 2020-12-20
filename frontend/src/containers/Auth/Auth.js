import React from 'react'
import classes from './Auth.module.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

const Auth = props => {
  return (
    <div className={classes.Auth}>
      <div className={classes.Inset}>
        <Input placeholder='Email' />
        <Input placeholder='Password' />
        <Button color='primary' size='large'>Sign Up</Button>
      </div>
      <div />
    </div>
  )
}

export default Auth
