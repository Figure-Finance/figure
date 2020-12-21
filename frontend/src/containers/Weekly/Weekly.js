import React from 'react'
import classes from './Weekly.module.css'
import IncomeExpenseProgress from '../../components/IncomeExpenseProgress/IncomeExpenseProgress'
import Navbar from '../../components/Navbar/Navbar'
import Container from '../../components/UI/Container/Container'
import Button from '../../components/UI/Button/Button'
import Summary from '../../components/Summary/Summary'
import PieChart from '../../components/PieChart/PieChart'

const Weekly = props => {
  return (
    <div className={classes.Weekly}>
      <IncomeExpenseProgress />
      <div className={classes.Main}>
        <Summary color='primary' />
        <Container height='100%' width='33%'>
          <Button color='primary' size='large' width='90%'>
            Week 37
          </Button>
          <PieChart />
        </Container>
        <Summary color='danger' />
      </div>
      <Navbar active='w' />
    </div>
  )
}

export default Weekly
