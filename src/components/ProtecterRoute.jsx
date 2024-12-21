import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
const ProtectedRoute = () => {
    const {isAuthenticated_state} = useContext(AuthContext)
    console.log(isAuthenticated_state)
  return (
    isAuthenticated_state 
    ? <Outlet/> //Similar al next() en un middleware
    : <Navigate to={"/login"}/> //Similar a un redirect
  )
}
export default ProtectedRoute