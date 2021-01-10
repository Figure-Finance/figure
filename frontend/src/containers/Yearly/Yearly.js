import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  format,
  startOfToday,
  endOfYear,
  eachYearOfInterval,
  subYears
} from 'date-fns'
import api from '../../api'
import classes from './Yearly.module.css'
import Graph from '../../components/Graph/Graph'
import Breakdown from '../../components/Breakdown/Breakdown'
import Navbar from '../../components/Navbar/Navbar'
import Loader from '../../components/Loader/Loader'
import Error from '../../components/Error/Error'

const Yearly = () => {
  const today = useMemo(() => startOfToday(), [])
  const tenYearsAgo = useMemo(
    () => subYears(today, 10), [today]
  )
  const years = useMemo(
    () => eachYearOfInterval({ start: tenYearsAgo, end: today }),
    [today, tenYearsAgo]
  )
  const yearStringMap = useMemo(
    () => years.map(day => format(day, 'yyy').toString()),
    [years]
  )

  const months = useMemo(() => [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ], [])

  const [currentYearIndex, setCurrentYearIndex] = useState(yearStringMap.length - 1)

  const updateIncomeExpenses = updatedItems => {
    const income = []
    const expenses = []
    const incomeByMonth = Array(12).fill(0)
    const expensesByMonth = Array(12).fill(0)
    for (const item of updatedItems) {
      if (item.isIncome) {
        income.push(item)
        incomeByMonth[item.month - 1] += item.amount
      } else {
        expenses.push(item)
        expensesByMonth[item.month - 1] += item.amount
      }
    }
    return { income, expenses, incomeByMonth, expensesByMonth }
  }

  const onFetchYearly = useCallback(async () => {
    const startDate = years[currentYearIndex]
    const endDate = endOfYear(startDate)
    const res = await api.get(`yearly/${startDate}/${endDate}`)
    return res.data
  }, [currentYearIndex, years])

  const changeYear = event => {
    const index = yearStringMap.findIndex(el => el === event.target.innerHTML)
    setCurrentYearIndex(index)
  }

  const previousYear = () => {
    if (currentYearIndex > 0) {
      setCurrentYearIndex(currentYearIndex - 1)
    }
  }

  const nextYear = () => {
    if (currentYearIndex < yearStringMap.length - 1) {
      setCurrentYearIndex(currentYearIndex + 1)
    }
  }

  useEffect(onFetchYearly, [onFetchYearly, currentYearIndex])

  const { data, isLoading, isError } = useQuery('monthly', onFetchYearly, {
    retry: false
  })
  const queryClient = useQueryClient()
  const mutateLeftClick = useMutation(previousYear, {
    onSuccess: data => queryClient.clear()
  })
  const mutateRightClick = useMutation(nextYear, {
    onSuccess: data => queryClient.clear()
  })

  const previousYearHandler = () => {
    mutateLeftClick.mutate()
  }

  const nextYearHandler = () => {
    mutateRightClick.mutate()
  }

  let graph
  let incomeBreakdown
  let expensesBreakdown

  if (isLoading) {
    graph = <Loader />
    incomeBreakdown = <Loader />
    expensesBreakdown = <Loader />
  } else if (isError) {
    graph = <Error />
    incomeBreakdown = <Error />
    expensesBreakdown = <Error />
  } else {
    const { income, expenses, incomeByMonth, expensesByMonth } = updateIncomeExpenses(data)
    graph = (
      <Graph
        data={{
          income: incomeByMonth,
          expenses: expensesByMonth
        }}
        labels={months}
        timePeriods={yearStringMap}
        previousTimePeriod={previousYearHandler}
        nextTimePeriod={nextYearHandler}
        selectTimePeriod={changeYear}
        currentTimePeriod={yearStringMap[currentYearIndex]} />
    )
    incomeBreakdown = (
      <Breakdown
        content={income}
        color='primary'
        height='50%'
        width='100%' />
    )
    expensesBreakdown = (
      <Breakdown
        content={expenses}
        color='danger'
        height='50%'
        width='100%' />
    )
  }

  return (
    <div className={classes.Yearly}>
      <div className={classes.Main}>
        {graph}
        <div className={classes.Summaries}>
          {incomeBreakdown}
          {expensesBreakdown}
        </div>
      </div>
      <Navbar active='y' />
    </div>
  )
}

export default Yearly
