import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Home from '../containers/Home'
import Login from '../containers/Login'
import Register from '../containers/Register'
import PrivateRoute from './private-route'

function Routes() {
  return (
    <Router>
      <Switch>
        <Route component={Login} path="/login" />
        <Route component={Register} path="/cadastro" />
        <PrivateRoute component={Home} path="/" />
        {/* Na versão 6 do react-router-dom não é mais necessário o exact antes do component */}
      </Switch>
    </Router>
  )
}

export default Routes
