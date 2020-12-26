import React from 'react'
import PropTypes from 'prop-types'
import classes from './GraphSummary.module.css'
import Graph from './Graph/Graph'
import GraphSummaryTitle from './GraphSummaryTitle/GraphSummaryTitle'
import NavbarSavings from '../../NavbarSavings/NavbarSavings'

const GraphSummary = props => {
  let title = null
  let nav = null

  if (props.showYearly) {
    title = (
      <GraphSummaryTitle
        openModal={props.openModal}
        buttonContent={props.buttonContent}
        decrementNumber={props.decrementNumber}
        incrementNumber={props.incrementNumber} />
    )
  }

  if (!props.showYearly) {
    nav = (
      <NavbarSavings active='1w' />
    )
  }

  return (
    <div className={classes.GraphSummary}>
      {title}
      <Graph isSavings={props.isSavings} />
      {nav}
    </div>
  )
}

GraphSummary.propTypes = {
  showYearly: PropTypes.bool,
  isSavings: PropTypes.bool,
  openModal: PropTypes.func,
  buttonContent: PropTypes.string,
  decrementNumber: PropTypes.func,
  incrementNumber: PropTypes.func
}

export default GraphSummary
