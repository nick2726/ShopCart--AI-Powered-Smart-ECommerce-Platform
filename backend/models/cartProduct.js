const mongoose = require('mongoose')

const addToCartSchema = new mongoose.Schema({
   productId : {
        type: mongoose.Schema.Types.ObjectId, // CRITICAL: Use ObjectId for database references
        ref: 'product', // Tells Mongoose to look in the 'product' collection
        required: [true, "Product ID is required"]
   },
   quantity : {
        type: Number,
        required: true,
        default: 1,
        min: [1, "Quantity cannot be less than 1"], // Prevents negative or zero quantity bugs
        max: [10, "You cannot buy more than 10 of this item"] // Optional: prevents bulk-buy exploitation
   },
   userId : {
        type: mongoose.Schema.Types.ObjectId, // Links directly to the User collection
        ref: 'user',
        required: [true, "User ID is required"]
   },
},{
    timestamps : true
})

const addToCartModel = mongoose.model("addToCart", addToCartSchema)

module.exports = addToCartModel
