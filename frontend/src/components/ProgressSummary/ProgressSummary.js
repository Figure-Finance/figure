import React from 'react'
import classes from './ProgressSummary.module.css'
import Container from '../UI/Container/Container'
import ProgressBar from '../ProgressBar/ProgressBar'

const ProgressSummary = props => {
  return (
    <div className={classes.ProgressSummary}>
      <Container height='100px' width='98%'>
        <h1 className='primary'>$249.32</h1>
        <ProgressBar />
        <h1 className='danger'>$249.32</h1>
      </Container>
    </div>
  )
}

export default ProgressSummary
