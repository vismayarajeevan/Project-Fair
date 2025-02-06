import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { userProjectAPI, userprojectRemoveAPI } from '../services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../contexts/ContextAPI'

const View = () => {

  const {editProjectResponse, setEditProjectResponse} = useContext(editProjectResponseContext)

  // from contextapi
  const {addProjectResponse, setAddProjectResponse} = useContext(addProjectResponseContext)

  const [userProjects,setUserProjects] = useState([])

  // need to display projects when page loads
  useEffect(()=>{
    getUserProjects()
  },[addProjectResponse,editProjectResponse])

  console.log(userProjects);
  

  const getUserProjects = async()=>{
    console.log("getUserProjects");
    
    // take token
    const token = sessionStorage.getItem('token')
    if(token){
      const reqHeader ={
         "Authorization":`Bearer ${token}`
      }
      try {
        const result = await userProjectAPI(reqHeader)
        console.log(result);
        if(result.status ==200){
          setUserProjects(result.data)
        }
        
      } catch (error) {
        console.log(error);
        
      }
    }
  }

  const deleteProject =async(id)=>{
     // take token
     const token = sessionStorage.getItem('token')

     // check token is present or not
     if(token){
       // api call, need header
       const reqHeaders ={
         "Authorization":`Bearer ${token}`
       }
       try {
        await userprojectRemoveAPI(id,reqHeaders)
        // to see changes in frontend call get function
        getUserProjects()
       } catch (error) {
        console.log(error);
        
       }

      }
  }

  return (
    <>
    <div className='d-flex justify-content-between'>
     <h2 className='text-warning'>All Projects...</h2>
     <div><Add /></div>
     </div>
     <div className='allProjects mt-2'>
      {
        userProjects?.length>0?
        userProjects?.map(project=>(
          <div key={project?._id} className='border rounded p-2 mb-3 d-flex justify-content-between'>
        <h3>{project.title}</h3>
        <div className='d-flex align-items-center'>
          <div><Edit project={project}/></div>
          <div className='btn'>
            <a target='_blank' href={project?.github}><i className='fa-brands fa-github'></i></a>
          </div>
          <button onClick={()=>deleteProject(project?._id)} className='btn text-danger'><i className='fa-solid fa-trash'></i></button>

        </div>
      </div> 
        ))
        :
        <div className='text-warning fw-bolder'>Not yet uploaded any projects....</div>
      }
    </div>
    </>
  )
}

export default View