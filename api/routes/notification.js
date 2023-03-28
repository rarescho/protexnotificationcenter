var express = require("express");
var router = express.Router();

const admin = require('firebase-admin');
const registrationToken = 'e39rlhlz__PpU1iGMiaQ5z:APA91bHUD8igNRqniZlY9q1S3A6--jnwhG9fo-oAeTc2X8cmZ5MTokbvoaJ_fZLf0e5wxb_OiDVy0hTwSU2JE0jFEDtZnT8pVs4wHu0S1TIrJI5jQhVvJ2fydFli4N-WwOL9E1WhVDSi';
const serviceAccount = require("../config/protexnotificationcenter-firebase-adminsdk-56w0d-d9c3c17391.json");
var firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const titleMessage= 'cè un nuova ordine in citta';
const bodyMessage = 'CIAO';


const message = {
    notification:{
        title: titleMessage,
        body: bodyMessage,
    },
    token: registrationToken
}
function sendPushNotification(message){
    admin.messaging().send(message).then((response) =>{
        console.log('ok', response);
    }).catch((error) => {
        console.log('error', error);
    });
}

router.get("/", function(req, res, next) {
    sendPushNotification(message);
    res.send("Notifica inviata");
});

module.exports = router;