import Proptypes from 'prop-types'
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute({ component, ...rest }) {
  const user = localStorage.getItem('devburguer:userData')

  if (!user) {
    return <Redirect to="/login" />
  }
  return <Route {...rest} component={component} />
}

PrivateRoute.propTypes = {
  component: Proptypes.oneOfType([Proptypes.func, Proptypes.element])
}
