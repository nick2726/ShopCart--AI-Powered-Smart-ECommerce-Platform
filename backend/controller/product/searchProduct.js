const axios = require('axios');
const productModel = require("../../models/productModel"); // Required to query your DB

const searchProduct = async (req, res) => {
    try {
        const { q } = req.query;
        
        // 1. Try normal database search (Exact keyword matches)
        let products = await productModel.find({
            "$or": [
                { productName: { "$regex": q, "$options": "i" } },
                { category: { "$regex": q, "$options": "i" } }
            ]
        });

        // 2. The AI FALLBACK (Semantic matching for vibes/intent)
        if (products.length === 0 && q) {
            console.log(`No exact matches for "${q}". Querying AI Service...`);
            
            try {
                // Querying the local Python AI microservice
                const aiResponse = await axios.get(`http://localhost:5000/search?query=${encodeURIComponent(q)}`);
                
                if (aiResponse.data && aiResponse.data.success) {
                    products = aiResponse.data.data;
                }
            } catch (aiError) {
                // Fails gracefully if the AI terminal is closed
                console.error("AI Service is unreachable:", aiError.message);
            }
        }
        // 3. Final Response (Guarantee data is an array)
        res.json({
            data: products || [], // <-- Added || [] here
            message: products?.length > 0 ? "Search results found" : "No products match your query",
            success: true
        });

    } catch (err) {
        // Catch any overall backend errors and SEND AN EMPTY ARRAY
        res.status(500).json({ 
            data: [], // <-- Added this so React never gets 'undefined'
            message: err.message || err, 
            error: true,
            success: false 
        });
    }
}

module.exports = searchProduct;
