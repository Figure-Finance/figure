import React, { useState } from 'react'
import Node from './node'

const QuestionOne = () => {
  const [payHousing, setPayHousing] = useState('')
  const [ownOrRent, setOwnOrRent] = useState('')
  const [haveHoa, setHaveHoa] = useState('')
  const [haveInsurance, setHaveInsurance] = useState('')
  const [payMaintenance, setPayMaintenance] = useState('')

  const housing = new Node({
    prompt: 'Do you pay for your housing?',
    shortPrompt: 'Housing',
    answers: [
      'Yes',
      'No'
    ],
    setState: setPayHousing,
    answer: payHousing
  })

  const own = housing.addChild({
    prompt: 'Do you own or rent?',
    shortPrompt: 'ownOrRent',
    answers: [
      'Own',
      'Rent'
    ],
    setState: setOwnOrRent,
    answer: ownOrRent
  }, 'Yes')

  const hoa = own.addChild({
    prompt: 'Do you have an HOA?',
    shortPrompt: 'HOA',
    answers: [
      'Yes',
      'No'
    ],
    setState: setHaveHoa,
    answer: haveHoa
  }, 'Own')

  const insurance = own.addChild({
    prompt: 'Do you have renter\'s insurance?',
    shortPrompt: 'insurance',
    answers: [
      'Yes',
      'No'
    ],
    setState: setHaveInsurance,
    answer: haveInsurance
  }, 'No')

  const maintenanceOne = insurance.addChild({
    prompt: 'Do you pay for maintenance?',
    shortPrompt: 'maintenance',
    answers: [
      'Yes',
      'No'
    ],
    setState: setPayMaintenance,
    answer: payMaintenance
  }, 'Yes')

  const maintenanceTwo = insurance.addChild({
    prompt: 'Do you pay for maintenance?',
    shortPrompt: 'maintenance',
    answers: [
      'Yes',
      'No'
    ],
    setState: setPayMaintenance,
    answer: payMaintenance
  }, 'No')
}

export default QuestionOne
