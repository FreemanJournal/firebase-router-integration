import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'

export default function PrivateRoute({Component}) {
  const { user } = useContext(GlobalContext)
  const location = useLocation();
  return user.uid ? <Component/> : <Navigate to='/login' state={{from:location}}/>
}
