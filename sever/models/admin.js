const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  privatekey: String,
});

const adminModel = mongoose.model('admindata', adminSchema);

module.exports = adminModel;
