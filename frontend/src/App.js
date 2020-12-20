import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Auth from './containers/Auth/Auth'
import Weekly from './containers/Weekly/Weekly'

const App = () => {
  return (
    <Switch>
      <Route path='/signup' component={Auth} />
      <Route exact path='/' component={Weekly} />
      <Redirect to='/' />
    </Switch>
  )
}

export default App
