const axios = require('axios')
module.exports.getAddressCoordinate = async (address) => {

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;

    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "uber-clone/1.0"
            }
        });
        if ((response.data.length > 0)) {

            // const location = response.data[0]            
            const { lat, lon } = response.data[0];
            return { lat, lng: lon };
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

    const url = `http://router.project-osrm.org/route/v1/driving/${encodeURIComponent(origin.lng)},${encodeURIComponent(origin.lat)};${encodeURIComponent(destination.lng)},${encodeURIComponent(destination.lat)}?overview=false`;
   
  console.log(url);
  

    try {
        const response = await axios.get(url);
        if (!response.data.routes || response.data.routes.length === 0) {
            throw new Error("No route found");
        }
      
        const route = response.data.routes[0];

        return {
            distance: (route.distance / 1000).toFixed(2), // km
            duration: Math.round(route.duration / 60)     // in minutes
        };
        
    } catch (error) {
        console.error(error)
        throw error;
    }
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