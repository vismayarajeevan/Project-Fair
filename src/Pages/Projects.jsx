import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { allProjectAPI } from '../services/allAPI'

const Projects = () => {
  // state to hold all projects
  const [allProjects, setAllProjects] = useState([])
  // state to hold search key
  const [searchKey,setSearchKey] = useState('')

   // need to load data at initial time
   useEffect(()=>{
    getAllProjects()
  },[searchKey])

  const getAllProjects =async()=>{
    const token = sessionStorage.getItem('token')
    if(token){
      const reqHeader ={
        "Authorization":`Bearer ${token}`
      }
      try {
        const result = await allProjectAPI(searchKey,reqHeader)
        if(result.status ==200){
          setAllProjects(result.data)
          console.log(allProjects);
          
        }
        
      } catch (error) {
        console.log(error);
        
      }
    }
  }

 

  return (
    <>
    <Header />
    <div className='container-fluid' style={{paddingTop:'100px'}}>
      <div className='d-flex justify-content-between'>
        <h1>All Projects</h1>
        <input onChange={e=>setSearchKey(e.target.value)} placeholder='Search Projects by their languages' className='form-control w-25' type="text" />
      </div>
      <Row className='mt-3'>
        {
          allProjects?.length>0?
          allProjects?.map(project =>(
            <Col className='mb-3' sm={12} md={6} lg={4}>
            <ProjectCard displayData={project} />
            </Col>
          ))
          :
          <div className='text-danger fw-bolder'>Project not yet uploaded!!!</div>
        }
        


      </Row>

    </div>
    </>
  )
}

export default Projects