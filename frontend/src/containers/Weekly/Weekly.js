import React from 'react'
import classes from './Weekly.module.css'
import ProgressSummary from '../../components/ProgressSummary/ProgressSummary'
import Summary from '../../components/Summary/Summary'
import ChartSummary from '../../components/ChartSummary/ChartSummary'
import Navbar from '../../components/Navbar/Navbar'

const Weekly = props => {
  return (
    <div className={classes.Weekly}>
      <ProgressSummary />
      <div className={classes.Main}>
        <Summary color='primary' />
        <ChartSummary title='Week' />
        <Summary color='danger' />
      </div>
      <Navbar active='w' />
    </div>
  )
}

export default Weekly
