import React, { useState, useEffect } from 'react'
import api from '../../api'
import classes from './Savings.module.css'
import GraphSummary from '../../components/GraphSummary/GraphSummary'
import ProgressSummary from '../../components/ProgressSummary/ProgressSummary'
import Summary from '../../components/Summary/Summary'
import Navbar from '../../components/Navbar/Navbar'

const Savings = props => {
  const [goals, setGoals] = useState([])
  const [totalGoal, setTotalGoal] = useState(0)

  useEffect(() => {
    api.get('savings').then(res => {
      console.log(res.data)
      setGoals(res.data.itemGoals)
      setTotalGoal(res.data.bankGoal)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className={classes.Savings}>
      <ProgressSummary
        left='neutral'
        leftAmount={1000.00}
        rightAmount={totalGoal}
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
