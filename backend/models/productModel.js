const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        maxlength: [120, "Product name cannot exceed 120 characters"]
    },
    brandName: {
        type: String,
        required: [true, "Brand name is required"],
        trim: true
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
        trim: true,
        lowercase: true // Normalizes categories (e.g., "Mobile" and "mobile" become the same)
    },
    productImage: {
        type: [String], // Strictly enforces an array of Strings (URLs)
        validate: {
            validator: function(array) {
                return array.length > 0;
            },
            message: "A product must have at least one image"
        }
    },
    description: {
        type: String,
        required: [true, "Product description is required"]
    },
    price: {
        type: Number,
        required: [true, "Original price is required"],
        min: [0, "Price cannot be less than 0"]
    },
    sellingPrice: {
        type: Number,
        required: [true, "Selling price is required"],
        min: [0, "Selling price cannot be less than 0"],
        validate: {
            // Ensures the discount price isn't accidentally higher than the original price
            validator: function(value) {
                return value <= this.price;
            },
            message: "Selling price cannot be greater than the original price"
        }
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
        min: [0, "Stock cannot be negative"] // Crucial for preventing negative inventory
    }
}, {
    timestamps: true
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
