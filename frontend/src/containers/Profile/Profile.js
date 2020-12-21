import React from 'react'
import classes from './Profile.module.css'
import ProfileSummary from '../../components/ProfileSummary/ProfileSummary'
import Summary from '../../components/Summary/Summary'
import Navbar from '../../components/Navbar/Navbar'

const Profile = props => {
  return (
    <div className={classes.Profile}>
      <div className={classes.Main}>
        <ProfileSummary height='50%' />
        <Summary color='primary' canAdd />
        <Summary color='danger' canAdd />
      </div>
      <Navbar active='p' />
    </div>
  )
}

export default Profile
