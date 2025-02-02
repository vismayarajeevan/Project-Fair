import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import uploadUser_img from '../assets/uploadUser.png'


const Profile = () => {
  const [open, setOpen] = useState(false);
  return (
   <>
     <div className='d-flex justify-content-evenly'>
        <h3 className='text-warning'>Profile</h3>
        <button onClick={() => setOpen(!open)} className='btn text-warning'><i class="fa-solid fa-angle-down"></i></button>
     </div>
      <Collapse in={open}>
        <div id="example-collapse-text" className='row container-fluid align-items-center justify-content-center shadow p-2 rounded'>
          <label className='text-center mb-2'>
            <input type="file" style={{display:'none'}}/>
            <img height={'150px'} width={'150px'} className='rounded circle' src={uploadUser_img} alt="" />
          </label>
          <div className='mb-2'>
              <input type="text" className='form-control' placeholder='USER GITHUB PROFILE LINK' />
          </div>
          <div className='mb-2'>
              <input type="text" className='form-control' placeholder='USER LINKEDIN PROFILE LINK' />
          </div>
          <div className='d-grid w-100'>
            <button className='btn btn-warning'>Update Profile</button>
          </div>
        </div>
    </Collapse>
   </>
  )
}

export default Profile