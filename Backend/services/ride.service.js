const rideModel = require("../models/ride.model");
const { distinct } = require("../models/user.model");
const mapService = require('./maps.service')
const crypto = require('crypto');
async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error("Pickup and destination are required");
    }
    const pickupCoords = await mapService.getAddressCoordinate(pickup)
    const destinationCoords = await mapService.getAddressCoordinate(destination)
    const distanceTime = await mapService.getDistanceTime(pickupCoords, destinationCoords);


    const baseFare = {
        auto: 35,
        car: 60,
        moto: 25
    };
    const perKmRate = {
        auto: 10,
        car: 20,
        moto: 6
    }
  const perMinuteRate = {
    auto: 1,
    car: 2,
    moto: 1
};


    const fare = {
        auto:
            baseFare.auto +
            (distanceTime.distance * perKmRate.auto) +
            (distanceTime.duration * perMinuteRate.auto),

        car:
            baseFare.car +
            (distanceTime.distance * perKmRate.car) +
            (distanceTime.duration * perMinuteRate.car),

        moto:
            baseFare.moto +
            (distanceTime.distance * perKmRate.moto) +
            (distanceTime.duration * perMinuteRate.moto)
    };

    return fare
}
module.exports.getFare = getFare
 function getOtp(num){
    function generateOtp(num){
        const otp = crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
        return otp
    }
    return generateOtp(num)
 }

module.exports.createRide = async ({
    user,
    pickup,
    destination,
    vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("All fields are required");
    }
    const fare = await getFare(pickup, destination);
    console.log(fare);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        vehicleType,
        otp:getOtp(6),
        fare: fare[vehicleType]
    });
    return ride;
}


