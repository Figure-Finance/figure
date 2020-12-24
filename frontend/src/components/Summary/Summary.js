import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './Summary.module.css'
import SummaryAddModal from './SummaryAddModal/SummaryAddModal'
import Container from '../UI/Container/Container'
import SummaryHeading from './SummaryHeading/SummaryHeading'
import SummaryDetailModal from './SummaryDetailModal/SummaryDetailModal'
import AddButton from '../UI/AddButton/AddButton'
import Button from '../UI/Button/Button'

const Summary = props => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  let addButton = null
  let content = null

  const openAddModal = () => {
    setShowAddModal(true)
  }

  const closeAddModal = () => {
    setShowAddModal(false)
  }

  const closeDetailModal = () => {
    setShowDetailModal(false)
  }

  const updateItem = () => {
    console.log('updated!')
    setShowDetailModal(false)
  }

  const openDetailModal = id => {
    setShowDetailModal(true)
    const selectedItem = props.content.filter(item => item._id === id)
    setCurrentItem(selectedItem[0])
  }

  if (props.canAdd) {
    addButton = <AddButton color={props.color} clicked={openAddModal} />
  }

  const buttons = props.content.map(item => (
    <Button
      key={item._id}
      color={props.color}
      clicked={() => openDetailModal(item._id)}
      size='thin'
      width='90%'
      secondary={`$${item.amount.toFixed(2)}`}
      dual>
      {item.name}
    </Button>
  ))

  if (!showDetailModal) {
    content = (
      <>
        <SummaryHeading color={props.color}>
          {props.title}
        </SummaryHeading>
        <div className={props.canAdd ? classes.Buttons : classes.FullButtons}>
          {buttons}
        </div>
        {addButton}
      </>
    )
  } else if (showAddModal) {
    content = (
      <SummaryAddModal
        color={props.color}
        closeModal={closeAddModal}
        isIncome={props.isIncome} />
    )
  } else if (showDetailModal) {
    content = (
      <SummaryDetailModal
        onCancel={closeDetailModal}
        onSuccess={updateItem}
        name={currentItem.name}
        amount={currentItem.amount.toString()}
        description={currentItem.description} />
    )
  }

  return (
    <Container
      height={props.height || '100%'}
      width={props.width ? props.width : '33%'}>
      <div className={classes.Summary}>
        {content}
      </div>
    </Container>
  )
}

Summary.propTypes = {
  color: PropTypes.string,
  isIncome: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  title: PropTypes.string,
  canAdd: PropTypes.bool,
  content: PropTypes.arrayOf(PropTypes.object)
}

export default Summary
