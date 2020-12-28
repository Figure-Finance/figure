import React, { useState, useEffect, useCallback } from 'react'
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
  const today = startOfToday()
  const lastYear = subYears(today, 1)
  const months = eachMonthOfInterval({ start: lastYear, end: today })
  const monthStringMap = months.map(day => format(day, 'MMM. yyy').toString())

  const [monthlyItems, setMonthlyItems] = useState([])
  const [currentMonthIndex, setCurrentMonthIndex] = useState(monthStringMap.length - 1)

  const onFetchMonthly = useCallback(async () => {
    const startDate = months[currentMonthIndex]
    const endDate = endOfMonth(startDate)
    const res = await api.get(`monthly/${startDate}/${endDate}`)
    console.log(res)
    try {
      setMonthlyItems(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [currentMonthIndex])

  useEffect(onFetchMonthly, [onFetchMonthly])

  const income = []
  const expenses = []

  for (const item of monthlyItems) {
    if (item.isIncome) {
      income.push(item)
    } else {
      expenses.push(item)
    }
  }

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
