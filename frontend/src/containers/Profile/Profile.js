import React from 'react'
import classes from './Profile.module.css'
import Summary from '../../components/Summary/Summary'
import Navbar from '../../components/Navbar/Navbar'

const Profile = props => {
  return (
    <div className={classes.Profile}>
      <div className={classes.Main}>
        <Summary color='primary' />
        <Summary color='primary' />
        <Summary color='danger' />
      </div>
      <Navbar active='p' />
    </div>
  )
}

export default Profile
