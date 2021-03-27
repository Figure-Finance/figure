import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import PropTypes from 'prop-types'
import {
  format,
  startOfToday,
  endOfYear,
  eachYearOfInterval,
  subYears,
} from 'date-fns'
import api from '../../api'
import classes from './Yearly.module.css'
import Graph from '../../components/Graph/Graph'
import Breakdown from '../../components/Breakdown/Breakdown'
import Navbar from '../../components/Navbar/Navbar'
import Loader from '../../components/Loader/Loader'

const Yearly = ({ history }) => {
  if (!localStorage.getItem('token')) {
    history.push('/auth')
  }

  const today = useMemo(() => startOfToday(), [])
  const tenYearsAgo = useMemo(() => subYears(today, 10), [today])
  const years = useMemo(
    () => eachYearOfInterval({ start: tenYearsAgo, end: today }),
    [today, tenYearsAgo]
  )
  const yearStringMap = useMemo(
    () => years.map((day) => format(day, 'yyy').toString()),
    [years]
  )

  const months = useMemo(
    () => [
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
      'December',
    ],
    []
  )

  const [currentYearIndex, setCurrentYearIndex] = useState(
    yearStringMap.length - 1
  )

  const updateIncomeExpenses = (updatedItems) => {
    const income = []
    const expenses = []
    for (const item of updatedItems) {
      if (item.isIncome) {
        income.push(item)
      } else {
        expenses.push(item)
      }
    }
    return { income, expenses }
  }

  const updateIncomeExpensesByMonth = (updatedItems) => {
    const incomeByMonth = Array(12).fill(0)
    const expensesByMonth = Array(12).fill(0)
    for (const item of updatedItems) {
      if (item.isIncome) {
        incomeByMonth[item.month - 1] += item.amount
      } else {
        expensesByMonth[item.month - 1] += item.amount
      }
    }
    return { incomeByMonth, expensesByMonth }
  }

  const onFetchYearly = useCallback(async () => {
    const startDate = years[currentYearIndex]
    const endDate = endOfYear(startDate)
    const res = await api.get(`yearly/${startDate}/${endDate}`)
    return res.data
  }, [currentYearIndex, years])

  const onFetchYearlyGraph = useCallback(async () => {
    const startDate = years[currentYearIndex]
    const endDate = endOfYear(startDate)
    const res = await api.get(`yearly/graph/${startDate}/${endDate}`)
    return res.data
  }, [currentYearIndex, years])

  const changeYear = (event) => {
    const index = yearStringMap.findIndex((el) => el === event.target.innerHTML)
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
  useEffect(onFetchYearlyGraph, [onFetchYearlyGraph, currentYearIndex])

  const { data, isLoading, isError, error } = useQuery(
    'yearly',
    onFetchYearly,
    {
      retry: false,
      staleTime: Infinity,
    }
  )
  const {
    data: graphData,
    isLoading: graphIsLoading,
    isError: graphIsError,
  } = useQuery('yearlyGraph', onFetchYearlyGraph, {
    retry: false,
    staleTime: Infinity,
  })
  const queryClient = useQueryClient()
  const mutateLeftClick = useMutation(previousYear, {
    onSuccess: () => queryClient.clear(),
  })
  const mutateRightClick = useMutation(nextYear, {
    onSuccess: () => queryClient.clear(),
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
    incomeBreakdown = <Loader />
    expensesBreakdown = <Loader />
  } else if (isError) {
    if (error.response.status && error.response.status === 401) {
      history.push('/auth')
    }
    incomeBreakdown = (
      <Breakdown content={[]} color="primary" height="50%" width="100%" />
    )
    expensesBreakdown = (
      <Breakdown content={[]} color="danger" height="50%" width="100%" />
    )
  } else if (data) {
    const { income, expenses } = updateIncomeExpenses(data)
    incomeBreakdown = (
      <Breakdown content={income} color="primary" height="50%" width="100%" />
    )
    expensesBreakdown = (
      <Breakdown content={expenses} color="danger" height="50%" width="100%" />
    )
  }

  if (graphIsLoading) {
    graph = <Loader />
  } else if (graphIsError) {
    graph = (
      <Graph
        data={{
          income: [],
          expenses: [],
        }}
        labels={months}
        timePeriods={yearStringMap}
        previousTimePeriod={previousYearHandler}
        nextTimePeriod={nextYearHandler}
        selectTimePeriod={changeYear}
        currentTimePeriod={yearStringMap[currentYearIndex]}
      />
    )
  } else if (graphData) {
    const { income, expenses } = graphData
    const updatedGraphData = [...income, ...expenses]
    const { incomeByMonth, expensesByMonth } = updateIncomeExpensesByMonth(
      updatedGraphData
    )
    graph = (
      <Graph
        data={{
          income: incomeByMonth,
          expenses: expensesByMonth,
        }}
        labels={months}
        timePeriods={yearStringMap}
        previousTimePeriod={previousYearHandler}
        nextTimePeriod={nextYearHandler}
        selectTimePeriod={changeYear}
        currentTimePeriod={yearStringMap[currentYearIndex]}
      />
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
      <Navbar active="y" />
    </div>
  )
}

Yearly.propTypes = {
  history: PropTypes.object,
}

export default Yearly
