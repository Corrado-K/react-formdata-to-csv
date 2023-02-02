import { useEffect } from "react";
import { createContext, useState } from "react";


export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
     const [user, setUser] = useState(null)

     useEffect(() => {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
               setUser(JSON.parse(storedUser))
          }
          console.log("Stored user: " + JSON.stringify(storedUser));
     }, []);

     // useEffect(() => {
     //      localStorage.setItem('user', JSON.stringify(user))
     //      console.log("Stored user: " + JSON.stringify(user));
     // }, []);

     const login = (user) => {
          setUser(user)
          localStorage.setItem('user', JSON.stringify(user))
     }

     const logout = () => {
          setUser(null)
          localStorage.setItem('user', null)

     }

     const value = {
          user, login, logout
     }

     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}