import React, { useState, useEffect, useCallback } from 'react'
import api from '../../api'
import classes from './Savings.module.css'
import Graph from '../../components/Graph/Graph'
import Progress from '../../components/Progress/Progress'
import Breakdown from '../../components/Breakdown/Breakdown'
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

  const onDeposit = useCallback((value, cb) => {
    api.patch('savings/progress', {
      progressAmount: value
    }).then(res => {
      cb(res)
      setGoalProgress(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const onUpdateTotalGoal = useCallback((value, cb) => {
    api.patch('savings/total', {
      totalSavingsGoal: value
    }).then(res => {
      cb(res)
      setTotalGoal(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const onAddGoal = useCallback((goal, cb) => {
    api.post('savings/goal', goal).then(res => {
      cb(res)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const onUpdateGoal = useCallback((id, body, cb) => {
    api.patch(`savings/goal/${id}`, body).then(res => {
      cb(res)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const onDeleteGoal = useCallback((id, cb) => {
    api.delete(`savings/goal/${id}`).then(res => {
      cb(res)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  useEffect(onFetchSavings, [onFetchSavings])

  return (
    <div className={classes.Savings}>
      <Progress
        updateGoal={onUpdateTotalGoal}
        updateProgress={onDeposit}
        leftColor='neutral'
        leftAmount={goalProgress}
        rightAmount={totalGoal}
        single
        loading={loading} />
      <div className={classes.Main}>
        <Graph isSavings />
        <Breakdown
          addItem={onAddGoal}
          updateItem={onUpdateGoal}
          deleteItem={onDeleteGoal}
          color='neutral'
          title='Goals'
          content={goals}
          loading={loading}
          canAdd />
      </div>
      <Navbar active='s' />
    </div>
  )
}

export default Savings
