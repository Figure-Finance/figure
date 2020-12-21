import React from 'react'
import classes from './Weekly.module.css'
import ProgressSummary from '../../components/ProgressSummary/ProgressSummary'
import Summary from '../../components/Summary/Summary'
import ChartSummary from '../../components/ChartSummary/ChartSummary'
import Navbar from '../../components/Navbar/Navbar'

const Weekly = props => {
  return (
    <div className={classes.Weekly}>
      <ProgressSummary left='primary' right='danger' />
      <div className={classes.Main}>
        <Summary color='primary' canAdd />
        <ChartSummary title='Week' />
        <Summary color='danger' canAdd />
      </div>
      <Navbar active='w' />
    </div>
  )
}

export default Weekly
