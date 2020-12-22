import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './Summary.module.css'
import SummaryModal from '../SummaryModal/SummaryModal'
import Container from '../UI/Container/Container'
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

  let content = (
    <>
      <h1 className={props.color}>
        {props.title ? props.title : 'Types'}
      </h1>
      <div className={props.canAdd ? classes.Buttons : classes.FullButtons}>
        <Button
          color={props.color}
          size='thin'
          width='90%'
          secondary='$89.32'
          dual>
          Web Design
        </Button>
        <Button
          color={props.color}
          size='thin'
          width='90%'
          secondary='$50.00'
          dual>
          Video Team
        </Button>
        <Button
          color={props.color}
          size='thin'
          width='90%'
          secondary='$50.00'
          dual>
          Cirriculum
        </Button>
      </div>
      {addButton}
    </>
  )

  if (showModal) {
    content = (
      <SummaryModal color={props.color} clicked={closeModal} />
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
  height: PropTypes.string,
  width: PropTypes.string,
  title: PropTypes.string,
  canAdd: PropTypes.bool
}

export default Summary
