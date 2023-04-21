import React, { useState } from "react";
import axios from "axios";
import { ReactSession } from 'react-client-session';
import { token,requestForToken } from '../../firebaseNotifications/firebase';
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import './Register.css'

export default function Register() {

    // initial state


    const [auth_firebase, setAuth_Firebase] = useState("");
    const [auth_protex, setAuth_Protex] = useState("");
    const [register, setRegister] = useState(false);
    let navigate = useNavigate();
    const params  = useParams();
    requestForToken(navigate);


    const handleSubmit = (e) => {
// prevent the form from refreshing the whole page
      e.preventDefault();
      
      const configuration = {
        method: "post",
        url: "https://www.protex-dashboard.it/api/register",
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
          if (result.data.message.toUpperCase().includes("SUCCESS")){
            console.log("Questo è firebase:",auth_firebase);
            ReactSession.setStoreType("localStorage");
            ReactSession.set("username", auth_protex);
            navigate("/Timeline")
          }else if(result.data.message.toUpperCase().includes("ERROR")){
              
          }
        })
        .catch((error) => {
          error = new Error();
        });
      
    };
      return  (
        <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Registrati</h3>
            <div className="form-group mt-3">
              <label className="label_title">Inserisci chiave di sicurezza per abilitazione notifiche protex </label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Introduci chiave"
                onChange={(e) => {
                  setAuth_Protex(e.target.value);
                  setAuth_Firebase(token);
                }}
              />
            </div>        
            <div className="d-grid gap-2 mt-3">
              <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-warning">
                Entra
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
            Chiave smarrita?
            </p>
          </div>
          {/* {register ? (
            <p className="text-success">You Are Registered Successfully</p>
          ) : (
            <p className="text-danger">You Are Not Registered</p>
          )} */}
        </form>
      </div>
    )
    

    
}
