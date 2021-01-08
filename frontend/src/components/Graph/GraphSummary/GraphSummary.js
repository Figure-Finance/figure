import React from 'react'
import PropTypes from 'prop-types'
import classes from './GraphSummary.module.css'
import Graph from './Graph/Graph'
import GraphSummaryTitle from './GraphSummaryTitle/GraphSummaryTitle'
import Navbar from '../../Navbar/Navbar'

const GraphSummary = ({
  showYearly,
  isSavings,
  openModal,
  buttonContent,
  decrementNumber,
  incrementNumber,
  onNavSavingsChange,
  active,
  labels,
  data
}) => {
  let title = null
  let nav = null

  if (showYearly) {
    title = (
      <GraphSummaryTitle
        openModal={openModal}
        buttonContent={buttonContent}
        decrementNumber={decrementNumber}
        incrementNumber={incrementNumber} />
    )
  }

  if (!showYearly) {
    nav = (
      <Navbar
        onNavSavingsChange={onNavSavingsChange}
        active={active}
        isSavings />
    )
  }

  return (
    <div className={classes.GraphSummary}>
      {title}
      <Graph
        active={active}
        isSavings={isSavings}
        labels={labels}
        data={data} />
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
  active: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.object
}

export default GraphSummary
