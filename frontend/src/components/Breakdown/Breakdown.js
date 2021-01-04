import React, { useState, useCallback } from 'react'
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

  const openAddModalHandler = useCallback(() => {
    setShowAddModal(true)
  }, [])

  const closeAddModalHandler = useCallback(() => {
    setShowAddModal(false)
  }, [])

  const { getItem, addItem, updateItem, deleteItem } = props

  const getItemHandler = useCallback(id => {
    getItem(id, res => {
      setCurrentItem(res.data)
    })
  }, [getItem])

  const addItemHandler = useCallback(item => {
    addItem(item, res => {
      console.log(res.data)
      setShowAddModal(false)
    })
  }, [addItem])

  const updateItemHandler = useCallback((id, updatedItem) => {
    updateItem(id, updatedItem, res => {
      console.log(res.data)
      setShowDetailModal(false)
    })
  }, [updateItem])

  const deleteItemHandler = useCallback(id => {
    deleteItem(id, res => {
      // console.log(res.data)
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
  buttonProgressPercent: PropTypes.number
}

export default Breakdown
