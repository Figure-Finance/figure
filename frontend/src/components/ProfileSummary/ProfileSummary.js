import React from 'react'
import PropTypes from 'prop-types'
import classes from './ProfileSummary.module.css'
import Container from '../UI/Container/Container'
import Input from '../UI/Input/Input'

const ProfileSummary = props => {
  // const [formIsValid, setFormIsValid] = useState(false)
  // const [formElements, setFormElements] = useState({
  //   type: {
  //     type: 'input',
  //     config: {
  //       type: 'text',
  //       label: 'Type'
  //     },
  //     value: props.type || '',
  //     validation: {
  //       required: true
  //     },
  //     valid: false,
  //     touched: false
  //   },
  //   amount: {
  //     type: 'input',
  //     config: {
  //       type: 'number',
  //       label: 'Amount',
  //       min: '0',
  //       step: '0.01'
  //     },
  //     value: props.amount || '',
  //     validation: {
  //       required: true
  //     },
  //     valid: false,
  //     touched: false
  //   },
  //   location: {
  //     type: 'input',
  //     config: {
  //       type: 'text',
  //       label: 'Location'
  //     },
  //     value: props.location || '',
  //     validation: {
  //       required: true
  //     },
  //     valid: false,
  //     touched: false
  //   },
  //   description: {
  //     type: 'input',
  //     config: {
  //       type: 'text',
  //       label: 'Description'
  //     },
  //     value: props.description || '',
  //     validation: {
  //       required: true
  //     },
  //     valid: false,
  //     touched: false
  //   },
  //   date: {
  //     type: 'input',
  //     config: {
  //       type: 'date',
  //       label: 'Date'
  //     },
  //     value: props.date || '',
  //     validation: {
  //       required: true
  //     },
  //     valid: false,
  //     touched: false
  //   }
  // })

  return (
    <Container
      height='50%'>
      <div className={classes.ProfileSummary}>
        <h1 className='primary'>Profile</h1>
        <div className={classes.Name}>
          <div className={classes.FirstName}>
            <Input
              type='input'
              color='primary'
              config={{
                type: 'text',
                label: 'First Name'
              }}
              value={props.firstName} />
          </div>
          <div className={classes.LastName}>
            <Input
              type='input'
              color='primary'
              config={{
                type: 'text',
                label: 'Last Name'
              }}
              value={props.lastName} />
          </div>
        </div>
        <div className={classes.Email}>
          <Input
            type='input'
            color='primary'
            config={{
              type: 'text',
              label: 'Email'
            }}
            value={props.email} />
        </div>
      </div>
    </Container>
  )
}

ProfileSummary.propTypes = {
  height: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string
}

export default ProfileSummary
