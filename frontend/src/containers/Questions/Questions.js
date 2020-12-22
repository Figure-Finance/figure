import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './Questions.module.css'
import Container from '../../components/UI/Container/Container'
import Question from '../../components/Question/Question'

const Questions = props => {
  const [questionNumber, setQuestionNumber] = useState(0)

  const questionList = [
    {
      prompt: 'Do you pay for your housing?',
      answers: [
        'Yes',
        'No'
      ]
    },
    {
      prompt: 'What is your primary mode of transportation?',
      answers: [
        'Personal vehicle',
        'Public transit/ride sharing',
        'Other'
      ]
    },
    {
      prompt: 'Do you have any subscriptions?',
      answers: [
        'Yes',
        'No'
      ]
    },
    {
      prompt: 'Do you have any pets?',
      answers: [
        'Yes',
        'No'
      ]
    },
    {
      prompt: 'Do you pay for a gym?',
      answers: [
        'Yes',
        'No'
      ]
    },
    {
      prompt: 'Do you have any habits?',
      answers: [
        'Yes',
        'No'
      ]
    }
  ]

  const nextQuestion = () => {
    if (questionList.length - 1 > questionNumber) {
      setQuestionNumber(questionNumber + 1)
    } else {
      props.history.push('/')
    }
  }

  return (
    <div className={classes.Questions}>
      <Container width='98%' height='96%'>
        <Question
          onAnswer={nextQuestion}
          questionSet={questionList[questionNumber]} />
      </Container>
    </div>
  )
}

Questions.propTypes = {
  history: PropTypes.object
}

export default Questions
