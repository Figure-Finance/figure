import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import classes from './Home.module.css'
import Logo from '../../components/Logo/Logo'
import Button from '../../components/UI/Button/Button'
import Container from '../../components/UI/Container/Container'

const Home = ({ history }) => {
  return (
    <div className={classes.Home}>
      <Container width="98%" height="80px">
        <div className={classes.HeadBar}>
          <div className={classes.Brand}>
            <Logo height={64} />
            <div className={classes.BrandName}>
              <h2 className="primary">Figure</h2>
              <h2 className="primary">Finance</h2>
            </div>
          </div>
          <div className={classes.Auth}>
            <NavLink
              to={{
                pathname: '/auth',
                state: { isSignUp: false },
              }}>
              <Button color="primary" size="small" type="sumbit">
                Sign In
              </Button>
            </NavLink>
            <NavLink
              to={{
                pathname: '/auth',
                state: { isSignUp: true },
              }}>
              <Button color="primary" size="small" type="sumbit">
                Sign Up
              </Button>
            </NavLink>
          </div>
        </div>
      </Container>
      <div className={classes.Main}>
        <Container width="650px" height="430px">
          <div className={`${classes.Title} primary`}>Figure</div>
          <h1 className="primary">
            The new way to <em>refigure</em> your life
          </h1>
          <h2 className="primary">Take your finances to a new level</h2>
        </Container>
      </div>
    </div>
  )
}

Home.propTypes = {
  history: PropTypes.object,
}

export default Home
