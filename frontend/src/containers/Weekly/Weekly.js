import React, { useState, useCallback, useMemo } from 'react'
import { useQuery } from 'react-query'
import {
  format,
  startOfToday,
  endOfWeek,
  eachWeekOfInterval,
  subYears
} from 'date-fns'
import api from '../../api'
import classes from './Weekly.module.css'
import Progress from '../../components/Progress/Progress'
import Breakdown from '../../components/Breakdown/Breakdown'
import Chart from '../../components/Chart/Chart'
import Navbar from '../../components/Navbar/Navbar'
import Loader from '../../components/Loader/Loader'
import Error from '../../components/Error/Error'

const Weekly = props => {
  const today = useMemo(() => startOfToday(), [])
  const lastYear = useMemo(() => subYears(today, 1), [today])
  const weeks = useMemo(
    () => eachWeekOfInterval({ start: lastYear, end: today }), [today, lastYear]
  )
  const weekStringMap = useMemo(() => weeks.map(day => {
    return `${format(day, 'MMM. dd')} - ${format(endOfWeek(day), 'MMM. dd')}`
  }), [weeks])

  const [currentWeekIndex, setCurrentWeekIndex] = useState(weekStringMap.length - 1)

  let totalIncome = 0
  let totalExpenses = 0

  const updateIncomeExpenses = updatedItems => {
    const income = []
    const expenses = []
    for (const item of updatedItems) {
      if (item.isIncome) {
        income.push(item)
        totalIncome += item.amount
      } else {
        expenses.push(item)
        totalExpenses += item.amount
      }
    }
    return { income, expenses }
  }

  const onFetchWeekly = useCallback(async () => {
    const startDate = weeks[currentWeekIndex]
    const endDate = endOfWeek(startDate)
    const res = await api.get(`weekly/${startDate}/${endDate}`)
    return res.data
  }, [currentWeekIndex, weeks])

  const onFetchWeeklyItem = useCallback(async id => {
    const res = await api.get(`weekly/${id}`)
    return res.data
  }, [])

  const onAddIncome = useCallback(async newIncome => {
    const res = await api.post('weekly', {
      ...newIncome,
      isIncome: true
    })
    return res.data
  }, [])

  const onAddExpense = useCallback(async newExpense => {
    const res = await api.post('weekly', {
      ...newExpense,
      isIncome: false
    })
    return res.data
  }, [])

  const onUpdateIncome = useCallback(async updatedIncome => {
    const res = await api.patch('weekly', updatedIncome)
    return res.data
  }, [])

  const onUpdateExpense = useCallback(async updatedExpense => {
    const res = await api.patch('weekly', updatedExpense)
    return res.data
  }, [])

  const onDeleteIncome = useCallback(async id => {
    const res = await api.delete(`weekly/${id}`)
    return res.data
  }, [])

  const onDeleteExpense = useCallback(async id => {
    const res = await api.delete(`weekly/${id}`)
    return res.data
  }, [])

  const changeWeek = useCallback(event => {
    const index = weekStringMap.findIndex(el => el === event.target.innerHTML)
    setCurrentWeekIndex(index)
  }, [weekStringMap])

  const previousWeek = useCallback(() => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1)
    }
  }, [currentWeekIndex])

  const nextWeek = useCallback(() => {
    if (currentWeekIndex < weekStringMap.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1)
    }
  }, [currentWeekIndex, weekStringMap.length])

  const { data, isLoading, isError } = useQuery('weekly', onFetchWeekly)

  let progress
  let incomeBreakdown
  let chart
  let expensesBreakdown

  if (isLoading) {
    progress = <Loader />
    incomeBreakdown = <Loader />
    chart = <Loader />
    expensesBreakdown = <Loader />
  } else if (isError) {
    progress = <Error />
    incomeBreakdown = <Error />
    chart = <Error />
    expensesBreakdown = <Error />
  } else {
    const { income, expenses } = updateIncomeExpenses(data)
    progress = (
      <Progress
        leftColor='primary'
        leftAmount={totalIncome}
        rightColor='danger'
        rightAmount={totalExpenses} />
    )
    incomeBreakdown = (
      <Breakdown
        title='Income'
        content={income}
        getItem={onFetchWeeklyItem}
        addItem={onAddIncome}
        updateItem={onUpdateIncome}
        deleteItem={onDeleteIncome}
        color='primary'
        canAdd
        showButtons />
    )
    chart = (
      <Chart
        data={expenses}
        timePeriods={weekStringMap}
        previousTimePeriod={previousWeek}
        nextTimePeriod={nextWeek}
        selectTimePeriod={changeWeek}
        currentTimePeriod={weekStringMap[currentWeekIndex]} />
    )
    expensesBreakdown = (
      <Breakdown
        title='Expenses'
        content={expenses}
        getItem={onFetchWeeklyItem}
        addItem={onAddExpense}
        updateItem={onUpdateExpense}
        deleteItem={onDeleteExpense}
        color='danger'
        canAdd
        showButtons />
    )
  }

  return (
    <div className={classes.Weekly}>
      {progress}
      <div className={classes.Main}>
        {incomeBreakdown}
        {chart}
        {expensesBreakdown}
      </div>
      <Navbar active='w' />
    </div>
  )
}

export default Weekly
