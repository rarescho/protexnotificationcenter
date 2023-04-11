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
        const message = {
            notification:{
                title: req.body.title,
                body: req.body.message,
            },
            token: user.auth_firebase
        };
        const timestamp = padRight((Math.floor(Date.now() / 1000)),13,'0');
        const notification = new Notification({
            title: req.body.title,
            subtitle: req.body.subtitle,
            message: req.body.message,
            auth_protex: user._id,
            utenteInvio : req.body.utenteInvio,
            status: "INVIATA",
            dataora: timestamp
          });         
          notification.save()
          .then((result) =>{
            sendPushNotification(message);
            res.status(201).send("Notifica inviata");
          })
          .catch((error) => {
            res.status(404).send({
                message: "Errore salvataggio notifica.",
                error,
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
function padRight(value, length, padding) {
    value = value.toString();
    padding = padding || ' ';
    while (value.length < length) {
      value += padding;
    }
    return value;
  }

router.post('/xuser', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 

    try {
      const { auth_protex } = req.body;
      const user = await User.findOne({ auth_protex });
      if (!user) {
        return res.status(401).json({ message: 'Utente non valido' });
      }else{
        const notifications = await Notification.find({ auth_protex: user._id });
        if (!notifications || notifications.length === 0) {
          res.status(404).send('Nessuna notifica disponibile');
        } else {
          console.log(notifications);
          res.send(notifications);
        }
      }

     
    } catch (error) {
      console.error(error);
      res.status(500).send('Errore nella ricerca delle notifiche');
    }
  });



// router.get("/xuser/:auth_protex", (req, res) => {
//     const auth_protex = req.params.auth_protex;
//     Notification.find({ auth_protex: auth_protex }, (err, notifications) => {
//       if (err) {
//         console.error("Errore durante la ricerca delle notifiche", err);
//         res.status(500).send("Errore durante la ricerca delle notifiche"); // Risposta di errore 500 Internal Server Error
//       } else {
//         res.json(notifications); // Risposta con la lista di notifiche
//       }
//     });
//   });

module.exports = router;