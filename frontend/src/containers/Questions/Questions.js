import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './Questions.module.css'
import Container from '../../components/UI/Container/Container'
import Question from '../../components/Question/Question'
import Button from '../../components/UI/Button/Button'

const Questions = ({ history }) => {
  const [questionNumber, setQuestionNumber] = useState(0)
  const [payHousing, setPayHousing] = useState('')
  const [transportation, setTransportation] = useState('')
  const [haveSubscriptions, setHaveSubscriptions] = useState('')
  const [havePets, setHavePets] = useState('')
  const [payGym, setPayGym] = useState('')
  const [haveHabits, setHaveHabits] = useState('')

  const questionList = [
    {
      prompt: 'Do you pay for your housing?',
      shortPrompt: 'Housing',
      answers: [
        'Yes',
        'No'
      ],
      setState: setPayHousing,
      answer: payHousing
    },
    {
      prompt: 'What is your primary mode of transportation?',
      shortPrompt: 'Transportation',
      answers: [
        'Personal vehicle',
        'Public transit/ride sharing',
        'Other'
      ],
      setState: setTransportation,
      answer: transportation
    },
    {
      prompt: 'Do you have any subscriptions?',
      shortPrompt: 'Subscriptions',
      answers: [
        'Yes',
        'No'
      ],
      setState: setHaveSubscriptions,
      answer: haveSubscriptions
    },
    {
      prompt: 'Do you have any pets?',
      shortPrompt: 'Pets',
      answers: [
        'Yes',
        'No'
      ],
      setState: setHavePets,
      answer: havePets
    },
    {
      prompt: 'Do you pay for a gym?',
      shortPrompt: 'Gym',
      answers: [
        'Yes',
        'No'
      ],
      setState: setPayGym,
      answer: payGym
    },
    {
      prompt: 'Do you have any habits?',
      shortPrompt: 'Habits',
      answers: [
        'Yes',
        'No'
      ],
      setState: setHaveHabits,
      answer: haveHabits
    }
  ]

  const submitAnswer = (answer, setState) => {
    setState(answer)
    nextQuestion()
  }

  const nextQuestion = () => {
    if (questionList.length - 1 > questionNumber) {
      setQuestionNumber(questionNumber + 1)
    } else {
      history.push('/')
    }
  }

  const pastAnswers = questionList.map((question, index) => (
    questionNumber > index
      ? (
        <Button
          key={question.shortPrompt}
          size='thin'
          color='primary'
          secondary={question.answer}
          dual>
          {question.shortPrompt}
        </Button>
        )
      : null
  ))

  return (
    <div className={classes.Questions}>
      <Container width='98%' height='96%'>
        <Question
          onAnswer={submitAnswer}
          questionSet={questionList[questionNumber]} />
        <div className={classes.PastAnswers}>
          {pastAnswers}
        </div>
      </Container>
    </div>
  )
}

Questions.propTypes = {
  history: PropTypes.object
}

export default Questions
