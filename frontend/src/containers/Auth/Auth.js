import React, { useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import api from '../../api'
import classes from './Auth.module.css'
import Container from '../../components/UI/Container/Container'
import SignInForm from '../../components/SignInForm/SignInForm'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import Logo from '../../components/Logo/Logo'

const Auth = ({ history }) => {
  const location = useLocation()

  const [isSignUp, setIsSignUp] = useState(
    location.state ? location.state.isSignUp : true
  )
  const [formError, setFormError] = useState('')

  const onUserSignUp = useCallback(
    async (signUpData) => {
      try {
        const res = await api.post('user/signup', signUpData)
        localStorage.setItem('token', res.data.token)
        api.defaults.headers.common.Authorization = `Bearer ${res.data.token}`
        history.push('/weekly')
      } catch (err) {
        console.log(err)
      }
    },
    [history]
  )

  const onUserSignIn = useCallback(
    async (signInData) => {
      try {
        const res = await api.post('user/signin', signInData)
        localStorage.setItem('token', res.data.token)
        api.defaults.headers.common.Authorization = `Bearer ${res.data.token}`
        history.push('/weekly')
      } catch (err) {
        console.log(err.response.status)
        if (
          err.response &&
          err.response.status &&
          err.response.status === 401
        ) {
          setFormError('Wrong Password')
        }
      }
    },
    [history]
  )

  return (
    <div className={classes.Auth}>
      <Container height="98%" width="50%">
        <div className={classes.Main}>
          {isSignUp ? (
            <SignUpForm
              onSubmit={onUserSignUp}
              changeForm={() => setIsSignUp(false)}
              error={formError}
            />
          ) : (
            <SignInForm
              onSubmit={onUserSignIn}
              changeForm={() => setIsSignUp(true)}
              error={formError}
            />
          )}
        </div>
      </Container>
      <div>
        <Logo className={classes.Logo} />
      </div>
    </div>
  )
}

Auth.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Auth
