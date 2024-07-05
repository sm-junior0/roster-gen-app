// models/data.model.js
const mongoose = require("mongoose");

const nurseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

const Nurse = mongoose.model("Nurse", nurseSchema);
module.exports = Nurse;
