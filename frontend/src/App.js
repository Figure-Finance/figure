import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './containers/Login/Login'

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Redirect to='/' />
    </Switch>
  )
}

export default App
