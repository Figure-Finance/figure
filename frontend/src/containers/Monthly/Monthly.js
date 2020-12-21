import React from 'react'
import classes from './Monthly.module.css'
import IncomeExpenseProgress from '../../components/IncomeExpenseProgress/IncomeExpenseProgress'
import Navbar from '../../components/Navbar/Navbar'
import Container from '../../components/UI/Container/Container'
import Summary from '../../components/Summary/Summary'

const Monthly = props => {
  return (
    <div className={classes.Monthly}>
      <IncomeExpenseProgress />
      <div className={classes.Main}>
        <Summary color='primary' />
        <Container height='100%' width='33%' />
        <Summary color='danger' />
      </div>
      <Navbar active='m' />
    </div>
  )
}

export default Monthly
