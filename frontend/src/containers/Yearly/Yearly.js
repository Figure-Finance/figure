import React, { useState, useEffect, useCallback } from 'react'
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

const Yearly = props => {
  const today = startOfToday()
  const tenYearsAgo = subYears(today, 10)
  const years = eachYearOfInterval({ start: tenYearsAgo, end: today })
  const yearStringMap = years.map(day => format(day, 'yyy').toString())

  const [yearlyItems, setYearlyItems] = useState([])
  const [currentYearIndex, setCurrentYearIndex] = useState(yearStringMap.length - 1)

  const onFetchYearly = useCallback(async () => {
    const startDate = years[currentYearIndex]
    const endDate = endOfYear(startDate)
    try {
      const res = await api.get(`monthly/${startDate}/${endDate}`)
      setYearlyItems(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [currentYearIndex])

  useEffect(onFetchYearly, [onFetchYearly])

  const income = []
  const expenses = []

  for (const item of yearlyItems) {
    if (item.isIncome) {
      income.push(item)
    } else {
      expenses.push(item)
    }
  }

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

  return (
    <div className={classes.Yearly}>
      <div className={classes.Main}>
        <Graph
          data={expenses}
          timePeriods={yearStringMap}
          previousTimePeriod={previousYear}
          nextTimePeriod={nextYear}
          selectTimePeriod={changeYear}
          currentTimePeriod={yearStringMap[currentYearIndex]} />
        <div className={classes.Summaries}>
          <Breakdown
            content={income}
            color='primary'
            height='49%'
            width='100%' />
          <Breakdown
            content={expenses}
            color='danger'
            height='49%'
            width='100%' />
        </div>
      </div>
      <Navbar active='y' />
    </div>
  )
}

export default Yearly
