import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
   <div className='d-flex flex-column align-items-center justify-content-center mt-5 shadow' style={{width:'100%', height:'300px'}}>

    <div className='footer d-flex justify-content-evenly w-100 mt-4'>
    <div style={{width:'300px'}} className='website'>

  {/* ********************1.intro****************** */}
  
    <h4 className='fw-bolder text-light'><i class="fa-brands fa-docker me-2"></i>Project Fair</h4>
    <p>Designed and built with all the love in the world by the Bootstrap team with the help of our contributors.</p>
    <h6>Code licensed MIT, docs CC BY 3.0.</h6>
    <p>Currently v5.3.3.</p>
  </div>

  {/* ************2.links*************** */}
  <div className='links d-flex flex-column'>
    <h5>Links</h5>
    <Link to={'/'} style={{textDecoration:'none', color:'white'}} >Home</Link>
    <Link to={'/login'} style={{textDecoration:'none', color:'white'}} >Login</Link>
    <Link to={'/register'} style={{textDecoration:'none', color:'white'}} >Register</Link>   
  </div>

  {/* **************3.guides*********** */}

<div className='d-flex flex-column'>
  {/* it moves to external pages , so use anchor tag */}
  <h5>Guides</h5>
  <a href="https://react.dev/" target='_blank' style={{textDecoration:"none", color:"white"}}>React</a>
  <a href="https://react-bootstrap.netlify.app/" target='_blank' style={{textDecoration:"none", color:"white"}}>React Bootstrap</a>
  <a href="https://reactrouter.com/" target='_blank' style={{textDecoration:"none", color:"white"}}>React Router</a>

</div>

  {/* **************4.contacts*********** */}

  <div className='d-flex flex-column'>
    <h5>Contacts</h5>

    <div className='d-flex'>
      <input type="text" placeholder='Enter your email here..' className='form-control me-2' />
      <button className='btn btn-info'><i class="fa-solid fa-arrow-right"></i></button>
    </div>

    <div className='d-flex justify-content-between mt-3'>
      <a href="https://x.com/?lang=en&mx=2" target='_blank' style={{textDecoration:"none", color:"white"}}><i class="fa-brands fa-twitter"></i></a>
      <a href="https://www.instagram.com/" target='_blank' style={{textDecoration:"none", color:"white"}}><i class="fa-brands fa-instagram"></i></a>
      <a href="https://www.facebook.com/" target='_blank' style={{textDecoration:"none", color:"white"}}><i class="fa-brands fa-facebook"></i></a>
      <a href="https://in.linkedin.com/" target='_blank' style={{textDecoration:"none", color:"white"}}><i class="fa-brands fa-linkedin"></i></a>
      <a href="https://github.com/" target='_blank' style={{textDecoration:"none", color:"white"}}><i class="fa-brands fa-github"></i></a>
      <a href="https://github.com/" target='_blank' style={{textDecoration:"none", color:"white"}}><i class="fa-solid fa-phone"></i></a>
    </div>

  </div>
</div>

<p className='text-center mt-3'>Copyright &copy; August 2024 Batch, Project Fair. Built with React.</p>
</div>
  
  )
}

export default Footer