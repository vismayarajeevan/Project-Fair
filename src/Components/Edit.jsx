import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import SERVER_URL from '../services/serverURL';
import { updateProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../contexts/ContextAPI';


const Edit = ({project}) => {
  const [show, setShow] = useState(false);

  const {editProjectResponse, setEditProjectResponse}= useContext(editProjectResponseContext)
     
    // state to handle modal
    const [projectDetails, setProjectDetails] = useState({
      id:project._id,
      title:project.title,
      languages:project.languages,
      overview:project.overview,
      github:project.github,
      website:project.website,
      projectImg:""
    })
    console.log(projectDetails);
  
    // state to check the image file status. valid or not
    const [imageFileStatus, seImageFileStatus] = useState(false)
  
    // state to display image
    const[preview, setPreview] = useState("")


     // upload image handling
      useEffect(()=>{
        if(projectDetails.projectImg.type =="image/png" || projectDetails.projectImg.type =="image/jpg" || projectDetails.projectImg.type =="image/jpeg"){
          // valid image
          seImageFileStatus(true)
          setPreview(URL.createObjectURL(projectDetails.projectImg))
        }else{
          // invalid image
          seImageFileStatus(false)
          setProjectDetails({...projectDetails,projectImg:""})
        }
      },[projectDetails.projectImg])

  
    const handleClose = () => {
      setShow(false);
      // update state with initial value
    setProjectDetails({
      id:project._id,
      title:project.title,
      languages:project.languages,
      overview:project.overview,
      github:project.github,
      website:project.website,
      projectImg:""
    })
  }
    const handleShow = () => {
      setProjectDetails({
        id:project._id,
        title:project.title,
        languages:project.languages,
        overview:project.overview,
        github:project.github,
        website:project.website,
        projectImg:""
      })
      setShow(true);
    }

    // function to update project details
    const handleUpdateProject = async()=>{
      const {id,title,languages,overview,github,website,projectImg}  =projectDetails

      if(title && languages && overview && github && website){

        // api call - put - (id,updateDetails)

        const reqBody = new FormData()
        // pass all keys to server
        reqBody.append("title",title)
        reqBody.append("languages",languages)
        reqBody.append("overview",overview)
        reqBody.append("github",github)
        reqBody.append("website",website)

        // if image is not uploaded, take image from backend
        preview?reqBody.append("projectImg",projectImg) : reqBody.append("projectImg",project.projectImg)
        // take token
        const token = sessionStorage.getItem('token')

        // check token is present or not
        if(token){
          // api call, need header
          const reqHeaders ={
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
          try {
            const result = await updateProjectAPI(id,reqBody,reqHeaders)
            if(result.status ==200){
              alert("Projec updated successfully!!!")
              handleClose()
              setEditProjectResponse(result)
            }
          } catch (error) {
            
          }
  
        }


      }else{
        alert("Please fill the form completely!!!!")
      }
    }
  
  return (
    <>
    <button onClick={handleShow} className='btn'><i className='fa-solid fa-edit'></i></button>
     <Modal centered size='lg' show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Update Project Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='row align-items-center'>
                       <div className='col-lg-4'>
                         <label>
                           <input type="file" onChange={e=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})} style={{display:'none'}}/>
                           {/* if image is not given take image from backend */}
                           <img height={'20px'} className='img-fluid' src={preview?preview:`${SERVER_URL}/uploads/${project.projectImg}`} alt="" />
                         </label>
                        {
                         !imageFileStatus && 
                         <div className='text-warning fw-bolder my-2'>*Upload only the following file types (jpeg, jpg,png) here!!!</div>
                        }
                       </div>
                       <div className='col-lg-8'>
                         <div className='mb-2'>
                           <input type="text" value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} className='form-control' placeholder='Project Title' />
                         </div>
                         <div className='mb-2'>
                           <input type="text" value={projectDetails.languages} onChange={e=>setProjectDetails({...projectDetails,languages:e.target.value})} className='form-control' placeholder='languages used in project' />
                         </div>
                         <div className='mb-2'>
                           <input type="text" value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} className='form-control' placeholder='Project overview' />
                         </div>
                         <div className='mb-2'>
                           <input type="text" value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})} className='form-control' placeholder='Project Github Link' />
                         </div>
                         <div className='mb-2'>
                           <input type="text" value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})} className='form-control' placeholder='Project Website Link' />
                         </div>
                       </div>
                      </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleUpdateProject} variant="primary">Update</Button>
            </Modal.Footer>
          </Modal>
    </>
  )
}

export default Edit