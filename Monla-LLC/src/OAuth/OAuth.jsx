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
      try {
        console.log("Before fetchGoogle");
        let data = await fetchGoogle(result);
        if (data.data && data.token ) {
          toast.success(`Hello ${data.data.name}!!`);
          setUser(data.data);
          return navigate("/", { replace: true });
        } else {
          toast.error("Can't continue with Googleee",);
        }
      } catch (error) {
        console.error(error);
        toast.error("Can't continue with Google",);
      }
    } catch (error) {
      toast.error("error loggimnn", error.message)
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