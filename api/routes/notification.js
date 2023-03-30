var express = require("express");
var router = express.Router();
const Notification = require("../db/notificationModel");
const admin = require('firebase-admin');
const User = require("../db/userModel");
const serviceAccount = require("../config/protexnotificationcenter-firebase-adminsdk-56w0d-d9c3c17391.json");
var firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});




function sendPushNotification(message){
    admin.messaging().send(message).then((response) =>{
        console.log('ok', response);
    }).catch((error) => {
        console.log('error', error);
    });
}

router.post("/", function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    User.findOne({ auth_protex: req.body.auth_protex })
    .then((user) => {
        console.log(user);
        
        const notification = new Notification({
            auth_protex: request.body.auth_protex,
            auth_firebase: request.body.auth_firebase,
          });

          const message = {
            notification:{
                title: req.body.title,
                body: req.body.message,
            },
            token: user.auth_firebase
        };
          notification.save()
          .then((result) =>{
            console.log(message)
            sendPushNotification(message);
            res.status(201).send("Notifica inviata");
          })
          .catch((error) => {
            res.status(404).send({
                message: "Errore salvataggio notifica.",
                e,
              });
          });
        
    })
    .catch((e) => {
        console.log(e);
        res.status(404).send({
          message: "Nessun utente protex registrato",
          e,
        });
      });   
});






module.exports = router;