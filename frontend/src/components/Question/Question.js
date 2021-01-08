import React from 'react'
import PropTypes from 'prop-types'
import classes from './Question.module.css'
import Button from '../UI/Button/Button'

const Question = ({ questionSet, onAnswer }) => {
  const buttons = (
    questionSet.answers.map(answer => (
      <Button
        key={answer}
        size='large'
        color='primary'
        onClick={e => onAnswer(e.target.innerHTML, questionSet.setState)}>
        {answer}
      </Button>
    ))
  )

  return (
    <>
      <h1 className='primary'>{questionSet.prompt}</h1>
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
