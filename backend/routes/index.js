const express = require('express')
const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')

// --- NEW IMPORT FOR PAYMENT ---
const paymentController = require('../controller/paymentController')

router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get("/user-details", authToken, userDetailsController)
router.get("/userLogout", userLogout)

//admin panel 
router.get("/all-user", authToken, allUsers)
router.post("/update-user", authToken, updateUser)

//product
router.post("/upload-product", authToken, UploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product", getCategoryWiseProduct)
router.post("/product-details", getProductDetails)
router.get("/search", searchProduct)
router.post("/filter-product", filterProductController)

//user add to cart
router.post("/addtocart", authToken, addToCartController)
router.get("/countAddToCartProduct", authToken, countAddToCartProduct)
router.get("/view-card-product", authToken, addToCartViewProduct)
router.post("/update-cart-product", authToken, updateAddToCartProduct)
router.post("/delete-cart-product", authToken, deleteAddToCartProduct)

// --- NEW PAYMENT ROUTE ---
// We use authToken because only logged-in users should be able to checkout
router.post("/checkout", authToken, paymentController)


// =======================================================
// --- NEW AI CHAT BRIDGE (RAG PIPELINE) ---
// =======================================================
router.get('/ai-chat', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ success: false, message: "Query parameter 'q' is required" });
        }

        // Proxy the request to your Python FastAPI server running on port 5000
        // We use encodeURIComponent to safely handle spaces and special characters
        const response = await fetch(`http://localhost:5000/ai-chat?query=${encodeURIComponent(query)}`);

        if (!response.ok) {
            throw new Error(`Python Server responded with status: ${response.status}`);
        }

        const data = await response.json();

        // Send the AI's response back to the React frontend
        res.json(data);
    } catch (error) {
        console.error("AI Bridge Error:", error.message);
        res.status(500).json({
            success: false,
            answer: "JARVIS is currently offline. Please check the AI server connection."
        });
    }
});

module.exports = router