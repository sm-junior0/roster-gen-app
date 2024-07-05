const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
// const register = require("./auth/apis/Register.js")
// const login = require("./auth/apis/login.js")
const timetable = require("./timetable/endpoint.js")
app.use(express.json());
const bodyParser = require("body-parser");  
const Nurse = require("./models/data.model");  
app.use(cors());
app.use(bodyParser.json());

mongoose
    .connect("mongodb://127.0.0.1:27017/nurse", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection error:", err));

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// app.use("/register",register)
// app.use("/login",login)
app.use("/generate-timetable",timetable)
app.post("/New", async (req, res) => {
    try {
        const { name, department } = req.body;
        const data = {
            name: name,
            department: department
        }
        const newNurse = await Nurse.create(data);
        res.status(201).json(newNurse);  // Respond with the created nurse
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});


app.get("/all", async (req, res) => {
    try {
        const data = await Nurse.find(); 
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

app.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Nurse.findByIdAndDelete(id); 
        if (!data) {
            return res.status(404).json({ msg: "Data not found" });
        }
        res.status(200).json({ msg: "Data is deleted" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

app.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;  
        const { name, department } = req.body;
        const data = await Nurse.findByIdAndUpdate(id, { name, department }, { new: true }); // Use Nurse model here and { new: true } to return updated document
        if (!data) {
            return res.status(404).json({ msg: "Data not found" });
        }
        res.status(200).json({ msg: "Data is updated" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

app.get("/get/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Nurse.findById(id); 
        if (!data) {
            return res.status(404).json({ msg: "Data not found" });
      }
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

