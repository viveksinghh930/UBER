import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Captainlogin = () => {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captainData, setCaptainData] = useState({})

  const submitHandler = (e)=>{
    e.preventDefault();
    setCaptainData({
      email:email,
      password:password
    })   
    setEmail('')
    setPassword('')
  }
  return (
    
   <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <img className='w-24 mb-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s" alt="" />

          <h3 className='text-lg font-medium mb-2'>what's your email</h3>

          <input
            required
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
              
            }}

            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type='email'
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          <input
            required
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder='password'
          />

          <button className='bg-[#111] text-white font-semibold  mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base' >Login</button>
 
        </form>
         <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain </Link></p>
      </div>
      <div>
        <Link  to='/login' className='bg-[#111] flex items-center justify-center text-white font-semibold  mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base' >Sign in as User</Link>
     

      </div>
    </div>
  )
}

export default Captainlogin