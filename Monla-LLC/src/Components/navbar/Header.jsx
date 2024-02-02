
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast"
import styles from "./Header.module.css";
import logo from '../../assets/images/logo.svg';
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart } from 'react-icons/ai';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext/UserContext";
import { CartContext } from "../../UserContext/CartContext";
import { useContext } from "react";
import axios from 'axios';
import { useFetchData } from "../../CustomHook/GetData";
// import {motion} from "framer-motion"
import Avatar from '@mui/material/Avatar';
import Profile from "../../assets/profileee.jpeg"




const Header = () => {
  // const api=`http://localhost:5000/logout`
  // const {data, } =useFetchData(api)
  const {user, setUser}=useContext(UserContext)
  const { cartItemCount } = useContext(CartContext)
  
  console.log(cartItemCount)
  const [nav, setNav] = useState({
    isOpen: false,
    isCartOpen: false,
  });


  const location = useLocation();

  const navigate = useNavigate();


  const logout = async () => {
    try {
      console.log("before")
      const action = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND}/logout`, {}, { withCredentials: true });
      if (action) {
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

      }
    } catch (error) {
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
      <div className={styles.navbar} >
        {/* Logo */}
        <NavLink to="/">
       <div>
        <img src={logo} alt="/"  />
        </div>
        </NavLink>
        {/* Navigation Links */}
        <div className={styles.whatever}>
          <nav style={{display:"flex", gap:"2rem"}}>
            <ul className={nav ? [styles.menu, styles.active].join(' ') : [styles.menu]} initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}} transition={{duration:0.5}}>
              {/* NavLink for Home */}
              <li>
                <NavLink to='/' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/' ? styles.activeNavItem : ''} ${location.pathname === '/profile' || location.pathname === "/cart" ? styles.blue : styles.white}`} >
                  Home
                </NavLink>
              </li>

              {/* NavLink for Services */}
              <li >
                <NavLink to='/services' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/services' ? styles.activeNavItem : ''} ${location.pathname === '/profile' || location.pathname === "/cart" ? styles.blue : styles.white}`}>
                  Services
                </NavLink>
              </li>

              {/* NavLink for Product page */}
              <li >

                <NavLink to='/product' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/product' ? styles.activeNavItem : ''} ${location.pathname === '/profile' || location.pathname === "/cart" ? styles.blue : styles.white}`}>
                  Products
                </NavLink>
              </li>

              {/* NavLink for About Us */}
              <li >

                <NavLink to='/about' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/about' ? styles.activeNavItem : ''} ${location.pathname === '/profile' || location.pathname === "/cart" ? styles.blue : styles.white}`}>
                  About
                </NavLink>
              </li>

              {/* NavLink for Contact Us */}
              <li >

              <NavLink to='/contact' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/contact' ? styles.activeNavItem : ''} ${location.pathname==='/profile' || location.pathname==="/cart"?styles.blue:styles.white}`}>
                Contact Us
              </NavLink>
              </li>
              {user && user.role==="admin" && ( <li >

                  <NavLink to='/dashboard' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/dashboard' ? styles.activeNavItem : ''} ${location.pathname==='/profile' || location.pathname==="/cart"?styles.blue:styles.white}`}>
                  dashboard                  </NavLink>
                  </li>) }
           

              {user ? (<button onClick={logout} type="submit" className={styles.button}>
                Logout
              </button>) : (<li>
                <NavLink to='/signup' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/signup' ? styles.activeNavItem : ''} ${location.pathname === '/profile' || location.pathname === "/cart" ? styles.blue : styles.white}`}>
                  SignUp
                </NavLink></li>)}
            
            </ul>
          </nav>

          <div onClick={() => setNav(!nav)} className={location.pathname === "/profile" || location.pathname === "/cart" ? styles.mobile_btn_blue : styles.mobile_btn}>
            {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
          </div>

          {/* Cart Icon */}
          <div className={`${location.pathname==='/profile' || location.pathname==="/cart"?styles.cartIconBlue:styles.cartIcon} ${styles.count}`} onClick={handleCartIconClick} count={cartItemCount}>
            <AiOutlineShoppingCart size={25} className={styles.shopIcon} />
          </div>
          {user &&    <NavLink to="/profile" >
                <Avatar
                alt={user.name}
                src={user}  
                sx={{ cursor:"pointer" , backgroundColor:"lightGrey" ,color:"#163357", height:"2.5rem", width:"2.5rem"}}
              />
                          </NavLink>}
        </div>
        


      
      </div>
    </header>


  );
};

export default Header;
