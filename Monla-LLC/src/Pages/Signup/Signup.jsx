import { React, useState, useContext } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.minimal.css';
import styles from './Signup.module.css'
import { Link } from "react-router-dom";
import OAuth from "../../OAuth/OAuth";
import eye from '../../assets/icons/eye.png';
import hide from "../../assets/icons/hide.png";
import { UserContext } from "../../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';


const variants={
  initial:{
      y:50,
      opacity:0,
  },
  animate:{
      y:0,
      opacity:1,
      transition:{
          duration:0.7,
          staggerChildren:0.1
      },
  },
}




const Signup = () => {
  const { user , setUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

 // Regex validations
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{8,}$/;

  const visiblePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

  // Validate the form fields
  if (!formData.name) {
    toast.error("Please enter your name.");
    return;
  }
  if (!nameRegex.test(formData.name)) {
    toast.error("Please enter a valid name.");
    return;
  }
  if (!formData.email) {
    toast.error("Please enter your email.");
    return;
  }
  if (!emailRegex.test(formData.email)) {
    toast.error("Please enter a valid email address.");
    return;
  }
  if (!formData.password) {
    toast.error("Please enter your password.");
    return;
  }
    if (!passwordRegex.test(formData.password)) {
      toast.error("Password should be at least 8 characters.");
      return;
    }
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND}/user/register`,
        formData,
        {withCredentials:true}
      );
  
      if (response.data) {
        setUser(response.data)
        toast.success("Signup successfully!");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Incorrect email or password");
      } else if (error.response.status === 400){
        toast.error("Email already exists.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <>
    <Helmet>
      <title>Signup Page - Monla</title>
      <meta name="description" content="Effortlessly join our platform by signing up today. Experience personalized services tailored just for you. Create your account now for exclusive benefits!" />
      <meta name="keywords" content="signup, registration, user account" />
    </Helmet>
    <motion.main className={styles.main} >
      <motion.div className={styles.content__wrapper} variants={variants}>
        <motion.div className={styles.content} variants={variants} initial="initial" animate="animate">
          <motion.div className={styles.info} variants={variants}>
            <motion.div className={styles.logo} variants={variants}>
              {/* <img src={eye} alt="" /> */}
            </motion.div>
            <motion.h1 className={styles.title} variants={variants}>Sign up</motion.h1>
            <motion.p className={styles.slogan} variants={variants}>Enter your details to create your account.</motion.p>
          </motion.div>
          <motion.form onSubmit={handleSubmit} variants={variants} action="" className={styles.form} encType="multipart/form-data">
            <motion.div className={styles.input__wrapper} variants={variants}>
              <label htmlFor="na">Name*</label>
              <motion.input 
              variants={variants}
              type="text" 
              id="na"
              name="name"
              value={formData.name} 
              onChange={handleInputChange} 
              required/>
            </motion.div>
            <motion.div className={styles.input__wrapper} variants={variants}>
              <label htmlFor="em">Email*</label>
              <motion.input
              variants={variants} 
              type="email"
              id="em"                   
              name="email"
              value={formData.email} 
              onChange={handleInputChange} 
              required/>
            </motion.div>
            <motion.div variants={variants} className={`${styles.input__wrapper} ${styles.pass__input}`}>
              <label htmlFor="pass">Password*</label>
              <motion.input
              variants={variants}
                id="pass"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleInputChange}
                value={formData.password}
                required/>
                <motion.img
                  src={showPassword ? hide : eye}
                  className={styles.icon}
                  alt="Hide and Show an Eye"
                  onClick={visiblePassword}
                />
            </motion.div>
            <motion.input variants={variants} type="submit" value={"Sign up"} className={styles.submit__button} onClick={handleSubmit}/>
            <motion.div variants={variants} className={styles.login__text}>
              Already have an account?
              <Link to={"/login"} className={styles.login__link}>Login</Link>
            </motion.div>
            <motion.div variants={variants} className={styles.or__hr} >
              <hr/>
              <motion.span variants={variants} className={styles.or__wrapper}>or</motion.span>
            </motion.div>
            <motion.div variants={variants} className={styles.oauth}>
              <OAuth signup={true} />
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </motion.main>
    </>
  );
};

export default Signup;
