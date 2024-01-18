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

const Router = () => {
  const { user, checkUser } = useContext(UserContext);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/productdetails" element={<ProductDetails />} />

          <Route
            element={
              <ProtectedRoute
                isAllowed={user && user.role === "admin"}
                redirectPath="/unauthorized"
              />
            }>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
