import React from 'react'
import classes from './Profile.module.css'
import ProfileSummary from '../../components/ProfileSummary/ProfileSummary'
import Breakdown from '../../components/Breakdown/Breakdown'
import Navbar from '../../components/Navbar/Navbar'
import Logo from '../../components/Logo/Logo'

const Profile = props => {
  const income = [
    'Web Design',
    'Video Team',
    'Curriculum'
  ]

  const expenses = [
    'Groceries',
    'Gas',
    'Eating Out',
    'Misc'
  ]

  return (
    <div className={classes.Profile}>
      <div className={classes.Main}>
        <div className={classes.Column}>
          <ProfileSummary height='50%' width='100%' />
          <Logo />
        </div>
        <Breakdown
          content={income}
          color='primary'
          canAdd />
        <Breakdown
          content={expenses}
          color='danger'
          canAdd />
      </div>
      <Navbar active='p' />
    </div>
  )
}

export default Profile
