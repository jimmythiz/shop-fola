import './Products.css'
import { CiSearch } from "react-icons/ci";
import { useState,useEffect } from 'react';
import { fetchProducts } from '../../../lib/fetchData';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(()=>{
    const controller = new AbortController();
      const fetchproducts = async()=>{
        try { 
          const data = await fetchProducts();
          setProducts(data.data);
          console.log(data)
        } catch (error) {
          console.log(error);
        }
      };
      fetchproducts();
      return () => {
      controller.abort(); 
    };
  },[])


  const [searchQuery, setsearchQuery] = useState("")
  const [AvailabilityQuery,setAvailabilityQuery] = useState("")
  const [priceQuery,setpriceQuery] = useState("")
  const [categoryQuery,setcategoryQuery] = useState("")

  let filteredProducts = [...products];

  if (searchQuery){
      filteredProducts = filteredProducts.filter(product=>{
        return product.name.toLowerCase().includes(searchQuery.toLowerCase())
      })
      console.log(filteredProducts)
  }
  if (AvailabilityQuery){
      filteredProducts = filteredProducts.filter(product=>{
        return product.availability.toLowerCase() === AvailabilityQuery.toLowerCase()
      })
  }
  if (priceQuery === "High - Low"){
      filteredProducts = filteredProducts.sort((a,b)=>{
        return b.price - a.price;
      });
  } else if (priceQuery === "Low - High"){
      filteredProducts = filteredProducts.sort((a,b)=>{
        return a.price - b.price 
      })
  }

  if (categoryQuery){
      filteredProducts = filteredProducts.filter(product=>{
        return product.category_id.toLowerCase() === categoryQuery.toLowerCase()
      })
  }
  return (
    <div className='product-container'>
      <h3>Product List</h3>
      <div className='product-search'>
        <input type="text" placeholder='Search Product' value={searchQuery} onChange={(e)=>setsearchQuery(e.target.value)}/>
        <CiSearch />
      </div>
      <label htmlFor=""> Filter By Availability : 
          <select name="" id="" value={AvailabilityQuery} onChange={(e)=>setAvailabilityQuery(e.target.value)}>
        <option value="" defaultValue={"All"}>All</option>
        <option value="Available">Available</option>
        <option value="Out Of Stock">Out Of Stock</option>
      </select>
      </label>
      <label htmlFor=""> Filter By Price : 
          <select name="" id="" value={priceQuery} onChange={(e)=>setpriceQuery(e.target.value)}>
        <option value="" defaultValue={"All"}>All</option>
        <option value="High - Low">High - Low</option>
        <option value="Low - High">Low - High</option>
      </select>
      </label>
      <label htmlFor=""> Filter By Category : 
          <select name="" id="" value={categoryQuery} onChange={(e)=>setcategoryQuery(e.target.value)}>
        <option value="" defaultValue={"All"}>All</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Children">Children</option>
      </select>
      </label>
      <div className='product-header'>
            <p>Product Name</p>
            <p>Category</p>
            <p>Price</p>
            <p>Stock</p>
            <p>Action</p>
          </div>
      <div className='product-grid'>
          
          {/* Actual Products */}
          {products.length > 0 ?
          (products.map((product,index)=>(
          <div key={index} className="product-grid-list">
            <div>
              <img src={product.images[0]} alt="" />
              <p>{product.name}</p>
            </div>
            <p>{product.category_id}</p>
            <p>${product.price}</p>
            <p>{product.status}</p>
            <Link to={`/products/${product._id}`}>Edit</Link>
          </div>
        ))) :
        (
    <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#999" , marginTop:"2rem"}}>
      No products match your filters.
    </p>
  )
      }
      </div>
    </div>
  )
}

export default Products