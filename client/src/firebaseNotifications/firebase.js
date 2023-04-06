import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import axios from "axios";
import { ReactSession } from 'react-client-session';



var firebaseConfig = {
  apiKey: "AIzaSyDTWo6IJUsn3zv3MaLofgdKqiUx48-8EnI",
  authDomain: "protexnotificationcenter.firebaseapp.com",
  projectId: "protexnotificationcenter",
  storageBucket: "protexnotificationcenter.appspot.com",
  messagingSenderId: "425401308730",
  appId: "1:425401308730:web:cd291b3c1cc0e591ddc703",
  measurementId: "G-KCVSVCJJGP"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export var token = "";

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: `BCWpuVjlsjX3UuC6m3gbN1XIvQfXmIcelejC7cOF6f3WNWN-bw2ycKZFfOv-qthRY8EagOYujtvM9B3WLIwB0ns` })
    .then((currentToken) => {
      if (currentToken) {
        token = currentToken;
        ReactSession.set("token", token);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};



export const loginFirebase = () => {
  
    const token_firebase = ReactSession.get("token");
    console.log(ReactSession.get("token"))
    if (token_firebase != null){
    const configuration1 = {
      method: "post",
      url: "https://www.protex-dashboard.it/api/register/check",
      data: {
        token_firebase
      },
    }; 
    console.log(configuration1);
    axios(configuration1)
      .then((result) => {
        if (result.data.message.toUpperCase().includes("SUCCESS")){
          ReactSession.setStoreType("localStorage");
          ReactSession.set("username", result.data.auth_protex);
          return true;
        }else if(result.data.message.toUpperCase().includes("ERROR")){
          return false;
        }
      })
      .catch((error) => {
        error = new Error();
        return false;

      });
  }
};
// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {    
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });