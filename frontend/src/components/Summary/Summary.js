import React from 'react'
import PropTypes from 'prop-types'
import classes from './Summary.module.css'
import Container from '../UI/Container/Container'
import AddButton from '../UI/AddButton/AddButton'
import Button from '../UI/Button/Button'

const Summary = props => {
  let addButton = null

  if (props.canAdd) {
    addButton = <AddButton color={props.color} />
  }

  return (
    <Container
      height={props.height || '100%'}
      width={props.width ? props.width : '33%'}>
      <div className={classes.Summary}>
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
