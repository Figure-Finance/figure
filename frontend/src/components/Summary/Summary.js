import React from 'react'
import PropTypes from 'prop-types'
import classes from './Summary.module.css'
import Container from '../UI/Container/Container'
import Button from '../UI/Button/Button'

const Summary = props => {
  return (
    <Container
      height={props.height || '100%'}
      width={props.width ? props.width : '33%'}>
      <div className={classes.Summary}>
        <h1 className={props.color}>
          {props.title ? props.title : 'Types'}
        </h1>
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
    </Container>
  )
}

Summary.propTypes = {
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  title: PropTypes.string
}

export default Summary
