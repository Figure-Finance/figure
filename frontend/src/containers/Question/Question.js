import React from 'react'
import Button from '../../components/UI/Button/Button'

const Question = props => {
  return (
    <div>
      <h1>Do you have any pets?</h1>
      <Button size='large' color='primary'>
        Yes
      </Button>
      <Button size='large' color='primary'>
        No
      </Button>
    </div>
  )
}

export default Question
