import React, { useEffect, useState } from "react";
import Products from "../../components/Products";
import axios from "axios";
import { GET_PRODUCTS } from "../../config/constans";
import "./Home.css";

const Home = () => {
 const [productList, setProductList] = useState([]);

 const getProducts = async () => {
  await axios
   .get(GET_PRODUCTS, {
    method: "GET",
    mode: "no-cors",
    headers: {
     "Access-Control-Allow-Origin": "*",
     "Content-Type": "application/json",
    },
   })
   .then((res) => {
    return setProductList(res.data.products);
   });
 };

 useEffect(() => {
  getProducts();
 }, []);

 return (
  <div>
   <h4>Productos disponibles</h4>
   {productList.length > 0 ? (
    <div className="product-array-container">
     {productList.map((item) => (
      <div key={item.id}>
       <Products item={item} />
      </div>
     ))}
    </div>
   ) : (
    <h5>No se encontraron productos</h5>
   )}
  </div>
 );
};

export default Home;
