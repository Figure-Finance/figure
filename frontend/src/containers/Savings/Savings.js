import React from 'react'
import classes from './Savings.module.css'
import GraphSummary from '../../components/GraphSummary/GraphSummary'
import ProgressSummary from '../../components/ProgressSummary/ProgressSummary'
import Summary from '../../components/Summary/Summary'
import Navbar from '../../components/Navbar/Navbar'

const Savings = props => {
  const goals = [
    {
      type: 'PS5',
      amount: 500.00
    },
    {
      type: 'M1 Macbook Pro',
      amount: 3000.00
    }
  ]

  let totalGoals = 0

  for (const entry of goals) {
    totalGoals += entry.amount
  }

  return (
    <div className={classes.Savings}>
      <ProgressSummary
        left='neutral'
        leftAmount={1000.00}
        rightAmount={totalGoals}
        single />
      <div className={classes.Main}>
        <GraphSummary isSavings />
        <Summary color='neutral' title='Goals' content={goals} canAdd />
      </div>
      <Navbar active='s' />
    </div>
  )
}

export default Savings
