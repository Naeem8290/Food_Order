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

//-----------------------------------------------------------Vercel------------
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error(err));

// const serverless = require("serverless-http");
// module.exports.handler = serverless(app);
//---------------------Vercel-----------------------------------------------------


app.use(express.static("public"))
app.use("/api" , frontendRoutes)
app.listen(5001 , ()=>{
    console.log("server is running on port 5000")
})