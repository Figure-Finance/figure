import React from 'react'
import PropTypes from 'prop-types'
import classes from './ProfileSummary.module.css'
import Container from '../UI/Container/Container'
import Input from '../UI/Input/Input'

const ProfileSummary = props => {
  return (
    <Container
      height={props.height || '100%'}
      width={props.width ? props.width : '33%'}>
      <div className={classes.ProfileSummary}>
        <h1 className='primary'>Profile</h1>
        <div className={classes.Name}>
          <Input placeholder='First' width='40%' />
          <Input placeholder='Last' width='40%' />
        </div>
        <div className={classes.Email}>
          <Input placeholder='Email' width='90%' />
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
