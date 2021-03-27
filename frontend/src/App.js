import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Auth from './containers/Auth/Auth'
import Questions from './containers/Questions/Questions'
import Home from './containers/Home/Home'
import Weekly from './containers/Weekly/Weekly'
import Monthly from './containers/Monthly/Monthly'
import Yearly from './containers/Yearly/Yearly'
import Savings from './containers/Savings/Savings'
import Profile from './containers/Profile/Profile'

const App = () => {
  return (
    <Switch>
      <Route exact path="/auth/questions" component={Questions} />
      <Route exact path="/auth" component={Auth} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/savings" component={Savings} />
      <Route exact path="/yearly" component={Yearly} />
      <Route exact path="/monthly" component={Monthly} />
      <Route exact path="/weekly" component={Weekly} />
      <Route exact path="/" component={Home} />
      <Redirect to="/" />
    </Switch>
  )
}

export default App
