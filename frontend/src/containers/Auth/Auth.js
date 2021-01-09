import React, { useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../api'
import classes from './Auth.module.css'
import Container from '../../components/UI/Container/Container'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Logo from '../../components/Logo/Logo'

const Auth = ({ history }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onUserSignUp = async () => {
    const userData = { firstName, lastName, email, password }
    const res = await api.post('user/signup', userData)
    console.log(res.data)
  }

  return (
    <div className={classes.Auth}>
      <Container height='98%' width='50%'>
        <div className={classes.Main}>
          <Input
            color='primary'
            type='input'
            config={{
              type: 'text',
              placeholder: 'First Name'
            }}
            value={firstName}
            onChange={event => setFirstName(event.target.value)} />
          <Input
            color='primary'
            type='input'
            config={{
              type: 'text',
              placeholder: 'Last Name'
            }}
            value={lastName}
            onChange={event => setLastName(event.target.value)} />
          <Input
            color='primary'
            type='input'
            config={{
              type: 'email',
              placeholder: 'Email'
            }}
            value={email}
            onChange={event => setEmail(event.target.value)} />
          <Input
            color='primary'
            type='input'
            config={{
              type: 'password',
              placeholder: 'Password'
            }}
            value={password}
            onChange={event => setPassword(event.target.value)} />
          <Button
            onClick={onUserSignUp}
            color='primary'
            size='large'>
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

Auth.propTypes = {
  history: PropTypes.object.isRequired
}

export default Auth
