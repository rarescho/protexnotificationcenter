import React, { useEffect,useState } from 'react'
import PushNotification from 'react-native-push-notification'
import AsyncStorage from '@react-native-async-storage/async-storage';


const RemotePushController = () => {
  const [tokenSave, setTokenSave] = useState("");

  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        
        setTokenSave(token);
        // save token in local storage of the device
        AsyncStorage.setItem('token', token.token);
        
        console.log('TOKEN:', token)
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('REMOTE NOTIFICATION ==>', notification)
        // process the notification here
      },
      // Android only: GCM or FCM Sender ID
      senderID: '425401308730',
      popInitialNotification: true,
      requestPermissions: true
    })
  }, [])
  return null
}
export default RemotePushController