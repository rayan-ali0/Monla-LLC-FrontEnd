import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home.jsx";
import Dashboard from "../Pages/Dashboard/Dashboard.jsx";
import ProtectedRoute from "./Protected.jsx";
import React from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext/UserContext.jsx";
import Products from "../Pages/Products/Products.jsx";
import Signup from "../Pages/Signup/Signup.jsx";
import Login from "../Pages/Login/Login.jsx";
import Unauthorized from "../Pages/Unauthorized/Unauthorized.jsx";
import NotFound from "../Pages/NotFound/NotFound.jsx";
import ProductDetails from "../Pages/ProductDetails/ProductDetails.jsx";
import Services from "../Pages/Services/Services.jsx"
import Aboutus from "../Pages/Aboutus/Aboutus.jsx";
import Contact from "../Pages/Contact/ContactUs.jsx"
import Cart from "../Pages/CartPage/Cart.jsx"
import Summary from "../Components/orderSummary/Summary.jsx"
import Layout from "./Layout.jsx";
import Checkout from "../Pages/Checkout/Checkout.jsx";
import ModelsTable from "../Pages/dashTableModel/TabelModel.jsx";
import Profile from "../Components/Profile/Profile.jsx";
import DashProfile from '../Components/DashProfile/DashProfile.jsx'
import CategoryTable from "../Pages/CategoryTable/CategoryTable.jsx";
import MiniDrawer from "../Components/DashSidebar/DashSidebar.jsx";
import Overview from "../Pages/Overview/Overview.jsx";
import YearsTable from "../Pages/YearTable/yearTable.jsx";
import User from '../Pages/UserTable/UserTable.jsx'

const Router = () => {
  const { user, checkUser } = useContext(UserContext);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route index path="/services" element={<Services />} />
            <Route index path="/contact" element={<Contact />} />
            <Route index path="/cart" element={<Cart />} />
            {/* <Route index path="/summary" element={<Summary />} /> */}
            <Route index path="/profile" element={<Profile />}></Route>

          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/productdetails/:slug" element={<ProductDetails />} />
          <Route path="/productdetails" element={<ProductDetails />} />
          <Route path="/about" element={<Aboutus />} />
        


          <Route
            element={
              <ProtectedRoute
                isAllowed={user && user.role === "admin"}
                redirectPath="/unauthorized"
              />
            }>
            <Route path="/dashboard" element={<Dashboard />} >
              <Route path="category" index element={< CategoryTable/>} />
              <Route path='user' index element={<User />} />
              <Route path="" index element={< Overview />} />
              <Route path="yeardash" index element={< YearsTable />} />
              <Route path="model" index element={< ModelsTable/>} />



              <Route path="profile" index element={<DashProfile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
