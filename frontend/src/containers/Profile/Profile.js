import React from 'react'
import classes from './Profile.module.css'
import ProfileSummary from '../../components/ProfileSummary/ProfileSummary'
import Summary from '../../components/Summary/Summary'
import Navbar from '../../components/Navbar/Navbar'
import Logo from '../../components/Logo/Logo'

const Profile = props => {
  const income = [
    {
      type: 'Web Design',
      amount: 84.92
    },
    {
      type: 'Video Team',
      amount: 50.00
    },
    {
      type: 'Curriculum',
      amount: 50.00
    }
  ]

  const expenses = [
    {
      type: 'Groceries',
      amount: 35.84
    },
    {
      type: 'Gas',
      amount: 40.00
    },
    {
      type: 'Eating Out',
      amount: 18.49
    },
    {
      type: 'Misc',
      amount: 20.00
    }
  ]

  return (
    <div className={classes.Profile}>
      <div className={classes.Main}>
        <div className={classes.Column}>
          <ProfileSummary height='50%' width='100%' />
          <Logo />
        </div>
        <Summary
          content={income}
          color='primary'
          canAdd />
        <Summary
          content={expenses}
          color='danger'
          canAdd />
      </div>
      <Navbar active='p' />
    </div>
  )
}

export default Profile
