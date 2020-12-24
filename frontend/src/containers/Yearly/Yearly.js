import React from 'react'
import classes from './Yearly.module.css'
import GraphSummary from '../../components/GraphSummary/GraphSummary'
import Breakdown from '../../components/Breakdown/Breakdown'
import Navbar from '../../components/Navbar/Navbar'

const Yearly = props => {
  const income = [
    {
      name: 'Web Design',
      amount: 10084.92
    },
    {
      name: 'Video Team',
      amount: 3000.00
    },
    {
      name: 'Curriculum',
      amount: 3000.00
    }
  ]

  const expenses = [
    {
      name: 'Groceries',
      amount: 1500.84
    },
    {
      name: 'Gas',
      amount: 400.00
    },
    {
      name: 'Eating Out',
      amount: 300.49
    },
    {
      name: 'Misc',
      amount: 2000.00
    }
  ]

  return (
    <div className={classes.Yearly}>
      <div className={classes.Main}>
        <GraphSummary showYearly />
        <div className={classes.Summaries}>
          <Breakdown
            content={income}
            color='primary'
            height='49%'
            width='100%' />
          <Breakdown
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
