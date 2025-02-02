import React, { createContext, useState } from 'react'

export const addProjectResponseContext = createContext()

const ContextAPI = ({children}) => {

    // state 
    const [addProjectResponse, setAddProjectResponse] =useState("")
  return (
   <addProjectResponseContext.Provider value={{addProjectResponse, setAddProjectResponse}} >
    {children}
   </addProjectResponseContext.Provider>
  )
}

export default ContextAPI