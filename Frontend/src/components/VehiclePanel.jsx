import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
         <h5 className='p-1 text-center w-[93%] absolute top-0 ' onClick={()=>{
        props.setVehiclePanel(false)
       }}><i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'> Choose a Vehicle </h3>
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
        }} className='flex border-2 border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
          <img className='h-12' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n" alt="" />
          <div className="w-1/2">
            <h4 className='font-medium text-base '>UberGo <span><i className="ri-user-3-fill">4</i></span></h4>
            <h5 className='font-medium text-sm '>2 mins away</h5>
            <p className='font-medium text-xs '>Affordable,compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹193.20</h2>
        </div>
        <div  onClick={()=>{
          props.setConfirmRidePanel(true)
        }}  className='flex border-2 border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
          <img className='h-12' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n" alt="" />
          <div className="-ml-4 w-1/2">
            <h4 className='font-medium text-base '>Moto <span><i className="ri-user-3-fill">1</i></span></h4>
            <h5 className='font-medium text-sm '>3 mins away</h5>
            <p className='font-medium text-xs '>Affordable motorcycle rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹65</h2>
        </div>
        <div  onClick={()=>{
          props.setConfirmRidePanel(true)
        }}  className='flex border-2 border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
          <img className='h-12' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6o89EzpWQuyHlR4xcLXzYQ3W3nifSnCHsCA&s" alt="" />
          <div className="w-1/2">
        <h4 className='font-medium text-base '>UberAuto <span><i className="ri-user-3-fill">3</i></span></h4>
         <h5 className='font-medium text-sm '>2 mins away</h5>
         <p className='font-medium text-xs '>Affordable Auto rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹118.99</h2>
        </div>
    </div>
  )
}

export default VehiclePanel