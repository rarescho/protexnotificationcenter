import React, { useState,useEffect } from "react";
import axios from "axios";
import { ReactSession } from 'react-client-session';
import { token,requestForToken } from '../../firebaseNotifications/firebase';
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
    requestForToken(navigate); 
    setAuth_Protex(params.auth_protex);
    setAuth_Firebase(token);

    // useEffect(() => {
    console.log(auth_protex,auth_firebase);

    const configuration = {
        method: "post",
        url: "https://www.protex-dashboard.it/register",
        data: {
            auth_firebase,
            auth_protex,
        },
    };
    console.log(configuration);
        // make the API call
    axios(configuration)
    .then((result) => {
        setRegister(true);
        console.log(result.data);
        if (result.data.message.toUpperCase().includes("SUCCESS")){
            setLoggedIn(true);
            console.log("Questo è firebase:",auth_firebase);
            ReactSession.setStoreType("localStorage");
            ReactSession.set("username", auth_protex);
            navigate("/Timeline")
            }else if(result.data.message.toUpperCase().includes("ERROR")){
                return;
            }
    })
    .catch((error) => {
        return error;
    });
    // }, [loggedIn]);


    return (
        <div>
            Non naviga
        </div>
      )
    
      
    
}