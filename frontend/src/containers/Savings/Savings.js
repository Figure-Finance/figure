import React from 'react'
import classes from './Savings.module.css'
import GraphSummary from '../../components/GraphSummary/GraphSummary'
import ProgressSummary from '../../components/ProgressSummary/ProgressSummary'
import Summary from '../../components/Summary/Summary'
import Navbar from '../../components/Navbar/Navbar'

const Savings = props => {
  return (
    <div className={classes.Savings}>
      <ProgressSummary left='neutral' />
      <div className={classes.Main}>
        <GraphSummary />
        <Summary color='neutral' title='Goals' />
      </div>
      <Navbar active='s' />
    </div>
  )
}

export default Savings
