const mongoose = require("mongoose");
const User = require("../db/userModel");

const NotificationSchema = new mongoose.Schema({
    // chiave per autenticazione protex
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    auth_protex: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users',
        required: true,
    },
    status: {
        type: String,
        required: false
    }
  });

  // export UserSchema
  module.exports = mongoose.model("notifications", NotificationSchema);