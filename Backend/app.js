const dotenv = require('dotenv')
dotenv.config()
const cors = require("cors")
const express = require("express")
const app = express();

 
app.use(cors())

app.get("/",(req , res)=>{
res.send("hellow world")
})


module.exports = app;