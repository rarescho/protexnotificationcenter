var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../db/userModel");
const jwt = require("jsonwebtoken");



router.post("/", (request, response) => {
    // hash the password
    response.setHeader('Access-Control-Allow-Origin', '*');
    console.log(request.body.auth_firebase);
    bcrypt
      .hash(request.body.auth_protex, 10)
      .then((hashedPassword) => {
        // create a new user instance and collect the data
        const user = new User({
          auth_protex: hashedPassword,
          auth_firebase: request.body.auth_firebase,
        });
        // save the new user
        user
          .save()
          // return success if the new user is added to the database successfully
          .then((result) => {
            response.status(201).send({
              message: "[SUCCESS] CREATED NEW",
              result,
            });
          })
          // catch erroe if the new user wasn't added successfully to the database
          .catch((error) => {
            User.findOne({ auth_firebase: request.body.auth_firebase })
            .then((user) => {
              // compare the password entered and the hashed password found
              bcrypt
                .compare(request.body.auth_protex, user.auth_protex)        
                // if the passwords match
                .then((passwordCheck) => {        
                  // check if password matches
                  if(!passwordCheck) {
                    return response.status(202).send({
                      message: "[ERROR] Browser appartenente ad un altro utente.",
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
                  response.status(202).send({
                    message: "[SUCCESS] LOGIN OK",
                    auth_protex: user.auth_protex,
                    token,
                  });
                })
                // catch error if password do not match
                .catch((error) => {
                  response.status(102).send({
                    message: "[ERROR] Password non corrisponde",
                    error,
                  });
                });
            })
            // catch error if email does not exist
            .catch((e) => {
              response.status(202).send({
                message: "[ERROR] Problemi ritrovamento utente",
                e,
              });
            });
          });
      })
      // catch error if the password hash isn't successful
      .catch((e) => {
        response.status(500).send({
          message: "ERROR pw",
          e,
        });
      });
  });
module.exports = router;
