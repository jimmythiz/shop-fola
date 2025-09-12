import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { Navigate } from 'react-router';

import Navbar from "./Components/Navbar/Navbar"
import Dashboard from "../src/Pages/Home/Home"
import Products from "../src/Pages/Products/Products"
import Tag from "../src/Pages/Tags/Tags"
import Category from "../src/Pages/Categories/Categories"
import Users from "../src/Pages/Users/Users"
import Login from "../src/Pages/Login/Login"
import AddProducts from "../src/Pages/AddProducts/AddProducts"
import Orders from './Pages/Orders/Orders';
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import EditProduct from './Pages/EditProduct/EditProduct';

import { useAuth } from '../lib/Context/AuthContext';

function App() {
   const { isLoggedIn } = useAuth();
  if (isLoggedIn === null) return <div>Loading...</div>;
   

  return (
    <>
      <BrowserRouter>
      <div className='app-container'>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path="/login" element={
            isLoggedIn ? <Navigate to="/" /> :<Login />} 
          />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/products" element={
            <ProtectedRoute>
              <Products />
              </ProtectedRoute>
          } />
          <Route path="/products/:id" element={
            <ProtectedRoute>
              <EditProduct />
              </ProtectedRoute>
          } />
          <Route path="/tags" element={
            <ProtectedRoute>
              <Tag />
              </ProtectedRoute>
          } />
          <Route path="/categories" element={
            <ProtectedRoute>
              <Category />
              </ProtectedRoute>
          } />

          <Route path="/add-products" element={
            <ProtectedRoute>
              <AddProducts />
              </ProtectedRoute>
          } />

          <Route path="/users" element={
            <ProtectedRoute>
              <Users />
              </ProtectedRoute>
          } />

          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
              </ProtectedRoute>
          } />
        </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
