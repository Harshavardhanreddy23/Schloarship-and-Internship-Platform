const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const StudentsModel = require("./models/Students");
const adminModel = require("./models/admin");

const app = express();
app.use(express.json());
app.use(cors());

// Create separate connections for Students and Admin databases
const studentsConnection = mongoose.createConnection(
  "mongodb+srv://Rohini1305:Rohini1305db@cluster0.htaqbgz.mongodb.net/Students"
);

studentsConnection.once("open", () => {
  console.log("Connected to Students database");
});

studentsConnection.on("error", (err) => {
  console.error("Error connecting to Students database:", err);
});

const adminConnection = mongoose.createConnection(
  "mongodb+srv://Rohini1305:Rohini1305db@cluster0.htaqbgz.mongodb.net/admin"
);

adminConnection.once("open", () => {
  console.log("Connected to Admin database");
});

adminConnection.on("error", (err) => {
  console.error("Error connecting to Admin database:", err);
});

// Student Routes
app.post("/signup", (req, res) => {
  const { email, username, password, program } = req.body;
  if (!email || !username || !password || !program) {
    return res.status(400).json({ message: "All fields are required" });
  }
  studentsConnection.collection("studentdata").insertOne({ email, username, password, program })
    .then((result) => res.status(201).json({ message: "Student registered successfully", result }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  studentsConnection.collection("studentdata").findOne({ email, password })
    .then((student) => {
      if (student) {
        res.status(200).json({
          message: "Sign in successful",
          role: "student",
          email: student.email,
          token: "dummy-token" // Replace with real JWT token if needed
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Admin Routes
app.post("/adminsignup", (req, res) => {
  const { email, password, privatekey } = req.body;
  if (!email || !password || !privatekey) {
    return res.status(400).json({ message: "Email, password, and private key are required" });
  }
  adminConnection.collection("admindata").insertOne({ email, password, privatekey })
    .then(admin => res.status(201).json({ message: "Signup successful", admin }))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post("/adminsignin", (req, res) => {
  const { email, password } = req.body;
  adminConnection.collection("admindata").findOne({ email, password })
    .then((admin) => {
      if (admin) {
        res.status(200).json({ message: "Sign in successful", role: "admin" });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Admin entry addition (scholarship/internship)
app.post("/admin/add-entry", (req, res) => {
  const { type, title, description, link } = req.body;

  if (!type || !title || !description || !link) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const collectionName = type === "scholarship" ? "scholarships" : "internships";

  adminConnection.collection(collectionName).insertOne({ title, description, link })
    .then(() => res.status(201).json({ message: `${type} added successfully` }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// ✅ Route to fetch all scholarships and internships
app.get('/student/opportunities', async (req, res) => {
  try {
    const scholarships = await adminConnection.collection('scholarships').find({}).toArray();
    const internships = await adminConnection.collection('internships').find({}).toArray();

    res.status(200).json({ scholarships, internships });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
