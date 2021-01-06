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
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

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
      const { firstName, lastName, email } = res.data
      setFirstName(firstName)
      setLastName(lastName)
      setEmail(email)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const onAddIncomeType = useCallback(async (type, cb) => {
    try {
      const isIncome = true
      const res = await api.patch('user/category', {
        category: type,
        isIncome
      })
      const id = res.data.id
      const newIncome = { id, category: type, isIncome }
      const updatedIncome = [...income, newIncome]
      setIncome(updatedIncome)
      cb(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [income])

  const onAddExpenseType = useCallback(async (type, cb) => {
    try {
      const isIncome = false
      const res = await api.patch('user/category', {
        category: type,
        isIncome
      })
      const id = res.data.id
      const newExpense = { id, category: type, isIncome }
      const updatedExpenses = [...expenses, newExpense]
      setExpenses(updatedExpenses)
      cb(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [expenses])

  const onDeleteIncomeType = useCallback(async (id, cb) => {
    try {
      const res = await api.delete(`user/category/${id}`)
      const updatedIncome = income.filter(i => i.id !== id)
      setIncome(updatedIncome)
      cb(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [income])

  const onDeleteExpenseType = useCallback(async (id, cb) => {
    try {
      const res = await api.delete(`user/category/${id}`)
      const updatedExpenses = expenses.filter(e => e.id !== id)
      setExpenses(updatedExpenses)
      cb(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [expenses])

  useEffect(onFetchProfile, [onFetchProfile])

  // console.log(firstName)

  return (
    <div className={classes.Profile}>
      <div className={classes.Main}>
        <div className={classes.Column}>
          <ProfileSummary
            firstName={firstName}
            lastName={lastName}
            email={email} />
          <Logo />
        </div>
        <Type
          content={income}
          color='primary'
          addType={onAddIncomeType}
          deleteType={onDeleteIncomeType} />
        <Type
          content={expenses}
          color='danger'
          addType={onAddExpenseType}
          deleteType={onDeleteExpenseType} />
      </div>
      <Navbar active='p' />
    </div>
  )
}

export default Profile
