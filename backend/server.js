const express = require("express")




const app =  express()


app.use(express.json())

const frontendRoutes = require("./frontendRoute/frontendRoutes")

const mongoose = require("mongoose")

const dotenv = require("dotenv")
dotenv.config()

mongoose.connect(process.env.URI).then(()=>{
    console.log("connected successfully")
    app.listen(process.env.PORT ||8000 , ()=>{
        // console.log("server is running on port 8000")
    })

}).catch((error)=>{
    console.log("connection failed" , error)
})



const serverless = require("serverless-http");
module.exports.handler = serverless(app);


app.use(express.static("public"))
app.use("/api" , frontendRoutes)
app.listen(5001 , ()=>{
    console.log("server is running on port 5000")
})