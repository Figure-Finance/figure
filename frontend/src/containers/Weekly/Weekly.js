import React, { useState, useEffect, useCallback, useMemo } from 'react'
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

const Weekly = props => {
  const today = useMemo(() => startOfToday(), [])
  const lastYear = useMemo(() => subYears(today, 1), [today])
  const weeks = useMemo(
    () => eachWeekOfInterval({ start: lastYear, end: today }), [today, lastYear]
  )
  const weekStringMap = useMemo(() => weeks.map(day => {
    return `${format(day, 'MMM. dd')} - ${format(endOfWeek(day), 'MMM. dd')}`
  }), [weeks])

  const [income, setIncome] = useState([])
  const [expenses, setExpenses] = useState([])
  const [currentWeekIndex, setCurrentWeekIndex] = useState(weekStringMap.length - 1)

  const updateIncomeExpenses = updatedItems => {
    const updatedIncome = []
    const updatedExpenses = []
    for (const item of updatedItems) {
      if (item.isIncome) {
        updatedIncome.push(item)
      } else {
        updatedExpenses.push(item)
      }
    }
    setIncome(updatedIncome)
    setExpenses(updatedExpenses)
  }

  const onFetchWeekly = useCallback(async () => {
    const startDate = weeks[currentWeekIndex]
    const endDate = endOfWeek(startDate)
    try {
      const res = await api.get(`weekly/${startDate}/${endDate}`)
      updateIncomeExpenses(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [currentWeekIndex, weeks])

  const onFetchWeeklyItem = useCallback(async (id, cb) => {
    try {
      const res = await api.get(`weekly/${id}`)
      const data = { id, ...res.data }
      cb(data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const onAddIncome = useCallback(async (newIncome, cb) => {
    try {
      const res = await api.post('weekly', {
        ...newIncome,
        isIncome: true
      })
      const id = res.data.id
      newIncome.amount = +newIncome.amount
      setIncome([...income, { id, ...newIncome }])
      cb(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [income])

  const onAddExpense = useCallback(async (newExpense, cb) => {
    try {
      const res = await api.post('weekly', {
        ...newExpense,
        isIncome: false
      })
      const id = res.data.id
      newExpense.amount = +newExpense.amount
      setExpenses([...expenses, { id, ...newExpense }])
      cb(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [expenses])

  const onUpdateIncome = useCallback(async (body, cb) => {
    console.log(body)
    try {
      const res = await api.patch('weekly', body)
      console.log(res.data)
      const itemToReplace = income.findIndex(item => item.id === body.id)
      const updatedIncome = [...income].splice(itemToReplace, 1, res.data)
      setIncome(updatedIncome)
      cb(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [income])

  const onUpdateExpense = useCallback(async (body, cb) => {
    console.log(body)
    try {
      const res = await api.patch('weekly', body)
      console.log(res.data)
      const itemToReplace = expenses.findIndex(item => item.id === body.id)
      const updatedExpenses = [...expenses].splice(itemToReplace, 1, res.data)
      setExpenses(updatedExpenses)
      cb(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [expenses])

  const onDeleteIncome = useCallback(async (id, cb) => {
    try {
      const res = await api.delete(`weekly/${id}`)
      const updatedIncome = income.filter(item => item.id !== id)
      setIncome(updatedIncome)
      cb(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [income])

  const onDeleteExpense = useCallback(async (id, cb) => {
    try {
      const res = await api.delete(`weekly/${id}`)
      const updatedExpenses = expenses.filter(item => item.id !== id)
      setExpenses(updatedExpenses)
      cb(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [expenses])

  useEffect(onFetchWeekly, [onFetchWeekly, currentWeekIndex])

  let totalIncome = 0
  let totalExpenses = 0

  for (const entry of income) {
    totalIncome += entry.amount
  }

  for (const entry of expenses) {
    totalExpenses += entry.amount
  }

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

  return (
    <div className={classes.Weekly}>
      <Progress
        leftColor='primary'
        leftAmount={totalIncome}
        rightColor='danger'
        rightAmount={totalExpenses} />
      <div className={classes.Main}>
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
        <Chart
          data={expenses}
          timePeriods={weekStringMap}
          previousTimePeriod={previousWeek}
          nextTimePeriod={nextWeek}
          selectTimePeriod={changeWeek}
          currentTimePeriod={weekStringMap[currentWeekIndex]} />
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
      </div>
      <Navbar active='w' />
    </div>
  )
}

export default Weekly
