var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../db/userModel");
const jwt = require("jsonwebtoken");

router.post("/", (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    User.findOne({ auth_firebase: request.body.auth_firebase })
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.auth_protex, user.auth_protex)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if(!passwordCheck) {
            return response.status(400).send({
              message: "(101) Questo browser non è mai stato registrato.",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userAuth_protex: user.auth_protex,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(100).send({
            message: "(100) Login Successful",
            auth_protex: user.auth_protex,
            token,
          });
        })
        // catch error if password do not match
        .catch((error) => {
          response.status(102).send({
            message: "(102) Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Nessun utente protex registrato",
        e,
      });
    });
});
module.exports = router;
