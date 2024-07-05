const { Router } = require("express");
const router = Router();
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    const { name, email, password } = req.body;

    try {
       const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send("User already exists");
        }
       const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
         const newUser = await User.create({ name, email, password: hashedPassword });

        res.status(201).json(newUser); 
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send("Internal server error"); 
    }
});

module.exports = router;
