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
  console.log('MOUNTED')

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

  const onAddIncome = useCallback(async (body, cb) => {
    try {
      const res = await api.post('weekly', {
        ...body,
        isIncome: true
      })
      console.log(res.data)
      cb(res)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const onUpdateIncome = useCallback(async body => {
    try {
      const res = await api.patch('weekly', body)
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const onDeleteIncome = useCallback(async () => {
    try {
      const res = await api.delete('weekly')
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const onAddExpense = useCallback(async (body, cb) => {
    try {
      const res = await api.post('weekly', {
        ...body,
        isIncome: false
      })
      console.log(res.data)
      cb(res)
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(onFetchWeekly, [onFetchWeekly, currentWeekIndex])

  let totalIncome = 0
  let totalExpenses = 0

  for (const entry of income) {
    totalIncome += entry.amount
  }

  for (const entry of expenses) {
    totalExpenses += entry.amount
  }

  const changeWeek = event => {
    const index = weekStringMap.findIndex(el => el === event.target.innerHTML)
    setCurrentWeekIndex(index)
  }

  const previousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1)
    }
  }

  const nextWeek = () => {
    if (currentWeekIndex < weekStringMap.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1)
    }
  }

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
          addItem={onAddIncome}
          updateItem={onUpdateIncome}
          deleteItem={onDeleteIncome}
          color='primary'
          canAdd />
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
          addItem={onAddExpense}
          updateItem={onUpdateIncome}
          deleteItem={onDeleteIncome}
          color='danger'
          canAdd />
      </div>
      <Navbar active='w' />
    </div>
  )
}

export default Weekly
