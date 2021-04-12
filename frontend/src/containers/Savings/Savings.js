import React, { useState, useEffect, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import PropTypes from 'prop-types'
import {
  format,
  startOfToday,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  subDays,
  subMonths,
  subYears,
  addDays,
  differenceInCalendarDays,
  differenceInCalendarWeeks,
  differenceInCalendarMonths,
  differenceInCalendarYears,
} from 'date-fns'
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

  const onDeposit = useCallback(
    async (progressAmount, totalSavingsProgress) => {
      const res = await api.patch('savings/progress', {
        progressAmount,
      })
      return {
        message: res.data.message,
        totalSavingsProgress: progressAmount + totalSavingsProgress,
      }
    },
    []
  )

  const onUpdateTotalGoal = useCallback(async (totalSavingsGoal) => {
    const res = await api.patch('savings/total', {
      totalSavingsGoal,
    })
    return { message: res.data.message, totalSavingsGoal: totalSavingsGoal }
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
  const mutateDeposit = useMutation(
    ({ value, totalSavingsProgress }) => {
      return onDeposit(value, totalSavingsProgress)
    },
    {
      onSuccess: (res) => {
        data.totalSavingsProgress = res.totalSavingsProgress
      },
    }
  )
  const mutateTotalGoal = useMutation((value) => onUpdateTotalGoal(value), {
    onSuccess: (res) => {
      data.totalSavingsGoal = res.totalSavingsGoal
    },
  })

  const timePeriodChangeHandler = (event) => {
    mutateTimePeriod.mutate(event)
  }
  const depositChangeHandler = (value, totalSavingsProgress) => {
    mutateDeposit.mutate({
      value: value,
      totalSavingsProgress: totalSavingsProgress,
    })
  }
  const totalGoalChangeHandler = (value) => {
    mutateTotalGoal.mutate(value)
  }

  let labels
  let dates

  switch (graphTimePeriod) {
    case '1W':
      dates = eachDayOfInterval({
        start: subDays(startOfToday(), 6),
        end: startOfToday(),
      })
      labels = dates.map((date) => format(date, 'EEEE'))
      break
    case '1M':
      dates = eachDayOfInterval({
        start: subDays(startOfToday(), 29),
        end: startOfToday(),
      })
      labels = dates.map((date) => format(date, 'M/d'))
      break
    case '3M':
      dates = eachWeekOfInterval({
        start: subMonths(startOfToday(), 3),
        end: startOfToday(),
      })
      labels = dates.map((date) =>
        format(date, `M/d - M/${format(addDays(date, 7), 'd')}`)
      )
      break
    case '1Y':
      dates = eachMonthOfInterval({
        start: subMonths(startOfToday(), 11),
        end: startOfToday(),
      })
      labels = dates.map((date) => format(date, 'MMMM'))
      break
    case 'A':
      dates = eachYearOfInterval({
        start: subYears(startOfToday(), 4),
        end: startOfToday(),
      })
      labels = dates.map((date) => format(date, 'yyy'))
      break
    default:
      break
  }

  let progress
  let graph
  let breakdown

  if (isLoading) {
    progress = <Loader />
    breakdown = <Loader />
  } else if (isError) {
    if (
      error &&
      error.response &&
      error.response.status &&
      error.response.status === 401
    ) {
      history.push('/auth')
    }
    progress = (
      <Progress
        updateGoal={(value) => totalGoalChangeHandler(value)}
        updateProgress={(value) => depositChangeHandler(value)}
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
    const { itemGoals, savings } = data
    const { totalSavingsGoal, totalSavingsProgress } = savings
    progress = (
      <Progress
        updateGoal={(value) => totalGoalChangeHandler(value)}
        updateProgress={(value) =>
          depositChangeHandler(value, totalSavingsProgress)
        }
        leftColor="neutral"
        leftAmount={totalSavingsProgress}
        rightAmount={totalSavingsGoal}
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
        content={itemGoals}
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
    let savingsData
    const { progressUpdates } = data.savings
    progressUpdates.map((update) => {
      if (update.curTotal) {
        let difference
        const date = new Date(update.date)
        switch (graphTimePeriod) {
          case '1W':
            savingsData = new Array(7).fill(0)
            difference = differenceInCalendarDays(date, startOfToday())
            savingsData[savingsData.length + difference] = update.curTotal
            return difference
          case '1M':
            savingsData = new Array(30).fill(0)
            difference = differenceInCalendarDays(date, startOfToday())
            savingsData[savingsData.length + difference] = update.curTotal
            return difference
          case '3M':
            savingsData = new Array(13).fill(0)
            difference = differenceInCalendarWeeks(date, startOfToday())
            savingsData[savingsData.length + difference] = update.curTotal
            return difference
          case '1Y':
            savingsData = new Array(11).fill(0)
            difference = differenceInCalendarMonths(date, startOfToday())
            savingsData[savingsData.length + difference] = update.curTotal
            return difference
          case 'A':
            savingsData = new Array(4).fill(0)
            difference = differenceInCalendarYears(date, startOfToday())
            savingsData[savingsData.length + difference] = update.curTotal
            return difference
          default:
            difference = differenceInCalendarYears(date, startOfToday())
            savingsData[savingsData.length + difference] = update.curTotal
            return difference
        }
      }
      return 0
    })
    graph = (
      <Graph
        onNavSavingsChange={(e) => timePeriodChangeHandler(e)}
        active={graphTimePeriod}
        labels={labels}
        data={{ savings: savingsData }}
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
