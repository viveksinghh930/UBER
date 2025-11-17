const socketIo = require('socket.io')
const userModel = require('./models/user.model')
const captainModel = require("./models/captain.model")

let io;
function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })
    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`)

        socket.on('join', async (data) => {
            const { userId, userType } = data;
            console.log(`User joining: ${userId}, Type: ${userType}`);

            try {
                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, {
                        socketId: socket.id
                    })
                    console.log(`User ${userId} socketId updated: ${socket.id}`);
                } else if (userType === 'captain') {
                    const result = await captainModel.findByIdAndUpdate(userId, { socketId: socket.id }, { new: true })
                    if (result) {
                        console.log(`Captain ${userId} socketId updated: ${socket.id}`);
                        console.log('Updated captain:', result.socketId);
                    } else {
                        console.log(`Captain with ID ${userId} not found`);
                    }
                }
            } catch (error) {
                console.log('Error updating socketId:', error);
            }
        })

        socket.on("update-location-captain", async(data)=>{
            const { userId, location} = data;
            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', {message:'Invalid location data'})
            }
            try {
                const result = await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    }
                }, { new: true })
                console.log(`Captain ${userId} location updated:`, location);
                console.log('Updated captain location in DB:', result.location);
            } catch (error) {
                console.log('Error updating captain location:', error);
            }
        })

        socket.on(`disconnect`, () => {
            console.log(`Client disconnect: ${socket.id}`)
           

        })
    })
}

function sendMessageToSocketId(socketId, messageObject) {
    console.log(`Sending message to ${socketId}`,messageObject);
    
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);

    } else {
        console.log('Socket.io not initialized');

    }
}

module.exports = { initializeSocket, sendMessageToSocketId }