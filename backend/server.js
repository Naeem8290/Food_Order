const express = require("express")
const cors = require("cors")

const app =  express()

app.use(express.json())

app.use(cors()); // 👈 opens up all origins (not safe for production)


const frontendRoutes = require("./frontendRoute/frontendRoutes")

const mongoose = require("mongoose")

const dotenv = require("dotenv")
dotenv.config()

const PORT = process.env.PORT || 5001;


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected successfully")
    // app.listen(process.env.PORT ||8000 , ()=>{
    //     console.log("server is running on port 8000")
    // })

    

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
app.listen( PORT , ()=>{
    console.log("server is running on port 5000")
})