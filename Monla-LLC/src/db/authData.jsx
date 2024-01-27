// import axios from "axios";
// import { UserContext } from "../UserContext/UserContext";
// import { useContext } from "react";

// const {user, setUser} = useContext(UserContext)

// export async function fetchGoogle(result) {
//     try {
//       console.log(result.user.displayName)
//       const data = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND}/google`, {
//         name: result.user.displayName.split(" ")[0],
//         email: result.user.email,
//         },
//         {withCredentials:true}
//         );
//       if (data.data) {
//         setUser(data.data)
//         return data.data;
//       }else{
//         return console.log("Data errorrr fetchGoogle:", data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
  