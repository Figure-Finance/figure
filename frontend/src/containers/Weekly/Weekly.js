import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import PropTypes from 'prop-types'
import {
  format,
  startOfToday,
  endOfWeek,
  eachWeekOfInterval,
  subYears,
} from 'date-fns'
import api from '../../api'
import classes from './Weekly.module.css'
import Progress from '../../components/Progress/Progress'
import Breakdown from '../../components/Breakdown/Breakdown'
import Chart from '../../components/Chart/Chart'
import Navbar from '../../components/Navbar/Navbar'
import Loader from '../../components/Loader/Loader'

const Weekly = ({ history }) => {
  if (!localStorage.getItem('token')) {
    history.push('/auth')
  }

  const today = useMemo(() => startOfToday(), [])
  const lastYear = useMemo(() => subYears(today, 1), [today])
  const weeks = useMemo(
    () => eachWeekOfInterval({ start: lastYear, end: today }),
    [today, lastYear]
  )
  const weekStringMap = useMemo(
    () =>
      weeks.map((day) => {
        return `${format(day, 'MMM. dd')} - ${format(
          endOfWeek(day),
          'MMM. dd'
        )}`
      }),
    [weeks]
  )

  const [currentWeekIndex, setCurrentWeekIndex] = useState(
    weekStringMap.length - 1
  )

  let totalIncome = 0
  let totalExpenses = 0

  const updateIncomeExpenses = (updatedItems) => {
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

  const sortCategories = (categories) => {
    const incomeCategories = []
    const expenseCategories = []
    for (const category of categories) {
      if (category.isIncome) {
        incomeCategories.push(category.category)
      } else {
        expenseCategories.push(category.category)
      }
    }
    return { incomeCategories, expenseCategories }
  }

  const onFetchWeekly = useCallback(async () => {
    const startDate = weeks[currentWeekIndex]
    const endDate = endOfWeek(startDate)
    console.log('startDate', startDate)
    console.log('endDate', endDate)
    const res = await api.get(`weekly/${startDate}/${endDate}`)
    console.log(res.data)
    return res.data
  }, [currentWeekIndex, weeks])

  const onFetchWeeklyItem = useCallback(async (id) => {
    const res = await api.get(`weekly/${id}`)
    return res.data
  }, [])

  const onAddIncome = useCallback(async (newIncome) => {
    newIncome.amount = +newIncome.amount
    newIncome.date = new Date(newIncome.date)
    const res = await api.post('weekly', {
      ...newIncome,
      isIncome: true,
    })
    return res.data
  }, [])

  const onAddExpense = useCallback(async (newExpense) => {
    newExpense.amount = +newExpense.amount
    newExpense.date = new Date(newExpense.date)
    const res = await api.post('weekly', {
      ...newExpense,
      isIncome: false,
    })
    return res.data
  }, [])

  const onUpdateIncome = useCallback(async (updatedIncome) => {
    const res = await api.patch('weekly', updatedIncome)
    return res.data
  }, [])

  const onUpdateExpense = useCallback(async (updatedExpense) => {
    const res = await api.patch('weekly', updatedExpense)
    return res.data
  }, [])

  const onDeleteIncome = useCallback(async (id) => {
    const res = await api.delete(`weekly/${id}`)
    return res.data
  }, [])

  const onDeleteExpense = useCallback(async (id) => {
    const res = await api.delete(`weekly/${id}`)
    return res.data
  }, [])

  const changeWeek = useCallback(
    (event) => {
      const index = weekStringMap.findIndex(
        (el) => el === event.target.innerHTML
      )
      return setCurrentWeekIndex(index)
    },
    [weekStringMap]
  )

  const previousWeek = useCallback(() => {
    if (currentWeekIndex > 0) {
      return setCurrentWeekIndex(currentWeekIndex - 1)
    }
  }, [currentWeekIndex])

  const nextWeek = useCallback(() => {
    if (currentWeekIndex < weekStringMap.length - 1) {
      return setCurrentWeekIndex(currentWeekIndex + 1)
    }
  }, [currentWeekIndex, weekStringMap.length])

  useEffect(onFetchWeekly, [onFetchWeekly])

  const { data, isLoading, isError, error } = useQuery(
    'weekly',
    onFetchWeekly,
    {
      retry: false,
      staleTime: Infinity,
    }
  )
  const queryClient = useQueryClient()
  const mutateSelectWeek = useMutation(changeWeek, {
    onSuccess: () => queryClient.clear(),
  })
  const mutateLeftClick = useMutation(previousWeek, {
    onSuccess: () => queryClient.clear(),
  })
  const mutateRightClick = useMutation(nextWeek, {
    onSuccess: () => queryClient.clear(),
  })

  const changeWeekHandler = () => {
    mutateSelectWeek.mutate()
  }

  const previousWeekHandler = () => {
    mutateLeftClick.mutate()
  }

  const nextWeekHandler = () => {
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
        leftColor="primary"
        leftAmount={totalIncome}
        rightColor="danger"
        rightAmount={totalExpenses}
      />
    )
    incomeBreakdown = (
      <Breakdown
        title="Income"
        content={[]}
        getItem={onFetchWeeklyItem}
        addItem={onAddIncome}
        updateItem={onUpdateIncome}
        deleteItem={onDeleteIncome}
        color="primary"
        canAdd
        showButtons
      />
    )
    chart = (
      <Chart
        data={[]}
        timePeriods={weekStringMap}
        previousTimePeriod={previousWeekHandler}
        nextTimePeriod={nextWeekHandler}
        selectTimePeriod={changeWeekHandler}
        currentTimePeriod={weekStringMap[currentWeekIndex]}
      />
    )
    expensesBreakdown = (
      <Breakdown
        title="Expenses"
        content={[]}
        getItem={onFetchWeeklyItem}
        addItem={onAddExpense}
        updateItem={onUpdateExpense}
        deleteItem={onDeleteExpense}
        color="danger"
        canAdd
        showButtons
      />
    )
  } else {
    console.log(data)
    const { categories, financeData } = data
    const { incomeCategories, expenseCategories } = sortCategories(categories)
    const { income, expenses } = updateIncomeExpenses(financeData)
    progress = (
      <Progress
        leftColor="primary"
        leftAmount={totalIncome}
        rightColor="danger"
        rightAmount={totalExpenses}
      />
    )
    incomeBreakdown = (
      <Breakdown
        title="Income"
        categories={incomeCategories}
        content={income}
        getItem={onFetchWeeklyItem}
        addItem={onAddIncome}
        updateItem={onUpdateIncome}
        deleteItem={onDeleteIncome}
        color="primary"
        canAdd
        showButtons
      />
    )
    chart = (
      <Chart
        data={expenses}
        timePeriods={weekStringMap}
        previousTimePeriod={previousWeekHandler}
        nextTimePeriod={nextWeekHandler}
        selectTimePeriod={changeWeek}
        currentTimePeriod={weekStringMap[currentWeekIndex]}
      />
    )
    expensesBreakdown = (
      <Breakdown
        title="Expenses"
        categories={expenseCategories}
        content={expenses}
        getItem={onFetchWeeklyItem}
        addItem={onAddExpense}
        updateItem={onUpdateExpense}
        deleteItem={onDeleteExpense}
        color="danger"
        canAdd
        showButtons
      />
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
      <Navbar active="w" />
    </div>
  )
}

Weekly.propTypes = {
  history: PropTypes.object,
}

export default Weekly
