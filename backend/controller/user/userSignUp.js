const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        // 1. IMMEDIATE INPUT VALIDATION (Before database touch)
        if (!email || !password || !name) {
            return res.status(400).json({
                message: "Please fill out all required fields: name, email, and password.",
                error: true,
                success: false
            });
        }

        // Sanitization & Normalization
        const cleanEmail = email.toLowerCase().trim();
        const cleanName = name.trim();

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long.",
                error: true,
                success: false
            });
        }

        // 2. DUPLICATE ACCOUNT CHECK (Using cleaned criteria)
        const existingUser = await userModel.findOne({ email: cleanEmail });
        if (existingUser) {
            return res.status(409).json({ // 409 Conflict status code
                message: "An account with this email address already exists.",
                error: true,
                success: false
            });
        }

        // 3. TRUE ASYNCHRONOUS CRYPTO HASHING (Non-blocking event loop)
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // 4. SECURE PAYLOAD MAPPING (Preventing mass assignment manipulation)
        const securePayload = {
            name: cleanName,
            email: cleanEmail,
            password: hashPassword,
            role: "GENERAL" // Strict role lock allocation
        };

        const newUserData = new userModel(securePayload);
        const saveUser = await newUserData.save();

        // 5. SECURING RESPONSES: Strip sensitive data out before returning
        const userResponse = {
            _id: saveUser._id,
            name: saveUser.name,
            email: saveUser.email,
            role: saveUser.role
        };

        return res.status(201).json({
            data: userResponse,
            success: true,
            error: false,
            message: "User account created successfully!"
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message || "An internal error occurred during registration.",
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;
