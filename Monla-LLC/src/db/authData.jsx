import axios from "axios";


export async function fetchGoogle(result) {
    try {
      const data = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND}/google`, {
        name: result.user.displayName.split(" ")[0],
        email: result.user.email,
   
      });
      if (data && data.data.token) {
        console.log(data);
        localStorage.setItem("token", `Bearer ${data.data.token}`);
        return data.data;
      }else{
        return console.log("Data errorrr fetchGoogle:", data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  