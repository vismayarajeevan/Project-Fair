import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Landing_img from '../assets/landingImg.png'
import ProjectCard from '../Components/ProjectCard'
import { Card } from 'react-bootstrap'
import { getHomeProjectAPI } from '../services/allAPI'



const Home = () => {
  // state to hold the home projects
  const [allHomeProjects, setAllHomeProjects] = useState([])

 
  const navigate = useNavigate()

  // function to navigate to home page
const handleProjects =()=>{
  if(sessionStorage.getItem("token")){
    navigate('/projects')
  }else{
     alert("Please login to get full access")
  }

}

// need to display when page loads so give inside useeffect
useEffect(()=>{
  getAllHomeProjects()
},[])


 // function to get projects
 const getAllHomeProjects = async()=>{
  try {
    const result = await getHomeProjectAPI()
    if(result.status ==200){
      setAllHomeProjects(result.data)
    }
  } catch (error) {
    console.log(error);
    
  }
 }


  return (
    <>
    
    <div style={{minHeight:'100vh'}} className='d-flex justify-content-center align-items-center rounded shadow w-100'>
        <div className='container'>
           <div className='row align-items-center'>
            <div className='col-lg-6'>
              <h1 style={{fontSize:'80px'}}><i class="fa-brands fa-docker me-3"></i>Project Fair</h1>
              <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus praesentium maiores provident, aliquid illum sed necessitatibus ab rerum pariatur ad accusantium suscipit accusamus asperiores minima voluptatum officiis distinctio harum corporis.</p>
             {/* if person is login change button */}
             {
              sessionStorage.getItem("token")?
              <Link to={'/dashboard'} className='btn btn-warning'>MANAGE YOUR PROJECT</Link>
              :
              <Link to={'/login'} className='btn btn-warning'>STARTS TO EXPLORE</Link>
             }
            </div>

            <div className='col-lg-6'>
                <img className='img-fluid' src={Landing_img} alt="landing" />
            </div>
           </div>
        </div>

    </div>
    {/* *************explorer********************** */}
    <div className='mt-5 text-center'>
      <h1 className='mb-5'>Explore Our Projects</h1>
       {/* marquee for sliding effect */}
      <marquee>
        <div className='d-flex'>
          {
            allHomeProjects?.map(project=>(
              <div className='me-5'>
              <ProjectCard displayData={project}/>
            </div>
            ))
          }
          
        </div>
      </marquee>
      {/* BUTTON TO NAVIGATE TO PROJECT PAGE */}
      <button  onClick={handleProjects} className='btn btn-link mt-5'>CLICK HERE TO VIEW MORE PROJECTS...</button>
    </div>

    {/* ********Testimonials********** */}
    <div className='d-flex justify-content-center align-items-center mt-5 flex-column'>
      <h1>Our Testimonials</h1>
      <div className='d-flex justify-content-evenly align-items-center mt-3 w-100'>

         <Card style={{ width: '18rem' }}>
           <Card.Body>
            <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
              <img src="https://static.vecteezy.com/system/resources/thumbnails/036/498/120/small_2x/ai-generated-3d-cartoon-character-a-confident-male-with-crossed-arms-isolated-on-transparent-background-png.png" width={'90px'} height={'90px'} className='rounded-circle img-fluid mb-2' alt="" />Max Miller</Card.Title>
            <Card.Text>
          
            <div className='d-flex justify-content-center mb-1'>
               <i className='fa-solid fa-star text-warning'></i>
               <i className='fa-solid fa-star text-warning'></i>
               <i className='fa-solid fa-star text-warning'></i>
               <i className='fa-solid fa-star text-warning'></i>
               <i className='fa-solid fa-star text-warning'></i>
           </div>
           <p style={{textAlign:'justify'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat id ratione animi veritatis, voluptatibus reiciendis iste cumque iusto qui dolorum esse quo.</p>
        </Card.Text>
      </Card.Body>
    </Card>

      </div>
    </div>
   
    </>
  )
}

export default Home