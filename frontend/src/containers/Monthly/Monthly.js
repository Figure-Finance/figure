import React, { useState, useEffect, useCallback, useMemo } from 'react'
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

const Monthly = props => {
  const today = useMemo(() => startOfToday(), [])
  const lastYear = useMemo(() => subYears(today, 1), [today])
  const months = useMemo(
    () => eachMonthOfInterval({ start: lastYear, end: today }), [lastYear, today]
  )
  const monthStringMap = useMemo(
    () => months.map(day => format(day, 'MMM. yyy').toString()), [months]
  )

  const [income, setIncome] = useState([])
  const [expenses, setExpenses] = useState([])
  const [currentMonthIndex, setCurrentMonthIndex] = useState(monthStringMap.length - 1)

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

  const onFetchMonthly = useCallback(async () => {
    const startDate = months[currentMonthIndex]
    const endDate = endOfMonth(startDate)
    const res = await api.get(`monthly/${startDate}/${endDate}`)
    try {
      updateIncomeExpenses(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [currentMonthIndex, months])

  useEffect(onFetchMonthly, [onFetchMonthly, currentMonthIndex])

  let totalIncome = 0
  let totalExpenses = 0

  for (const entry of income) {
    totalIncome += entry.amount
  }

  for (const entry of expenses) {
    totalExpenses += entry.amount
  }

  const changeMonth = event => {
    const index = monthStringMap.findIndex(el => el === event.target.innerHTML)
    setCurrentMonthIndex(index)
  }

  const previousMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonthIndex < monthStringMap.length - 1) {
      setCurrentMonthIndex(currentMonthIndex + 1)
    }
  }

  return (
    <div className={classes.Monthly}>
      <Progress
        leftColor='primary'
        leftAmount={totalIncome}
        rightColor='danger'
        rightAmount={totalExpenses} />
      <div className={classes.Main}>
        <Breakdown
          title='Income'
          content={income}
          color='primary' />
        <Chart
          data={expenses}
          timePeriods={monthStringMap}
          previousTimePeriod={previousMonth}
          nextTimePeriod={nextMonth}
          selectTimePeriod={changeMonth}
          currentTimePeriod={monthStringMap[currentMonthIndex]} />
        <Breakdown
          title='Expenses'
          content={expenses}
          color='danger' />
      </div>
      <Navbar active='m' />
    </div>
  )
}

export default Monthly
