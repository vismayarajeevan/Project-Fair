
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import Auth from './Pages/Auth'
import Footer from './Components/Footer'

function App() {
 

  return (
    <>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/projects' element={<Projects />} />
      <Route path='/login' element={<Auth />} />
      {/* auth page used for 2 purpose so give an attribute as props and make it true */}
      <Route path='/register' element={<Auth insideRegister={true} />} />
     </Routes>
     {/* footer common for all pages, so use here */}
     <Footer />
    </>
  )
}

export default App
