import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../contexts/AuthContextAPI'


const Header = ({insideDashboard}) => {
   const {isAuthoried, setIsAuthorized} = useContext(tokenAuthContext)
  

  const navigate = useNavigate()
  const logout =()=>{
    sessionStorage.clear()
    setIsAuthorized(false)
    navigate('/')
  }

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
          <button onClick={logout} className='btn btn-link'>Logout <i className='fa-solid fa-right-from-bracket'></i></button>
        </div>
      }
    </Container>
  </Navbar>
  )
}

export default Header