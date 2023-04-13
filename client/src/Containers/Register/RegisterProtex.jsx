import React, { useState,useEffect } from "react";
import axios from "axios";
import { ReactSession } from 'react-client-session';
import { token,requestForTokenRegister } from '../../firebaseNotifications/firebase';
import Notification from '../../firebaseNotifications/Notification'

import { useParams } from "react-router-dom";

import {useNavigate} from 'react-router-dom'




import './Register.css'

export default function RegisterProtex() {

    let navigate = useNavigate();
    requestForTokenRegister(navigate); 
    return (
        <div>
            Non naviga
        </div>
      )
    
      
    
}