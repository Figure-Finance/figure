import React, { useEffect, useCallback } from 'react'
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
  const onFetchWeekly = useCallback(() => {
    api.get('weekly').then(res => {
      console.log(res.data)
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

  const income = [
    {
      name: 'Web Design',
      amount: 84.92
    },
    {
      name: 'Video Team',
      amount: 50.00
    },
    {
      name: 'Curriculum',
      amount: 50.00
    }
  ]

  const expenses = [
    {
      name: 'Groceries',
      amount: 35.84
    },
    {
      name: 'Gas',
      amount: 40.00
    },
    {
      name: 'Eating Out',
      amount: 18.49
    },
    {
      name: 'Misc',
      amount: 20.00
    }
  ]

  let totalIncome = 0
  let totalExpenses = 0

  for (const entry of income) {
    totalIncome += entry.amount
  }

  for (const entry of expenses) {
    totalExpenses += entry.amount
  }

  const today = startOfToday()
  const lastYear = subYears(today, 1)
  const weeks = eachWeekOfInterval({ start: lastYear, end: today })
  const weeksStringMap = weeks.map(day => {
    return `${format(day, 'MMM. dd')} - ${format(endOfWeek(day), 'MMM. dd')}`
  })

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
          timePeriods={weeksStringMap} />
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
