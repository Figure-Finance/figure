import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Auth from './containers/Auth/Auth'

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Auth} />
      <Redirect to='/' />
    </Switch>
  )
}

export default App
