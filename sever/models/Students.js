const mongoose = require("mongoose");

// Define the student schema
const StudentsSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  program: { type: String, required: true }, // Include the program field
});

// Create the model
const StudentsModel = mongoose.model("Studentdata", StudentsSchema);

module.exports = StudentsModel;