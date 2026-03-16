const mongoose = require("mongoose")

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("✅ Connected to MongoDB successfully!") // Added success message
    }catch(err){
        console.log("❌ MongoDB Connection Failed:", err)
        process.exit(1) // THE FIX: This forces the server to stop if the database fails!
    }
}

module.exports = connectDB