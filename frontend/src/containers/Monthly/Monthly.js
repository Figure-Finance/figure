import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  format,
  startOfToday,
  endOfMonth,
  eachMonthOfInterval,
  subYears
} from 'date-fns'
import api from '../../api'
import classes from './Monthly.module.css'
import Progress from '../../components/Progress/Progress'
import Breakdown from '../../components/Breakdown/Breakdown'
import Chart from '../../components/Chart/Chart'
import Navbar from '../../components/Navbar/Navbar'
import Loader from '../../components/Loader/Loader'

const Monthly = () => {
  const today = useMemo(() => startOfToday(), [])
  const lastYear = useMemo(() => subYears(today, 1), [today])
  const months = useMemo(
    () => eachMonthOfInterval({ start: lastYear, end: today }), [lastYear, today]
  )
  const monthStringMap = useMemo(
    () => months.map(day => format(day, 'MMM. yyy').toString()), [months]
  )

  const [currentMonthIndex, setCurrentMonthIndex] = useState(monthStringMap.length - 1)

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

  const onFetchMonthly = useCallback(async () => {
    const startDate = months[currentMonthIndex]
    const endDate = endOfMonth(startDate)
    const res = await api.get(`monthly/${startDate}/${endDate}`)
    return res.data
  }, [currentMonthIndex, months])

  const changeMonth = event => {
    const index = monthStringMap.findIndex(el => el === event.target.innerHTML)
    setCurrentMonthIndex(index)
  }

  const previousMonth = () => {
    if (currentMonthIndex > 0) {
      return setCurrentMonthIndex(currentMonthIndex - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonthIndex < monthStringMap.length - 1) {
      return setCurrentMonthIndex(currentMonthIndex + 1)
    }
  }

  useEffect(onFetchMonthly, [onFetchMonthly, currentMonthIndex])

  const { data, isLoading, isError } = useQuery('monthly', onFetchMonthly, {
    retry: false
  })
  const queryClient = useQueryClient()
  const mutateLeftClick = useMutation(previousMonth, {
    onSuccess: data => queryClient.clear()
  })
  const mutateRightClick = useMutation(nextMonth, {
    onSuccess: data => queryClient.clear()
  })

  const previousMonthHandler = () => {
    mutateLeftClick.mutate()
  }

  const nextMonthHandler = () => {
    mutateRightClick.mutate()
  }

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
        content={[]}
        color='primary' />
    )
    chart = (
      <Chart
        data={[]}
        timePeriods={monthStringMap}
        previousTimePeriod={previousMonthHandler}
        nextTimePeriod={nextMonthHandler}
        selectTimePeriod={changeMonth}
        currentTimePeriod={monthStringMap[currentMonthIndex]} />
    )
    expensesBreakdown = (
      <Breakdown
        title='Expenses'
        content={[]}
        color='danger' />
    )
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
        color='primary' />
    )
    chart = (
      <Chart
        data={expenses}
        timePeriods={monthStringMap}
        previousTimePeriod={previousMonthHandler}
        nextTimePeriod={nextMonthHandler}
        selectTimePeriod={changeMonth}
        currentTimePeriod={monthStringMap[currentMonthIndex]} />
    )
    expensesBreakdown = (
      <Breakdown
        title='Expenses'
        content={expenses}
        color='danger' />
    )
  }

  return (
    <div className={classes.Monthly}>
      {progress}
      <div className={classes.Main}>
        {incomeBreakdown}
        {chart}
        {expensesBreakdown}
      </div>
      <Navbar active='m' />
    </div>
  )
}

export default Monthly
