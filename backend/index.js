const path = require('path');
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
//const { connectRedis } = require('./config/redis') 
const router = require('./routes')


const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))

// Middleware to parse JSON and Cookies
app.use(express.json())
app.use(cookieParser())

// Unlocks your local images folder to the internet
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use("/api",router)

// Fixed PORT logic
const PORT = process.env.PORT || 8080

// Boot up both databases (Mongo and Redis) before starting the server
connectDB().then(() => {
   // connectRedis() 
    
    app.listen(PORT, () => {
        console.log("connnect to DB")
        console.log("Server is running on port " + PORT)
    })
})