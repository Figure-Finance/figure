import React from 'react'
import PropTypes from 'prop-types'
import classes from './BreakdownSummary.module.css'
import BreakdownSummaryHeading from './BreakdownSummaryHeading/BreakdownSummaryHeading'
import AddButton from '../../UI/AddButton/AddButton'
import Button from '../../UI/Button/Button'

const BreakdownSummary = props => {
  let addButton = null

  // const addItemHandler = () => {
  //   props.addItem(res => {
  //     console.log(res.data)
  //   })
  // }
  //
  // const updateItemHandler = (id, updatedItem) => {
  //   props.updateItem(id, updatedItem, res => {
  //     console.log(res.data)
  //   })
  // }
  //
  // const deleteItemHandler = id => {
  //   props.deleteItem(id, res => {
  //     console.log(res.data)
  //   })
  // }

  if (props.canAdd) {
    addButton = (
      <AddButton
        color={props.color}
        onClick={props.openAddModal} />
    )
  }

  const buttons = props.content.map(item => (
    <Button
      key={item.name || item.category}
      onClick={() => props.openDetailModal(item._id)}
      color={props.color}
      size='thin'
      width='90%'
      secondary={`$${item.amount.toFixed(2)}`}
      dual>
      {item.name || item.category}
    </Button>
  ))

  return (
    <div className={classes.BreakdownSummary}>
      <BreakdownSummaryHeading color={props.color}>
        {props.title}
      </BreakdownSummaryHeading>
      <div className={props.canAdd ? classes.Buttons : classes.FullButtons}>
        {buttons}
      </div>
      {addButton}
    </div>
  )
}

BreakdownSummary.propTypes = {
  color: PropTypes.string,
  isIncome: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  title: PropTypes.string,
  canAdd: PropTypes.bool,
  content: PropTypes.arrayOf(PropTypes.object),
  openAddModal: PropTypes.func,
  openDetailModal: PropTypes.func
}

export default BreakdownSummary
