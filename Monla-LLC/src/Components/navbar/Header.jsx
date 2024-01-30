
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast"
import styles from "./Header.module.css";
import logo from '../../assets/images/logo.svg';
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart } from 'react-icons/ai';
import { NavLink, useLocation ,useNavigate} from "react-router-dom";
import { UserContext } from "../../UserContext/UserContext";
import { useContext } from "react";
import axios from 'axios';
import { useFetchData } from "../../CustomHook/GetData";
import {motion} from "framer-motion"



const Header = () => {
  // const api=`http://localhost:5000/logout`
  // const {data, } =useFetchData(api)
  const {user, setUser}=useContext(UserContext)
  const [nav, setNav] = useState({
    isOpen: false,
    isCartOpen: false,
  });
  
  const location = useLocation();
  
  const navigate = useNavigate();


  const logout = async () => {
    try {
      console.log("before")
      const action = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND}/logout`,{},{withCredentials:true});
      if(action) {
        localStorage.removeItem('token')
        setUser(null);
        toast.success("Logout successful!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // console.log(user)
      
        // console.log("after")
      
    }} catch (error) {
      console.error("Logout error:", error);
      toast.error("An unexpected error occurred. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  
  const handleCartIconClick = () => {
    // Navigate to the cart page
    navigate('/cart');
  };
  useEffect(() => {
    // Close the mobile menu when a NavLink is clicked
    setNav(false);
  }, [location]);

  return (
    // Header Container
    <header className={styles.headerContainer} >
      <motion.div className={styles.navbar} >
        {/* Logo */}
        <motion.img src={logo} alt="/" initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}} transition={{duration:0.5}} />

        {/* Navigation Links */}
        <div className={styles.whatever}>
          <nav style={{display:"flex", gap:"2rem"}}>
            <motion.ul className={nav ? [styles.menu, styles.active].join(' ') : [styles.menu]} initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}} transition={{duration:0.5}}>
              {/* NavLink for Home */}
              <li>
                <NavLink to='/' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/' ? styles.activeNavItem : ''}`}>
                  Home
                </NavLink>
              </li>

              {/* NavLink for Services */}
              <li>
                <NavLink to='/services' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/services' ? styles.activeNavItem : ''}`}>
                  Services
                </NavLink>
              </li>

              {/* NavLink for Product page */}
              <li>
                <NavLink to='/product' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/product' ? styles.activeNavItem : ''}`}>
                  Products
                </NavLink>
              </li>

              {/* NavLink for About Us */}
              <li>
                <NavLink to='/about' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/about' ? styles.activeNavItem : ''}`}>
                  About 
                </NavLink>
              </li>

              {/* NavLink for Contact Us */}
              <li>
                <NavLink to='/contact' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/contact' ? styles.activeNavItem : ''}`}>
                  Contact Us
                </NavLink>
              </li>

                {user ? (<button onClick={logout} type="submit" className={styles.button}>
                Logout
                </button>) :(<li>
                  <NavLink to='/signup' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/signup' ? styles.activeNavItem : ''}`}>
                SignUp
                </NavLink></li>)}
              
                
              
            

            </motion.ul>
          </nav>

          <div onClick={() => setNav(!nav)} className={styles.mobile_btn}>
            {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
          </div>

          {/* Cart Icon */}
          <div className={styles.cartIcon} onClick={handleCartIconClick}>
            <AiOutlineShoppingCart size={25} className={styles.shopIcon} />
          </div>
        </div>


      
      </motion.div>
    </header>

    
  );
};

export default Header;
