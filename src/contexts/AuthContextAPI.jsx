import React, { createContext, useEffect, useState } from 'react'

// create context
export const tokenAuthContext = createContext()



const AuthContextAPI = ({children}) => {

    const [isAuthoried, setIsAuthorized] = useState(false)
    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsAuthorized(true)
        }else{
            setIsAuthorized(false)
        }
    },[isAuthoried])
  return (
    <tokenAuthContext.Provider value={{isAuthoried,setIsAuthorized}}>
        {children}
    </tokenAuthContext.Provider>
  )
}

export default AuthContextAPI