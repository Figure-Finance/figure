import React from 'react'
import classes from './Monthly.module.css'
import Progress from '../../components/Progress/Progress'
import Breakdown from '../../components/Breakdown/Breakdown'
import Chart from '../../components/Chart/Chart'
import Navbar from '../../components/Navbar/Navbar'

const Monthly = props => {
  const income = [
    {
      name: 'Web Design',
      amount: 484.92
    },
    {
      name: 'Video Team',
      amount: 200.00
    },
    {
      name: 'Curriculum',
      amount: 200.00
    }
  ]

  const expenses = [
    {
      name: 'Groceries',
      amount: 235.84
    },
    {
      name: 'Gas',
      amount: 140.00
    },
    {
      name: 'Eating Out',
      amount: 128.49
    },
    {
      name: 'Misc',
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
      <Progress
        leftColor='primary'
        leftAmount={totalIncome}
        rightColor='danger'
        rightAmount={totalExpenses} />
      <div className={classes.Main}>
        <Breakdown
          title='Income'
          content={income}
          color='primary' />
        <Chart title='Month' data={expenses} />
        <Breakdown
          title='Expenses'
          content={expenses}
          color='danger' />
      </div>
      <Navbar active='m' />
    </div>
  )
}

export default Monthly
