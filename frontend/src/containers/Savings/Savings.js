import React, { useState, useEffect, useCallback } from 'react'
import api from '../../api'
import classes from './Savings.module.css'
import GraphSummary from '../../components/GraphSummary/GraphSummary'
import ProgressSummary from '../../components/ProgressSummary/ProgressSummary'
import Summary from '../../components/Summary/Summary'
import Navbar from '../../components/Navbar/Navbar'

const Savings = props => {
  const [loading, setLoading] = useState(false)
  const [goals, setGoals] = useState([])
  const [goalProgress, setGoalProgress] = useState(0)
  const [totalGoal, setTotalGoal] = useState(0)

  const onFetchSavings = useCallback(() => {
    setLoading(true)
    api.get('savings').then(res => {
      setLoading(false)
      setGoals(res.data.itemGoals)
      setGoalProgress(res.data.totalSavingsProgress)
      setTotalGoal(res.data.totalSavingsGoal)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  }, [])

  const onUpdateGoal = useCallback((id, body, cb) => {
    setLoading(true)
    api.patch(`savings/goal/edit/${id}`, body).then(res => {
      cb(res)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  }, [])

  const onDeleteGoal = useCallback((id, cb) => {
    setLoading(true)
    api.delete(`savings/goal/delete/${id}`).then(res => {
      cb(res)
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
  }, [])

  useEffect(() => {
    onFetchSavings()
  }, [onFetchSavings])

  let progressSummary = <h1>Loading...</h1>
  let summary = <h1>Loading...</h1>

  if (!loading) {
    progressSummary = (
      <ProgressSummary
        left='neutral'
        leftAmount={goalProgress}
        rightAmount={totalGoal}
        single />
    )

    summary = (
      <Summary
        updateGoal={onUpdateGoal}
        deleteGoal={onDeleteGoal}
        color='neutral'
        title='Goals'
        content={goals}
        canAdd />
    )
  }

  return (
    <div className={classes.Savings}>
      {progressSummary}
      <div className={classes.Main}>
        <GraphSummary isSavings />
        {summary}
      </div>
      <Navbar active='s' />
    </div>
  )
}

export default Savings
