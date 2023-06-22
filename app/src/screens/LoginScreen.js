import React, { useState,useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { notifications, NotificationMessage, Android } from 'react-native-firebase-push-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function LoginScreen({ navigation }) {
  const [auth_protex, setAuth_protex] = useState('');
  const [auth_firebase, setAuth_firebase] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          // Token found, set it in the state
          setAuth_firebase(value);
  
          const configuration = {
            method: "post",
            url: "https://www.protex-dashboard.it/api/register/check",
            data: {
              token_firebase: value, // Utilizza il valore di auth_firebase qui
            },
          };
  
          console.log("1", configuration); // ok
  
          // Esegui la chiamata API Axios
          const result = await axios(configuration);
          console.log("result: ",result.data);
          if (result.data.message.toUpperCase().includes("SUCCESS")) {
            AsyncStorage.setItem('username', JSON.stringify(result.data.auth_protex));
            setAuth_protex(result.data.auth_protex);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            });
          } else if (result.data.message.toUpperCase().includes("ERROR")) {
            const configuration1 = {
              method: "post",
              url: "https://www.protex-dashboard.it/api/register",
              data: {
                'auth_firebase': value,
                'auth_protex': JSON.stringify(result.data.auth_protex),
              },
            };
            console.log("2",configuration1);
  
            // Esegui la seconda chiamata API Axios
            const result1 = await axios(configuration1);
  
            console.log(result1.data);
            if (result1.data.message.toUpperCase().includes("SUCCESS")) {
              AsyncStorage.setItem('username', JSON.stringify(result.data.auth_protex));
              setAuth_protex(result.data.auth_protex);
              navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
              });
            } else if (result1.data.message.toUpperCase().includes("ERROR")) {
              return;
            }
          }
        } else {
          // Token not found
          setAuth_firebase(null);
        }
      } catch (error) {
        // Error retrieving data
        console.log(error);
        setAuth_firebase(null);
      }
    };
  
    fetchData();
  }, []);
  
  // useEffect(() => {

  //   const getVariable = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem('token');
  //       if (value !== null) {
  //         // Token found, set it in the state
  //         setAuth_firebase(value);
  //       } else {
  //         // Token not found
  //         setAuth_firebase(null);
  //       }
  //     } catch (error) {
  //       // Error retrieving data
  //       console.log(error);
  //       setAuth_firebase(null);
  //     }
  //   };
  //   getVariable();

  //   const configuration = {
  //     method: "post",
  //     url: "https://www.protex-dashboard.it/api/register/check",
  //     data: {
  //       auth_firebase
  //     },
  //   }; 
  //   console.log("1",configuration);
  //   axios(configuration)
  //     .then((result) => {
  //       if (result.data.message.toUpperCase().includes("SUCCESS")){
  //         AsyncStorage.setItem('username', JSON.stringify(result.data.auth_protex));
  //         navigation.reset({
  //           index: 0,
  //           routes: [{ name: 'Dashboard' }],
  //         });
  //         }else if(result.data.message.toUpperCase().includes("ERROR")){

  //         const configuration1 = {
  //           method: "post",
  //           url: "https://www.protex-dashboard.it/api/register",
  //           data: {
  //               'auth_firebase' : auth_firebase,
  //               'auth_protex' : auth_protex,
  //           },
  //         };
  //         console.log(configuration1);
  //             // make the API call
  //         axios(configuration1)
  //         .then((result1) => {
  //             console.log(result1.data);
  //             if (result1.data.message.toUpperCase().includes("SUCCESS")){
  //               AsyncStorage.setItem('username', JSON.stringify(result.data.auth_protex));
  //               navigation.reset({
  //                 index: 0,
  //                 routes: [{ name: 'Dashboard' }],
  //               })
  //                 }else if(result1.data.message.toUpperCase().includes("ERROR")){
  //                     return;
  //                 }
  //         })
  //         .catch((error1) => {
  //             return error1;
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       if(error.response.status === 201){
  //         console.log(error.response.data.message)
  //       }
  //     });




    
  // }, []);
  const onLoginPressed = async () => {       
          // const configuration = {
          //   method: "post",
          //   url: "https://www.protex-dashboard.it/api/register",
          //   data: {
          //     token,
          //     username,
          //   },
          // };
          console.log(auth_protex);
          axios.post('https://www.protex-dashboard.it/api/register', {
             auth_firebase,
             auth_protex,
            })
            .then((result) => {
              if (result.data.message.toUpperCase().includes("SUCCESS")){
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Dashboard' }],
                })
              }else if(result.data.message.toUpperCase().includes("ERROR")){
                console.log(result);
              }
            })
            .catch((error) => {
              error = new Error();
            });
          
        };
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Benvenuto </Header>
      <TextInput
        label="Utente"
        returnKeyType="next"
        value={auth_protex}
        onChangeText={(text) => setAuth_protex(text)}
        autoCapitalize="none"
        keyboardType="default"
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Hai dimenticato la password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Non hai una chaive di accesso? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Richiedila</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
