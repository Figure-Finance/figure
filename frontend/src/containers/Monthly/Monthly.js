import React from 'react'
import classes from './Monthly.module.css'
import ProgressSummary from '../../components/ProgressSummary/ProgressSummary'
import Summary from '../../components/Summary/Summary'
import ChartSummary from '../../components/ChartSummary/ChartSummary'
import Navbar from '../../components/Navbar/Navbar'

const Monthly = props => {
  return (
    <div className={classes.Monthly}>
      <ProgressSummary left='primary' right='danger' />
      <div className={classes.Main}>
        <Summary color='primary' />
        <ChartSummary title='Month' />
        <Summary color='danger' />
      </div>
      <Navbar active='m' />
    </div>
  )
}

export default Monthly
