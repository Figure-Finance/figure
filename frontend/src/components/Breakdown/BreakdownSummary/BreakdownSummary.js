import React from 'react'
import PropTypes from 'prop-types'
import classes from './BreakdownSummary.module.css'
import BreakdownSummaryHeading from './BreakdownSummaryHeading/BreakdownSummaryHeading'
import AddButton from '../../UI/AddButton/AddButton'
import Button from '../../UI/Button/Button'

const BreakdownSummary = ({
  title, color, canAdd, content, openAddModal, openDetailModal, isSavings, showButtons
}) => {
  let addButton = null

  if (canAdd) {
    addButton = (
      <AddButton
        color={color}
        onClick={openAddModal} />
    )
  }

  let buttons

  if (showButtons) {
    buttons = content.map(item => {
      return (
        <Button
          key={item.id}
          onClick={() => openDetailModal(item.id)}
          color={color}
          size='thin'
          width='90%'
          showProgress={isSavings}
          progressPercent={item.progress / item.amount * 100}
          secondary={`$${item.amount.toFixed(2)}`}
          dual>
          {item.name || item.category}
        </Button>
      )
    })
  } else {
    buttons = content.map(item => {
      let colorClass = classes.Primary
      if (color === 'danger') {
        colorClass = classes.Danger
      }
      return (
        <div key={item.id} className={`${classes.Item} ${colorClass}`}>
          <h2 className={color}>
            {item.category}
          </h2>
          <h2 className={color}>
            ${item.amount.toFixed(2)}
          </h2>
        </div>
      )
    })
  }

  if (content.length === 0) {
    buttons = (
      <h2 className={color}>No Data</h2>
    )
  }

  return (
    <div className={classes.BreakdownSummary}>
      <BreakdownSummaryHeading color={color}>
        {title}
      </BreakdownSummaryHeading>
      <div className={canAdd ? classes.Buttons : classes.FullButtons}>
        {buttons}
      </div>
      {addButton}
    </div>
  )
}

BreakdownSummary.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  canAdd: PropTypes.bool,
  content: PropTypes.arrayOf(PropTypes.object),
  openAddModal: PropTypes.func,
  openDetailModal: PropTypes.func,
  isSavings: PropTypes.bool,
  showButtons: PropTypes.bool
}

export default BreakdownSummary
