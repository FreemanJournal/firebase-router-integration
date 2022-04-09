import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext'

export default function useFirebaseNativeProvider() {
   const {user,setUser} = useContext(GlobalContext)
    
  return {user}
}
