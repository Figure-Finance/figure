import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Auth from './containers/Auth/Auth'
import Weekly from './containers/Weekly/Weekly'
import Monthly from './containers/Monthly/Monthly'
import Yearly from './containers/Yearly/Yearly'
import Savings from './containers/Savings/Savings'
import Profile from './containers/Profile/Profile'

const App = () => {
  return (
    <Switch>
      <Route exact path='/signup' component={Auth} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/savings' component={Savings} />
      <Route exact path='/yearly' component={Yearly} />
      <Route exact path='/monthly' component={Monthly} />
      <Route exact path='/' component={Weekly} />
      <Redirect to='/' />
    </Switch>
  )
}

export default App
