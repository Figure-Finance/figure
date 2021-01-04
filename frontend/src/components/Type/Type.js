import React from 'react'
import PropTypes from 'prop-types'
import classes from './Type.module.css'
import Container from '../UI/Container/Container'
import Button from '../UI/Button/Button'
import AddButton from '../UI/AddButton/AddButton'

const Type = props => {
  const buttons = props.content.map(item => {
    return (
      <Button
        key={item}
        onClick={() => props.openDetailModal(item)}
        color={props.color}
        size='thin'
        width='90%'>
        {item}
      </Button>
    )
  })

  return (
    <Container
      height='100%'
      width='33%'>
      <div className={classes.Type}>
        <div className={classes.Buttons}>
          {buttons}
        </div>
        <div className={classes.Add}>
          <AddButton color={props.color} />
        </div>
      </div>
    </Container>
  )
}

Type.propTypes = {
  content: PropTypes.arrayOf(PropTypes.string),
  color: PropTypes.string,
  openDetailModal: PropTypes.func
}

export default Type
