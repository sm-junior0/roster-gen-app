const { Router } = require("express");
const router = Router();
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "TopSecret"; 

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("User not found");
        }
       const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send("Passwords don't match");
        }
const token = jwt.sign(
            {
                userId: user._id,
                userEmail: user.email
            },
            secret,
            { expiresIn: "24h" }
        );                                                                                                                                                                                                                                                                                      
        res.status(200).json({ message: "Logged in successfully", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
