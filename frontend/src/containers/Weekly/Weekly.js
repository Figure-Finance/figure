import React, { useState, useEffect, useCallback } from 'react'
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
  const today = startOfToday()
  const lastYear = subYears(today, 1)
  const weeks = eachWeekOfInterval({ start: lastYear, end: today })
  const weeksStringMap = weeks.map(day => {
    return `${format(day, 'MMM. dd')} - ${format(endOfWeek(day), 'MMM. dd')}`
  })

  const [weeklyItems, setWeeklyItems] = useState([])
  const [currentWeekIndex, setCurrentWeekIndex] = useState(weeksStringMap.length - 1)

  const onFetchWeekly = useCallback(() => {
    const startDate = weeks[currentWeekIndex]
    const endDate = endOfWeek(startDate)
    api.get(`weekly/${startDate}/${endDate}`).then(res => {
      setWeeklyItems(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const onAddIncome = useCallback((body, cb) => {
    api.post('weekly', {
      ...body,
      isIncome: true
    }).then(res => {
      console.log(res.data)
      cb(res)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const onUpdateIncome = useCallback(body => {
    api.patch('weekly', body).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const onDeleteIncome = useCallback(() => {
    api.delete('weekly').then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const onAddExpense = useCallback((body, cb) => {
    api.post('weekly', {
      ...body,
      isIncome: false
    }).then(res => {
      console.log(res.data)
      cb(res)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  useEffect(onFetchWeekly, [onFetchWeekly])

  const income = []
  const expenses = []

  for (const item of weeklyItems) {
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

  const changeWeek = event => {
    const index = weeksStringMap.findIndex(el => el === event.target.innerHTML)
    setCurrentWeekIndex(index)
    // setShowModal(false)
  }

  const previousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1)
    }
  }

  const nextWeek = () => {
    if (currentWeekIndex < weeksStringMap.length - 1) {
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
          title='Week'
          data={expenses}
          previousTimePeriod={previousWeek}
          nextTimePeriod={nextWeek}
          selectTimePeriod={changeWeek}
          currentTimePeriod={weeksStringMap[currentWeekIndex]} />
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
