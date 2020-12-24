import React from 'react'
import PropTypes from 'prop-types'
import classes from './Question.module.css'
import Button from '../UI/Button/Button'

const Question = props => {
  const buttons = (
    props.questionSet.answers.map(answer => (
      <Button
        key={answer}
        size='large'
        color='primary'
        clicked={e => props.onAnswer(e.target.innerHTML, props.questionSet.setState)}>
        {answer}
      </Button>
    ))
  )

  return (
    <>
      <h1 className='primary'>{props.questionSet.prompt}</h1>
      <div className={classes.Buttons}>
        {buttons}
      </div>
    </>
  )
}

Question.propTypes = {
  questionSet: PropTypes.object,
  onAnswer: PropTypes.func
}

export default Question
