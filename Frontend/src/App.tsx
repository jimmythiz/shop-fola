import "./App.css";
import {  Routes, Route } from "react-router-dom";

import NavBar from "../Components/NavBar/Navbar";
import Footer from "../Components/Footer/Footer";

import Home from "../Pages/Home/Home";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import SignUp from "../Pages/SignIn/SignUp";
import Login from "../Pages/Login/Login";
import MyAccount from "../Pages/MyAccount/MyAccount";
import NotFound from "../Pages/NotFound/NotFound";
import PaymentOptions from "../Pages/PaymentOptions/PaymentOptions";
import Cart from "../Pages/Cart/Cart";
import SingleItem from "../Pages/SingleItem/SingleItem";
import AllProducts from '../Pages/AllProducts/AllProducts'
import CategoryPage from '../Pages/CategoryProducts/CategoryProducts'

function App() {
  return (
    <>
      <div className="app-container">
        {/* <BrowserRouter> */}
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/paymentoptions" element={<PaymentOptions />} />
            <Route path="/allproducts" element={<AllProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />

            <Route path="/products/:id" element={<SingleItem />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        {/* </BrowserRouter> */}
      </div>
      <Footer />
    </>
  );
}

export default App;
