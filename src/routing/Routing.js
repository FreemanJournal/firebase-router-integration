import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Blogs from '../components/Blogs/Blogs'
import Dashboard from '../components/Dashboard/Dashboard'
import Home from '../components/Home/Home'
import LogIn from '../components/LogIn/LogIn'
import Registration from '../components/Registration/Registration'
import PrivateRoute from './PrivateRoute'

export default function Routing() {
  

  return (
    <Routes>
      <Route index path='/' element={<Home />} />
      <Route path='/blogs' element={<Blogs />} />
      <Route path='/dashboard'
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
      <Route path='/login' element={<LogIn />} />
      <Route path='/registration' element={<Registration />} />
    </Routes>
  )
}
