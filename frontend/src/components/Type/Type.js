import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import Container from '../UI/Container/Container'
import TypeSummary from './TypeSummary/TypeSummary'
import TypeAddModal from './TypeAddModal/TypeAddModal'
import TypeDetailModal from './TypeDetailModal/TypeDetailModal'

const Type = props => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  const openAddModalHandler = useCallback(() => {
    setShowAddModal(true)
  }, [])

  const closeAddModalHandler = useCallback(() => {
    setShowAddModal(false)
  }, [])

  const openDetailModalHandler = useCallback(id => {
    const selectedItem = props.content.filter(item => item.id === id)
    setCurrentItem(selectedItem[0])
    setShowDetailModal(true)
  }, [props.content])

  const closeDetailModalHandler = useCallback(() => {
    setShowDetailModal(false)
  }, [])

  const { addType, deleteType } = props

  const addTypeHandler = useCallback(goal => {
    addType(goal, data => {
      setShowAddModal(false)
    })
  }, [addType])

  const deleteTypeHandler = useCallback(id => {
    deleteType(id, data => {
      setShowDetailModal(false)
    })
  }, [deleteType])

  let content = (
    <TypeSummary
      color={props.color}
      content={props.content}
      openDetailModal={id => openDetailModalHandler(id)}
      openAddModal={openAddModalHandler} />
  )

  if (showAddModal) {
    content = (
      <TypeAddModal
        color={props.color}
        closeModal={closeAddModalHandler}
        onSubmit={addTypeHandler} />
    )
  } else if (showDetailModal) {
    content = (
      <TypeDetailModal
        color={props.color}
        onDelete={() => deleteTypeHandler(currentItem.id)}
        closeModal={closeDetailModalHandler} />
    )
  }

  return (
    <Container
      height='100%'
      width='33%'>
      {content}
    </Container>
  )
}

Type.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object),
  color: PropTypes.string,
  addType: PropTypes.func,
  deleteType: PropTypes.func
}

export default Type
