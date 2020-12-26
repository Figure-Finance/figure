import React from 'react'
import PropTypes from 'prop-types'
import classes from './GraphSummary.module.css'
import Graph from './Graph/Graph'
import GraphSummaryTitle from './GraphSummaryTitle/GraphSummaryTitle'
import Navbar from '../../Navbar/Navbar'

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
      <Navbar
        onNavSavingsChange={props.onNavSavingsChange}
        active={props.active}
        isSavings />
    )
  }

  return (
    <div className={classes.GraphSummary}>
      {title}
      <Graph
        active={props.active}
        isSavings={props.isSavings} />
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
  incrementNumber: PropTypes.func,
  onNavSavingsChange: PropTypes.func,
  active: PropTypes.string
}

export default GraphSummary
