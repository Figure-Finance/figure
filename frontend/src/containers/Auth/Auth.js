import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Auth.module.css'
import Container from '../../components/UI/Container/Container'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Logo from '../../components/Logo/Logo'

const Auth = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className={classes.Auth}>
      <Container height='98%' width='50%'>
        <div className={classes.Main}>
          <Input
            type='input'
            config={{
              type: 'email',
              placeholder: 'Email'
            }}
            value={email}
            onChange={value => setEmail(value)} />
          <Input
            type='input'
            config={{
              type: 'password',
              placeholder: 'Password'
            }}
            value={password}
            onChange={value => setPassword(value)} />
          <NavLink to='auth/questions' style={{ width: '100%' }}>
            <Button color='primary' size='large'>
              Sign Up
            </Button>
          </NavLink>
        </div>
      </Container>
      <div>
        <Logo className={classes.Logo} />
      </div>
    </div>
  )
}

export default Auth
