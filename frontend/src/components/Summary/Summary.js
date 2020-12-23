import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './Summary.module.css'
import SummaryModal from './SummaryModal/SummaryModal'
import Container from '../UI/Container/Container'
import SummaryHeading from './SummaryHeading/SummaryHeading'
import AddButton from '../UI/AddButton/AddButton'
import Button from '../UI/Button/Button'

const Summary = props => {
  const [showModal, setShowModal] = useState(false)

  let addButton = null

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  if (props.canAdd) {
    addButton = <AddButton color={props.color} clicked={openModal} />
  }

  const buttons = props.content.map(item => (
    <Button
      key={item.type}
      color={props.color}
      size='thin'
      width='90%'
      secondary={`$${item.amount.toFixed(2)}`}
      dual>
      {item.type}
    </Button>
  ))

  let content = (
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

  if (showModal) {
    content = (
      <SummaryModal
        color={props.color}
        closeModal={closeModal}
        isIncome={props.isIncome} />
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
