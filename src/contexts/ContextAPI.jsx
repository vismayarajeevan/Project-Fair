import React, { createContext, useState } from 'react'

export const addProjectResponseContext = createContext()
// context for edit
export const editProjectResponseContext = createContext()


const ContextAPI = ({children}) => {

    // state  for add
    const [addProjectResponse, setAddProjectResponse] =useState("")

    // state for edit
    const [editProjectResponse, setEditProjectResponse] =useState("")

  return (
   <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
     <addProjectResponseContext.Provider value={{addProjectResponse, setAddProjectResponse}} >
      {children}
     </addProjectResponseContext.Provider>
   </editProjectResponseContext.Provider>
  )
}

export default ContextAPI