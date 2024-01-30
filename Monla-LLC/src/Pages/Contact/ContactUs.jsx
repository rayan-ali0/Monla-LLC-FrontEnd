import React, { useState , useEffect, useRef} from 'react'
import style from './ContactUs.module.css'
import TextField from '@mui/material/TextField';
import locationIcon from '../../assets/pin.png'
import emailIcon from '../../assets/email.png'
import phoneIcon from '../../assets/phone-call.png'
import PageHero from '../../Components/PageHero/PageHero.jsx'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.minimal.css';
import axios from 'axios'
import emailjs from '@emailjs/browser';
// import { styled } from "@mui/system";
// import { makeStyles } from '@mui/styles';



const Contact = () => {
const[formData,setFormData]=useState({
  Name:'',
  Email:'',
  Phone:'',
  message:''
})
const[errorMessage,setErrorMessage]=useState()

// const useStyles = makeStyles({
//   focused: {
//     '& .MuiOutlinedInput-root': {
//       '&.Mui-focused': {
//         borderColor: 'pink',
//       },
//     },
//   },
//   hovered: {
//     '&:hover .MuiOutlinedInput-root': {
//       borderColor: 'green',
//     },
//   },
// });

// EmailJs
const form = useRef();

const handleInputChange=(e)=>{
  setErrorMessage()
  const{name,value}=e.target
  setFormData({...formData,[name]:value})
  console.log(formData)
}

const submitForm=async(e)=>{
  const {Name,Email,Phone,message}=formData
  e.preventDefault()
  if (!Name || !Email || !Phone || !message) {
    toast.error('All fields are required!!')
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(Email)) {
    toast.error('Invalid email format!!')
    return;
  }
  if (/^\d{8}$/.test(Phone)) {
    toast.error('Phone number must be 8 digits of numbers!');
    return;
  }

  try{
const res=await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND}/contact/create`,formData)
if(res){
  console.log(res.data)

  emailjs.sendForm('service_a1ici9n', 'template_c9ol4x8', form.current, 'xIFwmGqn0WceR1X-b')
  .then((result) => {
      console.log(result.text);
      console.log("Message send");
  }, (error) => {
      console.log(error.text);
      console.log("Message Failed");
  });

  toast.success('You Message has been send successfully. Thank You!')
  setFormData({
    Name:'',
    Email:'',
    Phone:'',
    message:''
  })
  console.log(formData)
}
else{
  toast.error("Your message isn't received.Please try Again!");

  console.log("Error sending your message"+error.message)
}
  }
  catch(error){
    console.log("Catching an error while sending your message"+error.message)

  }
}
useEffect(() => {
  console.log("Form data after setting:", formData);
}, [formData]); 

const styleField={
  '& .MuiOutlinedInput-root': {
    borderColor: 'darkgray', // Default border color
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { // More specific selector for focus
      borderColor: 'darkgray',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': { // More specific selector for hover
      borderColor: 'darkgray',
    },
    '& .MuiInputLabel-root': {
      color: 'black'
    },
  },
  
    '& .MuiInputLabel-root': {
      color: 'gray', // Set desired label color here
    },

  
}

  return (

    <>
      <PageHero title={"Contact Us"}/>
      <main className={style.contactPage}>
        <div className={style.contactHolder}>
        <form ref={form} onSubmit={submitForm}  className={style.contactForm}>
            <TextField id="name" label="Your Name" name="Name"  variant="outlined"  value={formData.Name} required onChange={handleInputChange}       sx={styleField}
/>
            <TextField id="email" label="Your Email" name="Email" placeholder='Ex: email@gmail.com' value={formData.Email}   type="email" variant="outlined" required onChange={handleInputChange}       sx={styleField}
/>
            <TextField id="phone" label="Phone Number" placeholder='Ex: 03 000 000' name="Phone" type="tel" value={formData.Phone}   inputMode="numeric"variant="outlined" required onChange={handleInputChange}       sx={styleField}
/>
            <TextField id="message" label="Your Message" name="message" variant="outlined" multiline rows={5} value={formData.message}  required onChange={handleInputChange}
      sx={styleField}

      />
            <button className={style.customButton} onClick={submitForm}>Send Message</button>
          </form>

          <section className={style.contactDetails}>
            <h1>Get In Touch</h1>
            <p >
              Get in touch with us for all your automotive needs – we're here to assist you with top-notch car products and services!
            </p>
            <article className={style.contactInfo}>
              <h2>Contact Info</h2>
              <span className={style.contactData}> <img src={phoneIcon} className={style.icons} /> +961 03 000 000</span>
              <span className={style.contactData}><img src={emailIcon} className={style.icons} />monla@gmail.com</span>
              <span className={style.contactData}> <img src={locationIcon} className={style.icons} />Tripoli , Bab AL ramel , XX Street </span>
            </article>
          </section>
        </div>
        <section className={style.mapContainer}>
          <iframe src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3291.0623947624654!2d35.83170947632839!3d34.42517019794592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1521f753d40da92f%3A0x723d4dccaedbd7d5!2z2YXYpNiz2LPYqSDZiNiz2YrZhSDYudio2K_Yp9mE2YTZhyDYp9mE2YXZhtmE2Kc!5e0!3m2!1sen!2slb!4v1705354764491!5m2!1sen!2slb`}
            className={style.map} height="450" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>


        </section>
      </main>
    </>

  )
}

export default Contact








{/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3291.0623947624654!2d35.83170947632839!3d34.42517019794592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1521f753d40da92f%3A0x723d4dccaedbd7d5!2z2YXYpNiz2LPYqSDZiNiz2YrZhSDYudio2K_Yp9mE2YTZhyDYp9mE2YXZhtmE2Kc!5e0!3m2!1sen!2slb!4v1705354764491!5m2!1sen!2slb" 
          width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
{/* <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={15}>
              <Marker position={center} />
            </GoogleMap>
          </LoadScript> */}