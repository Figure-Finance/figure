import React from 'react'
import PropTypes from 'prop-types'
import classes from './TypeSummary.module.css'
import Button from '../../UI/Button/Button'
import AddButton from '../../UI/AddButton/AddButton'

const TypeSummary = props => {
  const buttons = props.content.map(item => {
    return (
      <Button
        key={item.id}
        onClick={() => props.openDetailModal(item.id)}
        color={props.color}
        size='thin'
        width='100%'>
        {item.category}
      </Button>
    )
  })

  return (
    <div className={classes.TypeSummary}>
      <div className={classes.Buttons}>
        {buttons}
      </div>
      <div className={classes.Add}>
        <AddButton
          color={props.color}
          onClick={props.openAddModal} />
      </div>
    </div>
  )
}

TypeSummary.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object),
  color: PropTypes.string,
  openDetailModal: PropTypes.func,
  openAddModal: PropTypes.func
}

export default TypeSummary
