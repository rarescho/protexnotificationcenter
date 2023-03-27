import React, { useState,useEffect } from "react";
import axios from "axios";
import { ReactSession } from 'react-client-session';
import { token } from '../../firebaseNotifications/firebase';
import Notification from '../../firebaseNotifications/Notification'

import { useParams } from "react-router-dom";

import {useNavigate} from 'react-router-dom'




import './Register.css'

export default function RegisterProtex() {

    // initial state
    const [auth_firebase, setAuth_Firebase] = useState("");
    const [auth_protex, setAuth_Protex] = useState("");
    const [register, setRegister] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);


    let navigate = useNavigate();
    const params  = useParams();  
    setAuth_Protex(params.auth_protex);
    setAuth_Firebase(token);

    useEffect(() => {
        console.log(auth_protex,auth_firebase);

        const configuration = {
            method: "post",
            url: "http://www.protex-dashboard.it/register",
                data: {
                    auth_firebase,
                    auth_protex,
                },
            };
        
            // make the API call
            axios(configuration)
            .then((result) => {
                setRegister(true);
                console.log(result.data);
                if (result.data.message.toUpperCase().includes("REGISTERED")){
                    setLoggedIn(true);
                    console.log("Questo è firebase:",auth_firebase);
                    ReactSession.setStoreType("localStorage");
                    ReactSession.set("username", auth_protex);
                    navigate("/Timeline")
                }
            })
            .catch((error) => {
                error = new Error();
            });
    }, [loggedIn]);
    
      
    
}