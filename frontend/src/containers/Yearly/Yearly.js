import React from 'react'
import classes from './Yearly.module.css'
import GraphSummary from '../../components/GraphSummary/GraphSummary'
import Summary from '../../components/Summary/Summary'
import Navbar from '../../components/Navbar/Navbar'

const Yearly = props => {
  const income = [
    {
      type: 'Web Design',
      amount: 10084.92
    },
    {
      type: 'Video Team',
      amount: 3000.00
    },
    {
      type: 'Curriculum',
      amount: 3000.00
    }
  ]

  const expenses = [
    {
      type: 'Groceries',
      amount: 1500.84
    },
    {
      type: 'Gas',
      amount: 400.00
    },
    {
      type: 'Eating Out',
      amount: 300.49
    },
    {
      type: 'Misc',
      amount: 2000.00
    }
  ]

  return (
    <div className={classes.Yearly}>
      <div className={classes.Main}>
        <GraphSummary showYearly />
        <div className={classes.Summaries}>
          <Summary
            content={income}
            color='primary'
            height='49%'
            width='100%' />
          <Summary
            content={expenses}
            color='danger'
            height='49%'
            width='100%' />
        </div>
      </div>
      <Navbar active='y' />
    </div>
  )
}

export default Yearly
