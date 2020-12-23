import React, { useEffect } from 'react'
import api from '../../api'
import classes from './Weekly.module.css'
import ProgressSummary from '../../components/ProgressSummary/ProgressSummary'
import Summary from '../../components/Summary/Summary'
import ChartSummary from '../../components/ChartSummary/ChartSummary'
import Navbar from '../../components/Navbar/Navbar'

const Weekly = props => {
  useEffect(() => {
    api.get('dash-weekly').then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const income = [
    {
      name: 'Web Design',
      amount: 84.92
    },
    {
      name: 'Video Team',
      amount: 50.00
    },
    {
      name: 'Curriculum',
      amount: 50.00
    }
  ]

  const expenses = [
    {
      name: 'Groceries',
      amount: 35.84
    },
    {
      name: 'Gas',
      amount: 40.00
    },
    {
      name: 'Eating Out',
      amount: 18.49
    },
    {
      name: 'Misc',
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
          canAdd
          isIncome />
        <ChartSummary title='Week' data={expenses} />
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
