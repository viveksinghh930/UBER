const axios = require('axios')
const captainModel = require ("../models/captain.model")

module.exports.getAddressCoordinate = async (address) => {
    // If already coordinates, return as is
    if (typeof address === 'object' && address.ltd && address.lng) {
        return address;
    }
    
    // If string address, geocode it
    if (typeof address !== 'string') {
        throw new Error('Address must be a string');
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;

    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "uber-clone/1.0"
            }
        });
        if ((response.data.length > 0)) {
            const { lat, lon } = response.data[0];
            return { ltd: lat, lng: lon };
        }
        else {
            throw new Error('Unable to fetch coordinates')
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const url = `http://router.project-osrm.org/route/v1/driving/${encodeURIComponent(origin.lng)},${encodeURIComponent(origin.ltd)};${encodeURIComponent(destination.lng)},${encodeURIComponent(destination.ltd)}?overview=false`;
   
    try {
        const response = await axios.get(url);
        
        if (!response.data.routes || response.data.routes.length === 0 || response.data.routes[0].distance === 0) {
            // Fallback to manual calculation
            const distance = calculateHaversineDistance(origin, destination);
            return {
                distance: distance.toFixed(2),
                duration: Math.round(distance * 3) // Assume 20 km/h average speed
            };
        }
      
        const route = response.data.routes[0];

        return {
            distance: (route.distance / 1000).toFixed(2), // km
            duration: Math.round(route.duration / 60)     // in minutes
        };
        
    } catch (error) {
        // Fallback to manual calculation
        const distance = calculateHaversineDistance(origin, destination);
        return {
            distance: distance.toFixed(2),
            duration: Math.round(distance * 3)
        };
    }
}

function calculateHaversineDistance(origin, destination) {
    const R = 6371; // Earth's radius in km
    const dLat = (parseFloat(destination.ltd) - parseFloat(origin.ltd)) * Math.PI / 180;
    const dLng = (parseFloat(destination.lng) - parseFloat(origin.lng)) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(parseFloat(origin.ltd) * Math.PI / 180) * Math.cos(parseFloat(destination.ltd) * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}


module.exports.getAutoCompleteSuggestions = async (input) => {

    if (!input) {
        throw new Error('Input is required');

    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&addressdetails=1&limit=5`;

    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "uber-clone/1.0"
            }
        });

        if (response.data.length === 0) {
            return [];  // koi suggestion nahi
        }

        // suggestions extract
        return response.data.map(item => ({
            display_name: item.display_name,
            lat: item.lat,
            lon: item.lon
        }));
}
    catch (error) {
        console.error(error);
        throw error;


    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius)=>{
    const captains = await captainModel.find({
        location:{
            $geoWithin:{
                $centerSphere: [[lng, ltd], radius/6371] // radius in km
            }
        }
    })
    return captains
}