import React, { useEffect, useCallback } from 'react'
import { useQuery } from 'react-query'
import PropTypes from 'prop-types'
import api from '../../api'
import classes from './Profile.module.css'
import ProfileSummary from '../../components/ProfileSummary/ProfileSummary'
import Type from '../../components/Type/Type'
import Navbar from '../../components/Navbar/Navbar'
import Button from '../../components/UI/Button/Button'
import Loader from '../../components/Loader/Loader'

const Profile = ({ history }) => {
  const updateIncomeExpenses = updatedItems => {
    const income = []
    const expenses = []
    for (const item of updatedItems) {
      if (item.isIncome) {
        income.push(item)
      } else {
        expenses.push(item)
      }
    }
    return { income, expenses }
  }

  const onFetchProfile = useCallback(async () => {
    const res = await api.get('user')
    return res.data
  }, [])

  const onUpdateProfile = useCallback(async updatedUser => {
    const res = await api.patch('user', updatedUser)
    return res.data
  }, [])

  const onAddIncomeType = useCallback(async type => {
    const isIncome = true
    const res = await api.patch('user/category', {
      category: type,
      isIncome
    })
    return res.data
  }, [])

  const onAddExpenseType = useCallback(async type => {
    const isIncome = false
    const res = await api.patch('user/category', {
      category: type,
      isIncome
    })
    return res.data
  }, [])

  const onDeleteIncomeType = useCallback(async id => {
    const res = await api.delete(`user/category/${id}`)
    return res.data
  }, [])

  const onDeleteExpenseType = useCallback(async id => {
    const res = await api.delete(`user/category/${id}`)
    return res.data
  }, [])

  const onSignOut = useCallback(async () => {
    localStorage.removeItem('token')
    history.push('/auth')
  }, [history])

  useEffect(onFetchProfile, [onFetchProfile])

  const { data, isLoading, isError } = useQuery('profile', onFetchProfile, {
    retry: false
  })

  let profileSummary
  let incomeType
  let expensesType

  if (isLoading) {
    profileSummary = <Loader />
    incomeType = <Loader />
    expensesType = <Loader />
  } else if (isError) {
    profileSummary = (
      <ProfileSummary
        firstName={data.firstName}
        lastName={data.lastName}
        email={data.email}
        onUpdate={onUpdateProfile} />
    )
    incomeType = (
      <Type
        content={[]}
        color='primary'
        addType={onAddIncomeType}
        deleteType={onDeleteIncomeType} />
    )
    expensesType = (
      <Type
        content={[]}
        color='danger'
        addType={onAddExpenseType}
        deleteType={onDeleteExpenseType} />
    )
  } else {
    const { income, expenses } = updateIncomeExpenses(data.categories)
    profileSummary = (
      <ProfileSummary
        firstName={data.firstName}
        lastName={data.lastName}
        email={data.email}
        onUpdate={onUpdateProfile} />
    )
    incomeType = (
      <Type
        content={income}
        color='primary'
        addType={onAddIncomeType}
        deleteType={onDeleteIncomeType} />
    )
    expensesType = (
      <Type
        content={expenses}
        color='danger'
        addType={onAddExpenseType}
        deleteType={onDeleteExpenseType} />
    )
  }

  return (
    <div className={classes.Profile}>
      <div className={classes.Main}>
        <div className={classes.Column}>
          {profileSummary}
          <Button
            color='primary'
            size='medium'
            width='100%'
            onClick={onSignOut}>
            Sign Out
          </Button>
        </div>
        {incomeType}
        {expensesType}
      </div>
      <Navbar active='p' />
    </div>
  )
}

Profile.propTypes = {
  history: PropTypes.object
}

export default Profile
