import React, { useState, useEffect, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import PropTypes from 'prop-types'
import api from '../../api'
import classes from './Savings.module.css'
import Graph from '../../components/Graph/Graph'
import Progress from '../../components/Progress/Progress'
import Breakdown from '../../components/Breakdown/Breakdown'
import Navbar from '../../components/Navbar/Navbar'
import Loader from '../../components/Loader/Loader'

const Savings = ({ history }) => {
  if (!localStorage.getItem('token')) {
    history.push('/auth')
  }

  const [graphTimePeriod, setGraphTimePeriod] = useState('1W')

  const getTimeFrame = useCallback((period) => {
    switch (period) {
      case '1W':
        return 'week'
      case '1M':
        return 'month'
      case '3M':
        return 'quarter'
      case '1Y':
        return 'year'
      case 'A':
        return 'all'
      default:
        break
    }
  }, [])

  const onFetchSavings = useCallback(async () => {
    const res = await api.get('savings')
    return res.data
  }, [])

  const onFetchSavingsGraph = useCallback(async () => {
    const period = getTimeFrame(graphTimePeriod)
    const res = await api.get(`savings/progress/${period}`)
    return res.data
  }, [getTimeFrame, graphTimePeriod])

  const onDeposit = useCallback(async (progressAmount) => {
    const res = await api.patch('savings/progress', {
      progressAmount,
    })
    return res.data
  }, [])

  const onUpdateTotalGoal = useCallback(async (totalSavingsGoal) => {
    const res = await api.patch('savings/total', {
      totalSavingsGoal,
    })
    return res.data
  }, [])

  const onGetGoal = useCallback(async (id) => {
    const res = await api.get(`savings/goal/${id}`)
    return res.data
  }, [])

  const onAddGoal = useCallback(async (newGoal) => {
    newGoal.amount = +newGoal.amount
    const res = await api.post('savings/goal', newGoal)
    return res.data
  }, [])

  const onAllocateSavings = useCallback(async (id, allocateAmount) => {
    allocateAmount = +allocateAmount
    const res = await api.patch('savings/goal/allocate', {
      id,
      allocateAmount,
    })
    return res.data
  }, [])

  const onUpdateGoal = useCallback(async (id, updateGoal) => {
    const res = await api.patch(`savings/goal/${id}`, updateGoal)
    return res.data
  }, [])

  const onDeleteGoal = useCallback(async (id) => {
    const res = await api.delete(`savings/goal/${id}`)
    return res.data
  }, [])

  useEffect(onFetchSavings, [onFetchSavings])
  useEffect(onFetchSavingsGraph, [onFetchSavingsGraph])

  const { data, isLoading, isError, error } = useQuery(
    'savings',
    onFetchSavings,
    {
      retry: false,
      staleTime: Infinity,
    }
  )
  const {
    data: graphData,
    isLoading: graphIsLoading,
    isError: graphIsError,
  } = useQuery('savingsGraph', onFetchSavingsGraph)

  const timePeriodChange = (event) => {
    setGraphTimePeriod(event.target.innerHTML)
  }

  const queryClient = useQueryClient()
  const mutateTimePeriod = useMutation((event) => timePeriodChange(event), {
    onSuccess: () => queryClient.clear(),
  })

  const timePeriodChangeHandler = (event) => {
    mutateTimePeriod.mutate(event)
  }

  const labels = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  let progress
  let graph
  let breakdown

  if (isLoading) {
    progress = <Loader />
    breakdown = <Loader />
  } else if (isError) {
    if (error.response.status && error.response.status === 401) {
      history.push('/auth')
    }
    progress = (
      <Progress
        updateGoal={onUpdateTotalGoal}
        updateProgress={onDeposit}
        leftColor="neutral"
        leftAmount={0}
        rightAmount={0}
        single
        showButtons
      />
    )
    breakdown = (
      <Breakdown
        allocateSavings={onAllocateSavings}
        getItem={onGetGoal}
        addItem={onAddGoal}
        updateItem={onUpdateGoal}
        deleteItem={onDeleteGoal}
        color="neutral"
        title="Goals"
        content={[]}
        canAdd
        isSavings
        showButtons
      />
    )
  } else {
    const goals = data.itemGoals
    const goalProgress = data.totalSavingsProgress
    const totalGoal = data.totalSavingsGoal
    progress = (
      <Progress
        updateGoal={onUpdateTotalGoal}
        updateProgress={onDeposit}
        leftColor="neutral"
        leftAmount={goalProgress}
        rightAmount={totalGoal}
        single
        showButtons
      />
    )
    breakdown = (
      <Breakdown
        allocateSavings={onAllocateSavings}
        getItem={onGetGoal}
        addItem={onAddGoal}
        updateItem={onUpdateGoal}
        deleteItem={onDeleteGoal}
        color="neutral"
        title="Goals"
        content={goals}
        canAdd
        isSavings
        showButtons
      />
    )
  }

  if (graphIsLoading) {
    graph = <Loader />
  } else if (graphIsError) {
    graph = (
      <Graph
        onNavSavingsChange={(e) => timePeriodChangeHandler(e)}
        active={graphTimePeriod}
        labels={labels}
        isSavings
      />
    )
  } else if (graphData) {
    const data = [0, 0, 0, 0, 0, 0, 0]
    for (const dataElement of graphData) {
      const date = new Date()
      const dayOfWeek = date.getDay(dataElement.period)
      data[dayOfWeek] = dataElement.amount
    }
    graph = (
      <Graph
        onNavSavingsChange={(e) => timePeriodChangeHandler(e)}
        active={graphTimePeriod}
        labels={labels}
        data={{ savings: data }}
        isSavings
      />
    )
  }

  return (
    <div className={classes.Savings}>
      {progress}
      <div className={classes.Main}>
        {graph}
        {breakdown}
      </div>
      <Navbar active="s" />
    </div>
  )
}

Savings.propTypes = {
  history: PropTypes.object,
}

export default Savings
