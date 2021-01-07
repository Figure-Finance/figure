import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import Container from '../UI/Container/Container'
import BreakdownSummary from './BreakdownSummary/BreakdownSummary'
import BreakdownAddModal from './BreakdownAddModal/BreakdownAddModal'
import BreakdownSavingsAddModal from './BreakdownAddSavingsModal/BreakdownAddSavingsModal'
import BreakdownDetailModal from './BreakdownDetailModal/BreakdownDetailModal'
import BreakdownDetailSavingsModal from './BreakdownDetailSavingsModal/BreakdownDetailSavingsModal'

const Breakdown = props => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  const openAddModalHandler = useCallback(() => {
    setShowAddModal(true)
  }, [])

  const closeAddModalHandler = useCallback(() => {
    setShowAddModal(false)
  }, [])

  const { getItem, addItem, updateItem, deleteItem, allocateSavings } = props

  const getItemHandler = useCallback(id => {
    getItem(id, data => {
      setCurrentItem(data)
    })
  }, [getItem])

  const addItemHandler = useCallback(item => {
    addItem(item, data => {
      setShowAddModal(false)
    })
  }, [addItem])

  const updateItemHandler = useCallback((id, updatedItem) => {
    const body = {
      id,
      ...updatedItem
    }
    updateItem(body, data => {
      setShowDetailModal(false)
    })
  }, [updateItem])

  const deleteItemHandler = useCallback(id => {
    deleteItem(id, data => {
      setShowDetailModal(false)
    })
  }, [deleteItem])

  const openDetailModalHandler = useCallback(id => {
    const selectedItem = props.content.filter(item => item.id === id)
    setCurrentItem(selectedItem[0])
    getItemHandler(id)
    setShowDetailModal(true)
  }, [getItemHandler, props.content])

  const closeDetailModalHandler = useCallback(() => {
    setShowDetailModal(false)
  }, [])

  const allocateHandler = useCallback((id, amount) => {
    allocateSavings(id, amount, data => {
      setShowDetailModal(false)
    })
  }, [allocateSavings])

  let content = (
    <BreakdownSummary
      title={props.title}
      color={props.color}
      content={props.content}
      openDetailModal={id => openDetailModalHandler(id)}
      openAddModal={openAddModalHandler}
      canAdd={props.canAdd}
      showButtons={props.showButtons}
      isSavings={props.isSavings} />
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
  } else if (showDetailModal && props.isSavings) {
    content = (
      <BreakdownDetailSavingsModal
        color={props.color}
        onCancel={closeDetailModalHandler}
        onAllocate={amount => allocateHandler(currentItem.id, amount)}
        onSubmit={updatedItem => updateItemHandler(currentItem.id, updatedItem)}
        onDelete={() => deleteItemHandler(currentItem.id)}
        name={currentItem.name}
        amount={currentItem.amount.toString()}
        description={currentItem.description} />
    )
  } else if (showDetailModal) {
    content = (
      <BreakdownDetailModal
        color={props.color}
        onCancel={closeDetailModalHandler}
        onSubmit={updatedItem => updateItemHandler(currentItem.id, updatedItem)}
        onDelete={() => deleteItemHandler(currentItem.id)}
        type={currentItem.category}
        amount={currentItem.amount.toString()}
        description={currentItem.description}
        location={currentItem.location}
        date={currentItem.date} />
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
  getItem: PropTypes.func,
  addItem: PropTypes.func,
  updateItem: PropTypes.func,
  deleteItem: PropTypes.func,
  isSavings: PropTypes.bool,
  allocateSavings: PropTypes.func,
  showButtons: PropTypes.bool
}

export default Breakdown
