import React from 'react'
import classes from './Auth.module.css'
import Container from '../../components/UI/Container/Container'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Logo from '../../components/Logo/Logo'

const Auth = props => {
  return (
    <div className={classes.Auth}>
      <Container height='98%' width='50%'>
        <div className={classes.Main}>
          <Input placeholder='Email' />
          <Input placeholder='Password' />
          <Button color='primary' size='large'>
            Sign Up
          </Button>
        </div>
      </Container>
      <div>
        <Logo className={classes.Logo} />
      </div>
    </div>
  )
}

export default Auth
