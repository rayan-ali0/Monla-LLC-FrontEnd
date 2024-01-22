// import React , {useContext} from 'react';
import style from "./OAuth.module.css";
import googleIcon from "../assets/icons/google.png";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from '../firebase/firebase';
import {toast} from "react-toastify"
import { fetchGoogle } from '../db/authData';
import {  useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from '../UserContext/UserContext';


export default function OAuth({ signup }) {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);


  const handleGoogleButton = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
  
      if (!result) {
        console.error("Google authentication result is undefined");
        return;
      }
  
      console.log(result);
  
      const loadId = toast.loading("loading..");
      try {
        console.log("Before fetchGoogle");
        let data = await fetchGoogle(result);
        console.log("After fetchGoogle", result);

  
        if (data && data.token && data.newUser) {
          toast.success(`Hello ${data.newUser.email.split("@")[0]}!!`, {
            id: loadId,
          });
          setUser(data.newUser);
          return navigate("/", { replace: true });
        } else {
          toast.error("Can't continue with Googleee", { id: loadId });
        }
      } catch (error) {
        console.error(error);
        toast.error("Can't continue with Google", { id: loadId });
      }
    } catch (error) {
      console.error("Error during Google authentication:", error);
    }
  };
  
  

  return (
    <div className={style.googleButton} onClick={handleGoogleButton}>
      <img
        src={googleIcon}
        alt="Google Icon"
        className={style.googleIcon}
      />
      <p className={style.slogan}>{signup ? "Signup" : "Login"} with Google</p>
    </div>
  )
}