import React from 'react'
import PropTypes from 'prop-types'
import classes from './Home.module.css'
import Logo from '../../components/Logo/Logo'
import Button from '../../components/UI/Button/Button'

const Home = ({ history }) => {
  return (
    <div className={classes.Home}>
      <div className={classes.HeadBar}>
        <div className={classes.Brand}>
          <Logo height={64} />
          <div className={classes.BrandName}>
            <h2 className="primary">Figure</h2>
            <h2 className="primary">Finance</h2>
          </div>
        </div>
        <div className={classes.Auth}>
          <Button color="primary" size="small" type="sumbit">
            Sign In
          </Button>
          <Button color="primary" size="small" type="sumbit">
            Sign Up
          </Button>
        </div>
      </div>
      <div className={classes.Main}>
        <div className={`${classes.Title} primary`}>Figure</div>
        <h1 className="primary">
          The new way to <em>refigure</em> your life
        </h1>
        <h2 className="primary">Take your finances to a new level</h2>
      </div>
    </div>
  )
}

Home.propTypes = {
  history: PropTypes.object,
}

export default Home
