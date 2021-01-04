import React from 'react'
import PropTypes from 'prop-types'
import classes from './ProfileSummary.module.css'
import Container from '../UI/Container/Container'
import Input from '../UI/Input/Input'

const ProfileSummary = props => {
  return (
    <Container
      height={props.height || '100%'}>
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
              }} />
          </div>
          <div className={classes.LastName}>
            <Input
              type='input'
              color='primary'
              config={{
                type: 'text',
                label: 'Last Name'
              }} />
          </div>
        </div>
        <div className={classes.Email}>
          <Input
            type='input'
            color='primary'
            config={{
              type: 'text',
              label: 'Email'
            }} />
        </div>
      </div>
    </Container>
  )
}

ProfileSummary.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string
}

export default ProfileSummary
