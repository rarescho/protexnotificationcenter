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
export var token_firebase = "";

export const getUsername = () => {
  getToken(messaging, { vapidKey: `BCWpuVjlsjX3UuC6m3gbN1XIvQfXmIcelejC7cOF6f3WNWN-bw2ycKZFfOv-qthRY8EagOYujtvM9B3WLIwB0ns` })
    .then((currentToken) => {
      if (currentToken) {
        token = currentToken;
        token_firebase = currentToken;
// inizio controllo login
      if (token_firebase != null){
        const configuration = {
          method: "post",
          url: "https://www.protex-dashboard.it/api/register/check",
          data: {
            token_firebase
          },
        }; 
        axios(configuration)
          .then((result) => {
            if (result.data.message.toUpperCase().includes("SUCCESS")){
              ReactSession.setStoreType("localStorage");
              ReactSession.set("username", result.data.auth_protex);
              console.log(result.data.auth_protex);
              return result.data.auth_protex;
            }else if(result.data.message.toUpperCase().includes("ERROR")){
              return null;
            }
          })
          .catch((error) => {
            if(error.response.status === 201){
              console.log(error.response.data.message)
              return null;

            }
          });
      }
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        return null;

      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      return null;

    });
}

export const requestForToken = (navigate) => {
  
  return getToken(messaging, { vapidKey: `BCWpuVjlsjX3UuC6m3gbN1XIvQfXmIcelejC7cOF6f3WNWN-bw2ycKZFfOv-qthRY8EagOYujtvM9B3WLIwB0ns` })
    .then((currentToken) => {
      if (currentToken) {
        token = currentToken;
        token_firebase = currentToken;
// inizio controllo login
      if (token_firebase != null){
        const configuration = {
          method: "post",
          url: "https://www.protex-dashboard.it/api/register/check",
          data: {
            token_firebase
          },
        }; 
        console.log(configuration);
        axios(configuration)
          .then((result) => {
            if (result.data.message.toUpperCase().includes("SUCCESS")){
              ReactSession.setStoreType("localStorage");
              ReactSession.set("username", result.data.auth_protex);
              navigate("/Timeline")
            }else if(result.data.message.toUpperCase().includes("ERROR")){
            }
          })
          .catch((error) => {
            if(error.response.status === 201){
              console.log(error.response.data.message)
            }
          });
      }




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

export const requestForTokenRegister = (navigate,protexlogin) => {
  
  return getToken(messaging, { vapidKey: `BCWpuVjlsjX3UuC6m3gbN1XIvQfXmIcelejC7cOF6f3WNWN-bw2ycKZFfOv-qthRY8EagOYujtvM9B3WLIwB0ns` })
    .then((currentToken) => {
      if (currentToken) {
        token = currentToken;
        token_firebase = currentToken;
// inizio controllo login
      if (token_firebase != null){
        const configuration = {
          method: "post",
          url: "https://www.protex-dashboard.it/api/register/check",
          data: {
            token_firebase
          },
        }; 
        console.log(configuration);
        axios(configuration)
          .then((result) => {
            if (result.data.message.toUpperCase().includes("SUCCESS")){
              ReactSession.setStoreType("localStorage");
              ReactSession.set("username", result.data.auth_protex);

              navigate("/Timeline")
            }else if(result.data.message.toUpperCase().includes("ERROR")){

              const configuration1 = {
                method: "post",
                url: "https://www.protex-dashboard.it/api/register",
                data: {
                    'auth_firebase' : token_firebase,
                    'auth_protex' : protexlogin,
                },
              };
              console.log(configuration1);
                  // make the API call
              axios(configuration1)
              .then((result1) => {
                  console.log(result1.data);
                  if (result1.data.message.toUpperCase().includes("SUCCESS")){
                    ReactSession.setStoreType("localStorage");
                    ReactSession.set("username", protexlogin);

                      navigate("/Timeline")
                      }else if(result1.data.message.toUpperCase().includes("ERROR")){
                          return;
                      }
              })
              .catch((error1) => {
                  return error1;
              });
            }
          })
          .catch((error) => {
            if(error.response.status === 201){
              console.log(error.response.data.message)
            }
          });
      }




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


// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {    
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });