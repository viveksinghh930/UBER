import React from 'react'
import homelogo from '../../public/homelogo.png'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
   <div className=' bg-cover bg-center h-screen pt-6  justify-between flex flex-col  bg-[url(homelogo.png)] w-full'>
    <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
    <div className='bg-white py-4 pb-7  px-4'>
      <h2 className='text-3xl font-bold'>Get Started With Uber</h2>
      <Link to='/login' className=' flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
    </div>
            
      
        </div>
  )
}

export default Home