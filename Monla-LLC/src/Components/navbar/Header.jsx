
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
       const action = await axios.post('http://localhost:5000/logout',{},{withCredentials:true});
      if(action) {
        setUser(null);
        toast.success("Logout successful!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log(user)
      
        console.log("after")
      
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
console.log(location.pathname==='/profile')

  return (
    // Header Container
    <header className={styles.headerContainer}>
      <div className={styles.navbar}>
        {/* Logo */}
        <img src={logo} alt="/" />

        {/* Navigation Links */}
        <div className={styles.whatever}>
          <nav style={{display:"flex", gap:"2rem"}}>
            <ul className={nav ? [styles.menu, styles.active].join(' ') : [styles.menu]}>
              {/* NavLink for Home */}
              <li>
                <NavLink to='/' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/' ? styles.activeNavItem : ''} ${location.pathname==='/profile' || location.pathname==="/cart"?styles.blue:styles.white}`} >
                  Home
                </NavLink>
              </li>

              {/* NavLink for Services */}
              <li >
                <NavLink to='/services' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/services' ? styles.activeNavItem : ''} ${location.pathname==='/profile' || location.pathname==="/cart"?styles.blue:styles.white}`}>
                  Services
                </NavLink>
              </li>

              {/* NavLink for Product page */}
              <li >

                <NavLink to='/product' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/product' ? styles.activeNavItem : ''} ${location.pathname==='/profile' || location.pathname==="/cart"?styles.blue:styles.white}`}>
                  Products
                </NavLink>
              </li>

              {/* NavLink for About Us */}
              <li >

                <NavLink to='/about' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/about' ? styles.activeNavItem : ''} ${location.pathname==='/profile' || location.pathname==="/cart"?styles.blue:styles.white}`}>
                  About 
                </NavLink>
              </li>

              {/* NavLink for Contact Us */}
              <li >

                <NavLink to='/contact' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/contact' ? styles.activeNavItem : ''} ${location.pathname==='/profile' || location.pathname==="/cart"?styles.blue:styles.white}`}>
                  Contact Us
                </NavLink>
              </li>
              <li >

                <NavLink to='/signup' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/signup' ? styles.activeNavItem : ''} ${location.pathname==='/profile' || location.pathname==="/cart"?styles.blue:styles.white}`}>
                SignUp
                </NavLink>
              </li>
            

            </ul>
                {user ? (<button onClick={logout} type="submit" className={styles.button}>
                Logout
                </button>) :(<li>
                  <NavLink to='/signup' activeClassName={styles.activeLink} className={`${styles.menuItem} ${location.pathname === '/signup' ? styles.activeNavItem : ''}`}>
                SignUp
                </NavLink></li>)}
          </nav>

          <div onClick={() => setNav(!nav)} className={location.pathname==="/profile"|| location.pathname==="/cart"? styles.mobile_btn_blue:styles.mobile_btn}>
            {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
          </div>

          {/* Cart Icon */}
          <div className={location.pathname==='/profile' || location.pathname==="/cart"?styles.cartIconBlue:styles.cartIcon} onClick={handleCartIconClick}>
            <AiOutlineShoppingCart size={25} className={styles.shopIcon} />
          </div>
        </div>


      
      </div>
    </header>

    
  );
};

export default Header;
