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
