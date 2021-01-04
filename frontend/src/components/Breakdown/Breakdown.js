import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Container from '../UI/Container/Container'
import BreakdownSummary from './BreakdownSummary/BreakdownSummary'
import BreakdownAddModal from './BreakdownAddModal/BreakdownAddModal'
import BreakdownSavingsAddModal from './BreakdownAddSavingsModal/BreakdownAddSavingsModal'
import BreakdownDetailModal from './BreakdownDetailModal/BreakdownDetailModal'

const Breakdown = props => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  const openAddModalHandler = () => {
    setShowAddModal(true)
  }

  const closeAddModalHandler = () => {
    setShowAddModal(false)
  }

  const openDetailModalHandler = id => {
    const selectedItem = props.content.filter(item => item.id === id)
    setCurrentItem(selectedItem[0])
    setShowDetailModal(true)
  }

  const closeDetailModalHandler = () => {
    setShowDetailModal(false)
  }

  const addItemHandler = item => {
    props.addItem(item, res => {
      console.log(res.data)
      setShowAddModal(false)
    })
  }

  const updateItemHandler = (id, updatedItem) => {
    props.updateItem(id, updatedItem, res => {
      console.log(res.data)
      setShowDetailModal(false)
    })
  }

  const deleteItemHandler = id => {
    props.deleteItem(id, res => {
      console.log(res.data)
      setShowDetailModal(false)
    })
  }

  let content = (
    <BreakdownSummary
      title={props.title}
      color={props.color}
      content={props.content}
      openDetailModal={id => openDetailModalHandler(id)}
      openAddModal={openAddModalHandler}
      canAdd={props.canAdd}
      isSavings={props.isSavings}
      buttonProgressPercent={props.buttonProgressPercent} />
  )

  if (showAddModal && props.isSavings) {
    content = (
      <BreakdownSavingsAddModal
        title={props.title}
        color={props.color}
        closeModal={closeAddModalHandler}
        onSubmit={addItemHandler}
        isIncome={props.isIncome} />
    )
  } else if (showAddModal) {
    content = (
      <BreakdownAddModal
        title={props.title}
        color={props.color}
        closeModal={closeAddModalHandler}
        onSubmit={addItemHandler}
        isIncome={props.isIncome} />
    )
  } else if (showDetailModal) {
    content = (
      <BreakdownDetailModal
        color={props.color}
        onCancel={closeDetailModalHandler}
        onSubmit={updatedItem => updateItemHandler(currentItem._id, updatedItem)}
        onDelete={() => deleteItemHandler(currentItem._id)}
        name={currentItem.name || currentItem.category}
        amount={currentItem.amount.toString()}
        description={currentItem.description} />
    )
  }

  return (
    <Container
      height={props.height || '100%'}
      width={props.width ? props.width : '33%'}>
      {content}
    </Container>
  )
}

Breakdown.propTypes = {
  color: PropTypes.string,
  isIncome: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  title: PropTypes.string,
  canAdd: PropTypes.bool,
  content: PropTypes.arrayOf(PropTypes.object),
  addItem: PropTypes.func,
  updateItem: PropTypes.func,
  deleteItem: PropTypes.func,
  isSavings: PropTypes.bool,
  buttonProgressPercent: PropTypes.number
}

export default Breakdown
