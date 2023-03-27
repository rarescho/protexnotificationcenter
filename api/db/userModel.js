const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    // chiave per autenticazione protex
    auth_protex: {
      type: String,
      required: true
    },
  
    //   chiave per notifiche firebase
    auth_firebase: {
      type: String,
      required: true,
      unique: true
    }
  });

  // export UserSchema
  module.exports = mongoose.model("users", UserSchema);