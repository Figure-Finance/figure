import React, { useState, useEffect, useCallback } from 'react'
import api from '../../api'
import classes from './Savings.module.css'
import Graph from '../../components/Graph/Graph'
import Progress from '../../components/Progress/Progress'
import Breakdown from '../../components/Breakdown/Breakdown'
import Navbar from '../../components/Navbar/Navbar'

const Savings = () => {
  const [loading, setLoading] = useState(false)
  const [goals, setGoals] = useState([])
  const [goalProgress, setGoalProgress] = useState(0)
  const [totalGoal, setTotalGoal] = useState(0)
  const [graphTimePeriod, setGraphTimePeriod] = useState('1W')

  const onFetchSavings = useCallback(async () => {
    setLoading(true)
    try {
      const res = await api.get('savings')
      setLoading(false)
      setGoals(res.data.itemGoals)
      setGoalProgress(res.data.totalSavingsProgress)
      setTotalGoal(res.data.totalSavingsGoal)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }, [])

  const onDeposit = useCallback(async (value, cb) => {
    try {
      const res = await api.patch('savings/progress', {
        progressAmount: value
      })
      cb(res.data)
      setGoalProgress(goalProgress + value)
    } catch (err) {
      console.log(err)
    }
  }, [goalProgress])

  const onUpdateTotalGoal = useCallback(async (value, cb) => {
    try {
      const res = await api.patch('savings/total', {
        totalSavingsGoal: value
      })
      cb(res.data)
      setTotalGoal(value)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const onGetGoal = useCallback(async (id, cb) => {
    try {
      const res = await api.get(`savings/goal/${id}`)
      const data = { id, ...res.data }
      data.amount = +data.amount
      cb(data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const onAddGoal = useCallback(async (goal, cb) => {
    try {
      const res = await api.post('savings/goal', goal)
      const id = res.data.id
      const data = { id, progress: 0, ...goal }
      data.amount = +data.amount
      setGoals([...goals, data])
      cb(data)
    } catch (err) {
      console.log(err)
    }
  }, [goals])

  const onAllocateSavings = useCallback(async (id, allocateAmount, cb) => {
    try {
      allocateAmount = +allocateAmount
      await api.patch('savings/goal/allocate', {
        id,
        allocateAmount: allocateAmount
      })
      const data = { id, allocateAmount }
      const updatedGoalIndex = goals.findIndex(goal => goal.id === id)
      const updatedGoals = [...goals]
      updatedGoals[updatedGoalIndex].progress += allocateAmount
      setGoals(updatedGoals)
      cb(data)
    } catch (err) {
      console.log(err)
    }
  }, [goals])

  const onUpdateGoal = useCallback(async (id, body, cb) => {
    try {
      const res = await api.patch(`savings/goal/${id}`, body)
      cb(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const onDeleteGoal = useCallback(async (id, cb) => {
    try {
      const res = await api.delete(`savings/goal/${id}`)
      const updatedGoals = goals.filter(goal => goal.id !== id)
      console.log(res.data)
      setGoals(updatedGoals)
      cb(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [goals])

  const onFetchGraphData = useCallback(async timeFrame => {
    try {
      const res = await api.get(`savings/progress/${timeFrame}`)
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    onFetchSavings()
    onFetchGraphData('year')
  }, [onFetchSavings, onFetchGraphData])

  const graphTimePeriodChangeHandler = event => {
    setGraphTimePeriod(event.target.innerHTML)
  }

  const labels = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]

  return (
    <div className={classes.Savings}>
      <Progress
        updateGoal={onUpdateTotalGoal}
        updateProgress={onDeposit}
        leftColor='neutral'
        leftAmount={goalProgress}
        rightAmount={totalGoal}
        single
        showButtons
        loading={loading} />
      <div className={classes.Main}>
        <Graph
          onNavSavingsChange={graphTimePeriodChangeHandler}
          active={graphTimePeriod}
          labels={labels}
          isSavings />
        <Breakdown
          allocateSavings={onAllocateSavings}
          getItem={onGetGoal}
          addItem={onAddGoal}
          updateItem={onUpdateGoal}
          deleteItem={onDeleteGoal}
          color='neutral'
          title='Goals'
          content={goals}
          loading={loading}
          canAdd
          isSavings
          showButtons />
      </div>
      <Navbar active='s' />
    </div>
  )
}

export default Savings
