const mongoose = require("mongoose")

function connectToDb() {
    console.log("DB_CONNECT:", process.env.DB_CONNECT);
    mongoose.connect(process.env.DB_CONNECT
    ).then(() => {
        console.log("Connected Database");
        

    }).catch(err => console.log(err));
}

module.exports = connectToDb;