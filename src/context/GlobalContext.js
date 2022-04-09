import React, {createContext, useState } from 'react'

export const GlobalContext = createContext({});



export default function GlobalProvider({children}) {
    const [user, setUser] = useState({});
    const [message,setMessage] = useState('')
    

  return (
    <GlobalContext.Provider value={{
        user,
        setUser,
        message,
        setMessage
    }}>
        {children}
    </GlobalContext.Provider>
  )
}

