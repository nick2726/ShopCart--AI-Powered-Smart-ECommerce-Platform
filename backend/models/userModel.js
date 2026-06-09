const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Please provide a name"],
        trim: true // Removes accidental spaces like " Nikhil " -> "Nikhil"
    },
    email : {
        type : String,
        unique : true,
        required : [true, "Please provide an email"],
        trim: true,
        lowercase: true, // Forces "User@gmail.com" to "user@gmail.com" to prevent duplicate accounts
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] // Regex to ensure format is x@y.z
    },
    password : {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    profilePic : {
        type: String,
        default: "" // Good practice to have a default empty string or a default avatar URL
    },
    role : {
        type: String,
        enum: ["GENERAL", "ADMIN"], // CRITICAL: Only allows these exact strings. Rejects typos like "admin" or "SuperUser"
        default: "GENERAL" // If the frontend forgets to send a role, they safely default to a standard user
    },
},{
    timestamps : true
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel
