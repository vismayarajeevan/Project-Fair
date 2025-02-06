
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import Auth from './Pages/Auth'
import Footer from './Components/Footer'
import { useContext, useEffect } from 'react'
import { tokenAuthContext } from './contexts/AuthContextAPI'
import PageNotFound from './Pages/PageNotFound'

function App() {
 const {isAuthoried, setIsAuthorized} = useContext(tokenAuthContext)

  useEffect(()=>{
         if(sessionStorage.getItem("token")){
             setIsAuthorized(true)
         }else{
             setIsAuthorized(false)
         }
     },[isAuthoried])

  return (
    <>
     <Routes>
      <Route path='/' element={<Home />} />

      {/* only show when user logined */}
      {
        isAuthoried && 
        <>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/projects' element={<Projects />} />
        </>
       
      }



      {/* <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/projects' element={<Projects />} /> */}
      <Route path='/login' element={<Auth />} />
      {/* auth page used for 2 purpose so give an attribute as props and make it true */}
      <Route path='/register' element={<Auth insideRegister={true} />} />
      {/* page not found for logout */}
      <Route path='/*' element={<PageNotFound />} />
     </Routes>
     {/* footer common for all pages, so use here */}
     <Footer />
    </>
  )
}

export default App
