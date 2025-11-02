import React, { createContext, useState } from 'react'

 export  const UserDataContext = createContext()
const UserContext = ({children}) => {
        const [isLoading, setIsLoading] = useState(false)
    
    const [user, setUser] = useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        }
    })

    const value ={
        user,
        setUser,
         isLoading,
        setIsLoading,

    }
  return (
    <div>
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
        </div>
  )
}

export default UserContext