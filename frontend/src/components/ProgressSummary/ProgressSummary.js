import React from 'react'
import PropTypes from 'prop-types'
import classes from './ProgressSummary.module.css'
import Container from '../UI/Container/Container'
import ProgressBar from './ProgressBar/ProgressBar'

const ProgressSummary = props => {
  return (
    <div className={classes.ProgressSummary}>
      <Container height='100px' width='98%'>
        <h1 className={props.left}>$249.32</h1>
        <ProgressBar left={props.left} right={props.right} />
        <h1 className={props.right ? props.right : props.left}>
          $249.32
        </h1>
      </Container>
    </div>
  )
}

ProgressSummary.propTypes = {
  left: PropTypes.string,
  right: PropTypes.string
}

export default ProgressSummary
