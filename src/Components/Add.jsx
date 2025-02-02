import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import upload_img from '../assets/uploadimg.png'
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../contexts/ContextAPI';

const Add = () => {

  // take state from contextapi
  const {addProjectResponse, setAddProjectResponse} =useContext(addProjectResponseContext)
   
  // state to handle modal
  const [projectDetails, setProjectDetails] = useState({
    title:"",
    languages:"",
    overview:"",
    github:"",
    website:"",
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
  

  const [show, setShow] = useState(false);

  const handleClose = () =>{

    setShow(false);
    setPreview("")
    seImageFileStatus(false)
    setProjectDetails({ title:"", languages:"", overview:"", github:"", website:"", projectImg:""})} 
  const handleShow = () => setShow(true);

  // function to save modal details
  const handleAddProject = async()=>{
    // take all input fields from modal through destructuring
    const  {title, languages, overview, github, website, projectImg} = projectDetails
    // check all fields are filled or not
    if(title && languages && overview && github && website && projectImg){
      // alert("Proceed api call")
      // create an object for formdata
      const reqBody = new FormData()
      // pass all keys to server
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImg",projectImg)
      // take token
      const token = sessionStorage.getItem('token')

      // if token present pass header
      if(token){
        const reqHeaders ={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }

        // make api call
        try {
          const result = await addProjectAPI(reqBody,reqHeaders)
          if(result.status==200){
            alert("Project added successfully")
            setAddProjectResponse(result)
            handleClose()
          }else{
            alert(result.response.data)
          }
          
        } catch (error) {
          console.log(error);
          
        }

      }
    }else{
      alert("Please fill the form completely")
    }
  }

  return (
    <>
     <button onClick={handleShow} className='btn btn-primary'>+ New Project</button>
      <Modal centered size='lg' show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>New Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className='row align-items-center'>
          <div className='col-lg-4'>
            <label>
              <input type="file" onChange={e=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})} style={{display:'none'}}/>
              <img height={'20px'} className='img-fluid' src={preview?preview:upload_img} alt="" />
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
          <Button onClick={handleAddProject} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add