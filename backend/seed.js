const mongoose = require('mongoose');

// 1. Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect:", err));

const productSchema = new mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [String],
    description: String,
    price: Number,
    sellingPrice: Number
},{ timestamps : true });

const Product = mongoose.model('product', productSchema);

// 2. The exact categories your React UI expects!
const validCategories = [
    "airpodes", "camera", "earphones", "mobiles", "mouse", 
    "printers", "processor", "refrigerator", "speakers", 
    "trimmers", "televisions", "watches"
];

// 3. The Smart Seeding Function
async function fixAndSeedDatabase() {
    try {
        console.log("🧹 Cleaning out old, mismatched products...");
        await Product.deleteMany({}); // This deletes the old broken data!

        console.log("Fetching 150 products from DummyJSON...");
        const response = await fetch('https://dummyjson.com/products?limit=150');
        const data = await response.json();
        
        console.log("Translating categories to match your UI...");
        const formattedProducts = data.products.map((item, index) => {
            
            // Magic Trick: This spreads the 12 valid categories evenly across all 150 products
            const assignedCategory = validCategories[index % validCategories.length];

            return {
                productName: item.title,
                brandName: item.brand || "Generic",
                category: assignedCategory, // Matches the frontend exactly!
                productImage: item.images,
                price: Math.round(item.price * 80 * 1.2),
                sellingPrice: Math.round(item.price * 80),
                description: item.description
            }
        });

        console.log(`Injecting ${formattedProducts.length} perfectly matched products...`);
        await Product.insertMany(formattedProducts);
        
        console.log("✅ Success! Categories are fixed and store is stocked.");
        process.exit(); 
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

fixAndSeedDatabase();