const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        // 1. Basic Input Validation
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide both email and password",
                error: true,
                success: false
            });
        }

        // 2. Fetch User Profile from Database
        const user = await userModel.findOne({ email: email.toLowerCase().trim() });

        // 3. AMORING THE RESPONSE: Use a single unified check condition
        // If user doesn't exist, this fails cleanly without revealing user presence
        const isPasswordCorrect = user ? await bcrypt.compare(password, user.password) : false;

        if (!user || !isPasswordCorrect) {
            return res.status(401).json({ // Strictly 401 Unauthorized
                message: "Invalid email or password", // Unified generic message
                error: true,
                success: false
            });
        }

        // 4. PERFORMANCE OPTIMIZATION: Inject the role into the stateless token data payload
        const tokenData = {
            _id: user._id,
            email: user.email,
            role: user.role // Added! No more redundant DB lookups for authorization guards
        };

        // 5. Generate secure JWT Token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

        // 6. Cookie configuration tuned for Environment contexts
        const tokenOption = {
            httpOnly: true, // Prevents XSS script read attacks
            secure: process.env.NODE_ENV === 'production', // Use secure cookies only over HTTPS in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' // Handles cross-domain routing safely
        };

        // 7. Standard Clean Success Response Context
        return res.cookie("token", token, tokenOption).status(200).json({
            message: "Login successful",
            data: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            success: true,
            error: false
        });

    } catch (err) {
        return res.status(500).json({ // 500 for true structural execution runtime failures
            message: err.message || "An unexpected error occurred during sign-in",
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;
