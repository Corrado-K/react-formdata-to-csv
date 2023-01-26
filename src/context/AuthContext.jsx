import { createContext, useState } from "react";


export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
     const [user, setUser] = useState(null)
     const [isLoggedIn, setIsLoggedIn] = useState(false)

     const value = {
          user, setUser, isLoggedIn, setIsLoggedIn
     }

     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}