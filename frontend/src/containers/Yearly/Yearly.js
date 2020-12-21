import React from 'react'
import classes from './Yearly.module.css'
import GraphSummary from '../../components/GraphSummary/GraphSummary'
import Summary from '../../components/Summary/Summary'
import Navbar from '../../components/Navbar/Navbar'

const Yearly = props => {
  return (
    <div className={classes.Yearly}>
      <div className={classes.Main}>
        <GraphSummary year />
        <Summary color='primary' />
      </div>
      <Navbar active='y' />
    </div>
  )
}

export default Yearly
