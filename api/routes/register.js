var express = require('express');
var router = express.Router();
const User = require("../db/userModel");
const jwt = require("jsonwebtoken");



router.post("/", (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  console.log(request.body.auth_firebase);

  const user = new User({
    auth_protex: request.body.auth_protex,
    auth_firebase: request.body.auth_firebase,
  });
  console.log(user);
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
        if(request.body.auth_protex === user.auth_protex)       
      {
          // check if password matches
                
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
        } else{
        return response.status(202).send({
          message: "[ERROR] Browser appartenente ad un altro utente.",
          error,
        });
        }    
      })
      // catch error if email does not exist
      .catch((e) => {
        response.status(202).send({
          message: "[ERROR] Problemi ritrovamento utente",
          e,
        });
      });
    });
    
});
router.post("/check", async(req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { token_firebase } = req.body;
  const user = await User.findOne({ auth_firebase: token_firebase });
  console.log(user);
  if (!user) {
    return res.status(201).json({ message: '[ERROR] Problemi ritrovamento utente' });
  }else{
    res.status(202).send({
          message: "[SUCCESS] Utente esiste",
          auth_protex: user.auth_protex,
          auth_firebase: user.auth_firebase,
        });      
  }
});
module.exports = router;
