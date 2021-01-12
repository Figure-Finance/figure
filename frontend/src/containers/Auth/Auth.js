import React, { useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../api'
import classes from './Auth.module.css'
import Container from '../../components/UI/Container/Container'
import SignInForm from '../../components/SignInForm/SignInForm'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import Logo from '../../components/Logo/Logo'

const Auth = ({ history }) => {
  const [isSignUp, setIsSignUp] = useState(true)

  const onUserSignUp = async signUpData => {
    try {
      const res = await api.post('user/signup', signUpData)
      console.log(res.data)
      localStorage.setItem('token', res.data.token)
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  const onUserSignIn = async signInData => {
    try {
      const res = await api.post('user/signin', signInData)
      localStorage.setItem('token', res.data.token)
      history.push('/')
    } catch (err) {
      if (err.response && err.response.status && err.response.status === 401) {
        console.log('Wrong Password')
      }
    }
  }

  return (
    <div className={classes.Auth}>
      <Container height='98%' width='50%'>
        <div className={classes.Main}>
          {isSignUp
            ? <SignUpForm
              onSubmit={onUserSignUp}
              changeForm={() => setIsSignUp(false)} />
            : <SignInForm
              onSubmit={onUserSignIn}
              changeForm={() => setIsSignUp(true)} />
          }
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
