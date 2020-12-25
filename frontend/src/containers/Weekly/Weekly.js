import React, { useEffect, useCallback } from 'react'
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

  // const onAddIncome = useCallback(() => {
  //   api.get('weekly').then(res => {
  //     console.log(res.data)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }, [])

  // const onUpdateIncome = useCallback(body => {
  //   api.patch('weekly', body).then(res => {
  //     console.log(res.data)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }, [])

  // const onDeleteIncome = useCallback(body => {
  //   api.delete('weekly', body).then(res => {
  //     console.log(res.data)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }, [])

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
          color='primary'
          canAdd />
        <Chart title='Week' data={expenses} />
        <Breakdown
          title='Expenses'
          content={expenses}
          color='danger'
          canAdd />
      </div>
      <Navbar active='w' />
    </div>
  )
}

export default Weekly
