import React , {useContext} from 'react';
import style from "./OAuth.module.css";
import googleIcon from "../assets/icons/google.png";

export default function OAuth({ signup }) {
  return (
    <div className={style.googleButton}>
      <img
        src={googleIcon}
        alt="Google Icon"
        className={style.googleIcon}
      />
      <p className={style.slogan}>{signup ? "Signup" : "Login"} with Google</p>
    </div>
  )
}