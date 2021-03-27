import React from 'react'
import classes from './Loader.module.css'
import Container from '../UI/Container/Container'

const Loader = () => (
  <Container height="100%" width="33%">
    <div className={classes.Loader}>
      <div />
      <div />
      <div />
    </div>
  </Container>
)

export default Loader
