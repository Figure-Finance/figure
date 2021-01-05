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

  const { addGoal, deleteGoal } = props

  const addGoalHandler = useCallback(goal => {
    addGoal(goal, res => {
      setShowAddModal(false)
    })
  }, [addGoal])

  const deleteGoalHandler = useCallback(id => {
    deleteGoal(id, res => {
      setShowDetailModal(false)
    })
  }, [deleteGoal])

  let content = (
    <TypeSummary
      color={props.color}
      content={props.content}
      openDetailModal={() => openDetailModalHandler(currentItem.id)}
      openAddModal={openAddModalHandler} />
  )

  if (showAddModal) {
    content = (
      <TypeAddModal
        color={props.color}
        closeModal={closeAddModalHandler}
        onSubmit={addGoalHandler} />
    )
  } else if (showDetailModal) {
    content = (
      <TypeDetailModal
        color={props.color}
        onDelete={() => deleteGoalHandler(currentItem.id)}
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
  content: PropTypes.arrayOf(PropTypes.string),
  color: PropTypes.string,
  addGoal: PropTypes.func,
  deleteGoal: PropTypes.func
}

export default Type
