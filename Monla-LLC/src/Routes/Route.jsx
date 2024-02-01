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
import Services from "../Pages/Services/Services.jsx";
import Aboutus from "../Pages/Aboutus/Aboutus.jsx";
import Contact from "../Pages/Contact/ContactUs.jsx";
import Cart from "../Pages/CartPage/Cart.jsx";
import Summary from "../Components/orderSummary/Summary.jsx";
import Layout from "./Layout.jsx";
import Checkout from "../Pages/Checkout/Checkout.jsx";
import ModelsTable from "../Pages/dashTableModel/TabelModel.jsx";
import Profile from "../Components/Profile/Profile.jsx";
import DashProfile from "../Components/DashProfile/DashProfile.jsx";
import CategoryTable from "../Pages/CategoryTable/CategoryTable.jsx";
import Overview from "../Pages/Overview/Overview.jsx";
import ConfirmationPage from "../Pages/confimationOrder/confimeOrder.jsx";
import YearsTable from "../Pages/YearTable/yearTable.jsx";
import User from "../Pages/UserTable/UserTable.jsx";
import Productstable from "../Pages/ProductsTable/ProductsTable.jsx";
import AddProduct from "../Pages/ProductsTable/AddProduct.jsx";
import EditProduct from "../Pages/ProductsTable/EditProduct.jsx";
import BrandsTable from "../Pages/BrandTable/BrandTable.jsx";
import ShippingsTable from "../Pages/ShippingTable/shippingtable.jsx";
import ContactsTable from "../Pages/ContactTable/contactTable.jsx";
import OrdersTable from "../Pages/tableOrder/tableOrder.jsx";
import ServicesTable from "../Pages/ServicesTable/serviceTable.jsx";
import UserTable from "../Pages/UserTable/UserTable.jsx";
import PoweredByUS from "../Pages/PoweredByUS/PoweredByUS.jsx";

const Router = () => {
  const { user, checkUser } = useContext(UserContext);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route index path="/confirmed" element={<ConfirmationPage />} />
            <Route path="/product" element={<Products />} />
            <Route index path="/services" element={<Services />} />
            <Route index path="/contact" element={<Contact />} />
            <Route index path="/cart" element={<Cart />} />
            <Route index path="/profile" element={<Profile />} />
            <Route index path="/summary" element={<Summary />} />
            <Route path="/productdetails/:slug" element={<ProductDetails />} />
            <Route path="/about" element={<Aboutus />} />

          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/developers" element={<PoweredByUS />} />

          <Route
            element={
              <ProtectedRoute
                isAllowed={user && user.role === "admin"}
                redirectPath="/unauthorized"
              />
            }>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="" index element={<Overview />} />
              <Route path="category" index element={<CategoryTable />} />
              <Route path="profile" index element={<DashProfile />} />
              <Route path="Product/Add" index element={< AddProduct/>} />
              <Route path="Product/Edit" index element={< EditProduct/>} />
              <Route path="Products" element={<Productstable/>}/>

              <Route path="Year" index element={< YearsTable />} />
              <Route path="Model" index element={< ModelsTable />} />
              <Route path="Brand" index element={< BrandsTable />} />
              <Route path="Shipping" index element={<ShippingsTable/>} />
              <Route path="contact" index element={<ContactsTable/>} />
              <Route path="Orders" index element={<OrdersTable/>} />
              <Route path="Services" index element={<ServicesTable/>} />
              <Route path="User" index element={<UserTable/>} />

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
