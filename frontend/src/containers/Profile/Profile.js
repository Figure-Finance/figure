import React, { useState, useEffect, useCallback } from 'react'
import api from '../../api'
import classes from './Profile.module.css'
import ProfileSummary from '../../components/ProfileSummary/ProfileSummary'
import Type from '../../components/Type/Type'
import Navbar from '../../components/Navbar/Navbar'
import Logo from '../../components/Logo/Logo'

const Profile = props => {
  const [income, setIncome] = useState([])
  const [expenses, setExpenses] = useState([])
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  // const [email, setEmail] = useState('')

  const updateIncomeExpenses = updatedItems => {
    const updatedIncome = []
    const updatedExpenses = []
    for (const item of updatedItems) {
      if (item.isIncome) {
        updatedIncome.push(item)
      } else {
        updatedExpenses.push(item)
      }
    }
    setIncome(updatedIncome)
    setExpenses(updatedExpenses)
  }

  const onFetchProfile = useCallback(async () => {
    try {
      const res = await api.get('user')
      updateIncomeExpenses(res.data.categories)
      // const { firstName, lastName, email } = res.data
      // setFirstName(firstName)
      // setLastName(lastName)
      // setEmail(email)
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(onFetchProfile, [onFetchProfile])

  return (
    <div className={classes.Profile}>
      <div className={classes.Main}>
        <div className={classes.Column}>
          <ProfileSummary />
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
