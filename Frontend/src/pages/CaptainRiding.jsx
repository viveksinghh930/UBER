import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Map from '../components/Map'

const CaptainRiding = (props) => {
  const [finishRidePanel, setFinishRidePanel] = useState(false)
 const finishRidePanelRef = useRef(null)
    useGSAP(function () {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'

      })
    }
    else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)'

      })
    }
  }, [finishRidePanel])

  return (
   <div className='h-screen relative'>
    

      <div className='fixed flex w-screen items-center justify-between p-4 top-0'>
             {/* Map Section */}
                <div className='w-full mt-5'>
                    <Map 
                        pickup={[23.2599, 77.4126]} 
                        destination={[23.2699, 77.4226]} 
                        height="200px" 
                    />
                </div>
        {/* <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" /> */}
        <Link to='/captain-home' className="  h-10 w-10 bg-white flex items-center  justify-center rounded-full">
          <i className='ri-logout-box-r-line text-lg font-medium'></i>
        </Link>
      </div>
      <div className='h-4/5'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

      </div>
      <div className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400"
      
      onClick={()=>{
        setFinishRidePanel(true)
      }}
      >
            <h5 className='p-1 text-center w-[95%] absolute top-0 ' onClick={() => {
        
      }}><i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i></h5>
      <h4 className='text-xl font-semibold'>4 KM away</h4>
      <button className=' bg-green-600  text-white font-semibold p-3 px-10 rounded-lg '>Complete Ride</button>
      </div>
         <div ref={finishRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
        <FinishRide setFinishRidePanel={setFinishRidePanel}  />
      </div>
    </div>
  )
}

export default CaptainRiding