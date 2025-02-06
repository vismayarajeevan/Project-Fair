import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import uploadUser_img from '../assets/uploadUser.png'
import SERVER_URL from '../services/serverURL';
import { updateUserAPI } from '../services/allAPI';


const Profile = () => {
  const [open, setOpen] = useState(false);
  // state to hold existing image
  const [ existingImage,setExistingImage] = useState("")
  // state to hold preview of image
  const [preview, setPreview] = useState("")
  // state to hold user details
  const [userDetails,setUserDetails] = useState({
    username:"",email:"",password:"",github:"",linkedin:"",profilePic:""
  })

  // 
  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({
        ...userDetails, username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin
      })
      // profile pic from user save
      setExistingImage(user.profilePic)
    }
    // show details when session open . sogive dependency
  },[open])

  // need to change image in file format to url
  useEffect(()=>{
    if(userDetails.profilePic){
      setPreview(URL.createObjectURL(userDetails.profilePic))
    }else{
      setPreview("")
    }
  },[userDetails.profilePic])


  // function to update
  const handleUpdateProfile = async()=>{
    const {username,email,password,github,linkedin,profilePic} = userDetails
    if(github && linkedin){
      const reqBody = new FormData()

      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append("profilePic",profilePic):reqBody.append("profilePic",existingImage)

       // take token
       const token = sessionStorage.getItem('token')

       // if token present pass header
       if(token){
         const reqHeaders ={
           "Content-Type":"multipart/form-data",
           "Authorization":`Bearer ${token}`
         }
        //  make api call
        try {
          const result =await updateUserAPI(reqBody,reqHeaders)
          console.log(result);
          if(result.status ==200){
            alert("User profile updated successfully")
            // update the given value in session storage
            sessionStorage.setItem("user",JSON.stringify(result.data))
            setOpen(!open)
          }
          
          
        } catch (error) {
          console.log(error);
          
        }
        }


    }else{
      alert("Please fill all the fields!!!!")
    }
  }

  

  return (
   <>
     <div className='d-flex justify-content-evenly'>
        <h3 className='text-warning'>Profile</h3>
        <button onClick={() => setOpen(!open)} className='btn text-warning'><i class="fa-solid fa-angle-down"></i></button>
     </div>
      <Collapse in={open}>
        <div id="example-collapse-text" className='row container-fluid align-items-center justify-content-center shadow p-2 rounded'>
          <label className='text-center mb-2'>
            {/* to change image */}
            <input onChange={e=>setUserDetails({...userDetails,profilePic:e.target.files[0]})} type="file" style={{display:'none'}}/>
            {
              existingImage==""?
              <img height={'150px'} width={'150px'} className='rounded-circle' src={preview?preview:uploadUser_img} alt="" />
              :
              <img height={'150px'} width={'150px'} className='rounded-circle' src={preview?preview:`${SERVER_URL}/uploads//${existingImage}`} alt="" />

            }
          </label>
          <div className='mb-2'>
            {/* to get given value in field use value and onchange */}
              <input value={userDetails.github} onChange={e=>setUserDetails({...userDetails,github:e.target.value})} type="text" className='form-control' placeholder='USER GITHUB PROFILE LINK' />
          </div>
          <div className='mb-2'>
              <input value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} type="text" className='form-control' placeholder='USER LINKEDIN PROFILE LINK' />
          </div>
          <div className='d-grid w-100'>
            <button onClick={handleUpdateProfile} className='btn btn-warning'>Update Profile</button>
          </div>
        </div>
    </Collapse>
   </>
  )
}

export default Profile