import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [checkUser, setCheckUser] = useState(true);
  // const [userUpdated, setUserserUpdated] = useState(false);

  useEffect(() => {
    if (!user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setCheckUser(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND}/logged-in-user`,
        { withCredentials: true }
      );
      setUser(response.data.user);
      console.log(response.data.user)
    } catch (err) {
      setUser(null);
      console.log(err);
    } finally {
      setCheckUser(false);
    }
  };

  const logOut = async () => {
    await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND}/logout`);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logOut, fetchUserData, checkUser }}>
      {children}
    </UserContext.Provider>
  );
};