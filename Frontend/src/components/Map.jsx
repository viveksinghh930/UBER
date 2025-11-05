import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const Map = ({ pickup, destination, height = "300px" }) => {
  const defaultCenter = [23.2599, 77.4126] // Bhopal coordinates
  
  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={13} 
      style={{ height, width: '100%' }}
      className="rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://router.project-osrm.org/route/v1/driving/">OpenStreetMap</a> contributors'
      />
      
      {pickup && (
        <Marker position={pickup}>
          <Popup>Pickup Location</Popup>
        </Marker>
      )}
      
      {destination && (
        <Marker position={destination}>
          <Popup>Destination</Popup>
        </Marker>
      )}
    </MapContainer>
  )
}

export default Map