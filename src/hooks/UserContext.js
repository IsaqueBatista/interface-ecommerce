import PropTypes from 'prop-types'
import React, { createContext, useContext } from 'react'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
  const user = { name: 'Isaque', age: 25 }
  const userTwo = { name: 'Isaque2', age: 25 }

  return <UserContext.Provider value={{ user, userTwo }}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used with UserContext')
  }
  return context
}

UserProvider.propTypes = {
  children: PropTypes.node
}
