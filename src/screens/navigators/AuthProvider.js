import { View, Text } from 'react-native'
import React from 'react'

const AuthContext = React.createContext()

export default function AuthProvider({children}) {
    const [userLoggedIn, setUserLoggedIn] = React.useState(null)

  return (
   <AuthContext.Provider
        value={{
          userLoggedIn,
          setUserLoggedIn
         }}
   >
        {children}
   </AuthContext.Provider>
  )
}