import React from 'react'

const LocationSearchPanel = (props) => {



  const location = [
    "24b,Near kapoor's cafe , vivek  tomar home",
    "6b,Near kapoor's cafe , v tomar home",
    "22b,Near kapoor's cafe , vivek singh tomar home",
    "17b,Near kapoor's cafe ,  singh tomar home",


  ]
  return (


    <div>
      {
        location.map(function (elem, index) {
          return <div key={index} onClick={() => {
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
          }}
            className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl  items-center my-2 justify-start">
            <h2 className=" bg-[#eee] h-8 flex items-center justify-center w-10 rounded-full"><i className="ri-map-pin-fill"></i></h2>
            <h4 className="font-medium">{elem} </h4>
          </div>
        })
      }

    </div>
  )
}

export default LocationSearchPanel  