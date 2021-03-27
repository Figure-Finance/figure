import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import Container from '../UI/Container/Container'
import TypeSummary from './TypeSummary/TypeSummary'
import TypeAddModal from './TypeAddModal/TypeAddModal'
import TypeDetailModal from './TypeDetailModal/TypeDetailModal'

const Type = ({ color, content, addType, deleteType }) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  const openAddModalHandler = useCallback(() => {
    setShowAddModal(true)
  }, [])

  const closeAddModalHandler = useCallback(() => {
    setShowAddModal(false)
  }, [])

  const openDetailModalHandler = useCallback(
    (id) => {
      const selectedItem = content.filter((item) => item.id === id)
      setCurrentItem(selectedItem[0])
      setShowDetailModal(true)
    },
    [content]
  )

  const closeDetailModalHandler = useCallback(() => {
    setShowDetailModal(false)
  }, [])

  let modal = (
    <TypeSummary
      color={color}
      content={content}
      openDetailModal={(id) => openDetailModalHandler(id)}
      openAddModal={openAddModalHandler}
    />
  )

  if (showAddModal) {
    modal = (
      <TypeAddModal
        color={color}
        onClose={closeAddModalHandler}
        onAdd={addType}
      />
    )
  } else if (showDetailModal) {
    modal = (
      <TypeDetailModal
        type={currentItem}
        color={color}
        onClose={closeDetailModalHandler}
        onDelete={deleteType}
      />
    )
  }

  return (
    <Container height="100%" width="33%">
      {modal}
    </Container>
  )
}

Type.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object),
  color: PropTypes.string,
  addType: PropTypes.func,
  deleteType: PropTypes.func,
}

export default Type
