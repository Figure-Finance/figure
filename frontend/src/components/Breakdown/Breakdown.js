import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import Container from '../UI/Container/Container'
import BreakdownSummary from './BreakdownSummary/BreakdownSummary'
import BreakdownAddModal from './BreakdownAddModal/BreakdownAddModal'
import BreakdownAddSavingsModal from './BreakdownAddSavingsModal/BreakdownAddSavingsModal'
import BreakdownDetailModal from './BreakdownDetailModal/BreakdownDetailModal'
import BreakdownDetailSavingsModal from './BreakdownDetailSavingsModal/BreakdownDetailSavingsModal'

const Breakdown = ({
  color,
  isIncome,
  height,
  width,
  title,
  canAdd,
  content,
  getItem,
  addItem,
  updateItem,
  deleteItem,
  isSavings,
  allocateSavings,
  showButtons,
}) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  const openAddModalHandler = useCallback(() => {
    setShowAddModal(true)
  }, [])

  const closeAddModalHandler = useCallback(() => {
    setShowAddModal(false)
  }, [])

  const getItemHandler = useCallback(
    (id) => {
      getItem(id, (data) => {
        setCurrentItem(data)
      })
    },
    [getItem]
  )

  const openDetailModalHandler = useCallback(
    (id) => {
      const selectedItem = content.filter((item) => item.id === id)
      console.log('selectedItem', selectedItem)
      setCurrentItem(selectedItem[0])
      getItemHandler(id)
      console.log('currentItem', currentItem)
      setShowDetailModal(true)
    },
    [getItemHandler, content, currentItem]
  )

  const closeDetailModalHandler = useCallback(() => {
    setShowDetailModal(false)
  }, [])

  let modal = (
    <BreakdownSummary
      title={title}
      color={color}
      content={content}
      openDetailModal={(id) => openDetailModalHandler(id)}
      openAddModal={openAddModalHandler}
      canAdd={canAdd}
      showButtons={showButtons}
      isSavings={isSavings}
    />
  )

  if (showAddModal && isSavings) {
    modal = (
      <BreakdownAddSavingsModal
        title={title}
        color={color}
        onClose={closeAddModalHandler}
        onAdd={addItem}
      />
    )
  } else if (showAddModal) {
    modal = (
      <BreakdownAddModal
        title={title}
        color={color}
        onClose={closeAddModalHandler}
        onAdd={addItem}
      />
    )
  } else if (showDetailModal && isSavings) {
    modal = (
      <BreakdownDetailSavingsModal
        color={color}
        onClose={closeDetailModalHandler}
        onAllocate={allocateSavings}
        onSubmit={updateItem}
        onDelete={deleteItem}
        item={currentItem}
      />
    )
  } else if (showDetailModal) {
    modal = (
      <BreakdownDetailModal
        color={color}
        onUpdate={updateItem}
        onDelete={deleteItem}
        onClose={closeDetailModalHandler}
        item={currentItem}
      />
    )
  }

  return (
    <Container height={height || '100%'} width={width || '33%'}>
      {modal}
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
  showButtons: PropTypes.bool,
}

export default Breakdown
