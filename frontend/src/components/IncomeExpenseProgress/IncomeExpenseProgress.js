import React from 'react'
import classes from './IncomeExpenseProgress.module.css'
import Container from '../UI/Container/Container'
import ProgressBar from '../ProgressBar/ProgressBar'

const IncomeExpenseProgress = props => {
  return (
    <div className={classes.IncomeExpenseProgress}>
      <Container height='100px' width='98%'>
        <ProgressBar />
      </Container>
    </div>
  )
}

export default IncomeExpenseProgress
