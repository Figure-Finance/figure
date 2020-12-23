import React from 'react'
import classes from './Monthly.module.css'
import ProgressSummary from '../../components/ProgressSummary/ProgressSummary'
import Summary from '../../components/Summary/Summary'
import ChartSummary from '../../components/ChartSummary/ChartSummary'
import Navbar from '../../components/Navbar/Navbar'

const Monthly = props => {
  const income = [
    {
      type: 'Web Design',
      amount: 484.92
    },
    {
      type: 'Video Team',
      amount: 200.00
    },
    {
      type: 'Curriculum',
      amount: 200.00
    }
  ]

  const expenses = [
    {
      type: 'Groceries',
      amount: 235.84
    },
    {
      type: 'Gas',
      amount: 140.00
    },
    {
      type: 'Eating Out',
      amount: 128.49
    },
    {
      type: 'Misc',
      amount: 100.00
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
    <div className={classes.Monthly}>
      <ProgressSummary
        left='primary'
        leftAmount={totalIncome}
        right='danger'
        rightAmount={totalExpenses} />
      <div className={classes.Main}>
        <Summary content={income} color='primary' />
        <ChartSummary title='Month' />
        <Summary content={expenses} color='danger' />
      </div>
      <Navbar active='m' />
    </div>
  )
}

export default Monthly
