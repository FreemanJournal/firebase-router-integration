import { getAuth } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import app from '../utilitis/firebase.init';

export const GlobalContext = createContext({});



export default function GlobalProvider({ children }) {
  const [userData, setUserData] = useState({});
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const [message, setMessage] = useState(error)

  useEffect(()=>setUserData(user),[])
  
  return (
    <GlobalContext.Provider value={{
      userData,
      message,
      setMessage,
      auth
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

