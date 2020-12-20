import React from 'react'
import IncomeExpenseProgress from '../../components/IncomeExpenseProgress/IncomeExpenseProgress'
import Navbar from '../../components/Navbar/Navbar'

const Weekly = props => {
  return (
    <div>
      <IncomeExpenseProgress />
      <Navbar active='w' />
    </div>
  )
}

export default Weekly
