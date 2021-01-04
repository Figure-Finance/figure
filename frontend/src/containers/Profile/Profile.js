import React from 'react'
import classes from './Profile.module.css'
import ProfileSummary from '../../components/ProfileSummary/ProfileSummary'
import Type from '../../components/Type/Type'
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
          <ProfileSummary height='50%' />
          <Logo />
        </div>
        <Type
          content={income}
          color='primary' />
        <Type
          content={expenses}
          color='danger' />
      </div>
      <Navbar active='p' />
    </div>
  )
}

export default Profile
