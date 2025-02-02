import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Header = ({insideDashboard}) => {
  return (
    <Navbar style={{zIndex:1}} className="border rounded position-fixed w-100">
    <Container>
      <Link to={'/'} style={{textDecoration:'none'}}>
      <Navbar.Brand style={{color:'white'}} className='fw-bolder'>
      <i class="fa-brands fa-docker me-2"></i>Project Fair
      </Navbar.Brand>
      </Link>
      {
        insideDashboard && 
        <div className='ms-auto'>
          <button className='btn btn-link'>Logout <i className='fa-solid fa-right-from-bracket'></i></button>
        </div>
      }
    </Container>
  </Navbar>
  )
}

export default Header