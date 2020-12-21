import React from 'react'
import classes from './Yearly.module.css'
import Graph from '../../components/Graph/Graph'
import Summary from '../../components/Summary/Summary'
import Navbar from '../../components/Navbar/Navbar'

const Yearly = props => {
  return (
    <div className={classes.Yearly}>
      <div className={classes.Main}>
        <Graph title='2021' />
        <Summary color='primary' />
      </div>
      <Navbar active='y' />
    </div>
  )
}

export default Yearly
