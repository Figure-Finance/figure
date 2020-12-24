import React, { useState, useEffect, useCallback } from 'react'
import api from '../../api'
import classes from './Savings.module.css'
import GraphSummary from '../../components/GraphSummary/GraphSummary'
import Progress from '../../components/Progress/Progress'
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

  const onDeposit = useCallback((body, cb) => {
    api.patch('savings/progress/update', body).then(res => {
      cb(res)
    }).catch(err => {
      console.log(err)
    })
  })

  const onAddGoal = useCallback(cb => {
    // setLoading(true)
    api.post('savings/goal/add').then(res => {
      cb(res)
    }).catch(err => {
      console.log(err)
    })
  })

  const onUpdateGoal = useCallback((id, body, cb) => {
    // setLoading(true)
    api.patch(`savings/goal/edit/${id}`, body).then(res => {
      cb(res)
    }).catch(err => {
      console.log(err)
      // setLoading(false)
    })
  }, [])

  const onDeleteGoal = useCallback((id, cb) => {
    // setLoading(true)
    api.delete(`savings/goal/delete/${id}`).then(res => {
      cb(res)
    }).catch(err => {
      // setLoading(false)
      console.log(err)
    })
  }, [])

  useEffect(() => {
    onFetchSavings()
  }, [onFetchSavings])

  return (
    <div className={classes.Savings}>
      <Progress
        updateProgress={onDeposit}
        leftColor='neutral'
        leftAmount={goalProgress}
        rightAmount={totalGoal}
        single
        loading={loading} />
      <div className={classes.Main}>
        <GraphSummary isSavings />
        <Summary
          addItem={onAddGoal}
          updateItem={onUpdateGoal}
          deleteItem={onDeleteGoal}
          color='neutral'
          title='Goal'
          content={goals}
          canAdd
          loading={loading} />
      </div>
      <Navbar active='s' />
    </div>
  )
}

export default Savings
