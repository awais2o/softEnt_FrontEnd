import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../Providers/UserProvider' // Adjust the import path as necessary

const PrivateRoute = ({ children }) => {
  const { user } = useUser()

  return user && user.id ? children : <Navigate to='/' />
}

export default PrivateRoute
