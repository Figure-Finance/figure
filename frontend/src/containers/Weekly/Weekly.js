import React, { useEffect } from 'react'
import api from '../../api'
import classes from './Weekly.module.css'
import ProgressSummary from '../../components/ProgressSummary/ProgressSummary'
import Summary from '../../components/Summary/Summary'
import ChartSummary from '../../components/ChartSummary/ChartSummary'
import Navbar from '../../components/Navbar/Navbar'

const Weekly = props => {
  useEffect(() => {
    api.get('/dash-weekly').then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

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

  let totalIncome = 0
  let totalExpenses = 0

  for (const entry of income) {
    totalIncome += entry.amount
  }

  for (const entry of expenses) {
    totalExpenses += entry.amount
  }

  return (
    <div className={classes.Weekly}>
      <ProgressSummary
        left='primary'
        leftAmount={totalIncome}
        right='danger'
        rightAmount={totalExpenses} />
      <div className={classes.Main}>
        <Summary
          content={income}
          color='primary'
          canAdd />
        <ChartSummary title='Week' />
        <Summary
          content={expenses}
          color='danger'
          canAdd />
      </div>
      <Navbar active='w' />
    </div>
  )
}

export default Weekly
