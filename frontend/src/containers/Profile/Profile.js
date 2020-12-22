import React from 'react'
import classes from './Profile.module.css'
import ProfileSummary from '../../components/ProfileSummary/ProfileSummary'
import Summary from '../../components/Summary/Summary'
import Navbar from '../../components/Navbar/Navbar'
import Logo from '../../components/Logo/Logo'

const Profile = props => {
  return (
    <div className={classes.Profile}>
      <div className={classes.Main}>
        <div className={classes.Column}>
          <ProfileSummary height='50%' width='100%' />
          <Logo />
        </div>
        <Summary color='primary' canAdd />
        <Summary color='danger' canAdd />
      </div>
      <Navbar active='p' />
    </div>
  )
}

export default Profile
