import React, { useState, useEffect, useCallback } from 'react'
import { useQuery } from 'react-query'
import api from '../../api'
import classes from './Savings.module.css'
import Graph from '../../components/Graph/Graph'
import Progress from '../../components/Progress/Progress'
import Breakdown from '../../components/Breakdown/Breakdown'
import Navbar from '../../components/Navbar/Navbar'
import Loader from '../../components/Loader/Loader'

const Savings = () => {
  const [graphTimePeriod, setGraphTimePeriod] = useState('1W')

  const onFetchSavings = useCallback(async () => {
    const res = await api.get('savings')
    return res.data
  }, [])

  const onDeposit = useCallback(async progressAmount => {
    const res = await api.patch('savings/progress', {
      progressAmount
    })
    return res.data
  }, [])

  const onUpdateTotalGoal = useCallback(async totalSavingsGoal => {
    const res = await api.patch('savings/total', {
      totalSavingsGoal
    })
    return res.data
  }, [])

  const onGetGoal = useCallback(async id => {
    const res = await api.get(`savings/goal/${id}`)
    return res.data
  }, [])

  const onAddGoal = useCallback(async newGoal => {
    newGoal.amount = +newGoal.amount
    const res = await api.post('savings/goal', newGoal)
    return res.data
  }, [])

  const onAllocateSavings = useCallback(async (id, allocateAmount) => {
    allocateAmount = +allocateAmount
    const res = await api.patch('savings/goal/allocate', {
      id,
      allocateAmount
    })
    return res.data
  }, [])

  const onUpdateGoal = useCallback(async (id, updateGoal) => {
    const res = await api.patch(`savings/goal/${id}`, updateGoal)
    return res.data
  }, [])

  const onDeleteGoal = useCallback(async id => {
    const res = await api.delete(`savings/goal/${id}`)
    return res.data
  }, [])

  const onFetchGraphData = useCallback(async timeFrame => {
    const res = await api.get(`savings/progress/${timeFrame}`)
    return res.data
  }, [])

  useEffect(() => {
    onFetchSavings()
    onFetchGraphData('year')
  }, [onFetchSavings, onFetchGraphData])

  const { data, isLoading, isError } = useQuery('savings', onFetchSavings, {
    retry: false
  })

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

  let progress
  let graph
  let breakdown

  if (isLoading) {
    progress = <Loader />
    graph = <Loader />
    breakdown = <Loader />
  } else if (isError) {
    progress = (
      <Progress
        updateGoal={onUpdateTotalGoal}
        updateProgress={onDeposit}
        leftColor='neutral'
        leftAmount={0}
        rightAmount={0}
        single
        showButtons />
    )
    graph = (
      <Graph
        onNavSavingsChange={graphTimePeriodChangeHandler}
        active={graphTimePeriod}
        labels={labels}
        isSavings />
    )
    breakdown = (
      <Breakdown
        allocateSavings={onAllocateSavings}
        getItem={onGetGoal}
        addItem={onAddGoal}
        updateItem={onUpdateGoal}
        deleteItem={onDeleteGoal}
        color='neutral'
        title='Goals'
        content={[]}
        canAdd
        isSavings
        showButtons />
    )
  } else {
    const goals = data.itemGoals
    const goalProgress = data.totalSavingsProgress
    const totalGoal = data.totalSavingsGoal
    progress = (
      <Progress
        updateGoal={onUpdateTotalGoal}
        updateProgress={onDeposit}
        leftColor='neutral'
        leftAmount={goalProgress}
        rightAmount={totalGoal}
        single
        showButtons />
    )
    graph = (
      <Graph
        onNavSavingsChange={graphTimePeriodChangeHandler}
        active={graphTimePeriod}
        labels={labels}
        isSavings />
    )
    breakdown = (
      <Breakdown
        allocateSavings={onAllocateSavings}
        getItem={onGetGoal}
        addItem={onAddGoal}
        updateItem={onUpdateGoal}
        deleteItem={onDeleteGoal}
        color='neutral'
        title='Goals'
        content={goals}
        canAdd
        isSavings
        showButtons />
    )
  }

  return (
    <div className={classes.Savings}>
      {progress}
      <div className={classes.Main}>
        {graph}
        {breakdown}
      </div>
      <Navbar active='s' />
    </div>
  )
}

export default Savings
