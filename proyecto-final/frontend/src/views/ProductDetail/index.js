import axios from "axios";
import React, { useEffect, useState } from "react";
import { CREATE_CART, GET_PRODUCTS } from "../../config/constans";
import { useLocation } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
 const { pathname } = useLocation();
 const id = pathname.split("/")[2];
 const [productData, setProduct] = useState(null);
 const [isModalVisible, setIsModalVisible] = useState({
  isVisible: false,
  message: "",
 });

 const getProductById = async () => {
  await axios
   .get(`${GET_PRODUCTS}/${id}`, {
    method: "GET",
    mode: "no-cors",
    headers: {
     "Access-Control-Allow-Origin": "*",
     "Content-Type": "application/json",
    },
   })
   .then((res) => {
    return setProduct(res.data.products);
   });
 };

 useEffect(() => {
  getProductById();
 }, []);

 const addProduct = async () => {
  const status = await axios
   .post(`${CREATE_CART}`, {
    method: "POST",
    mode: "no-cors",
    headers: {
     "Access-Control-Allow-Origin": "*",
     "Content-Type": "application/json",
    },
   })
   .then((res) => {
    localStorage.setItem('cartId', res.data.id);
    return res.data.status;
   });
  if (status === "success") {
   await axios
    .post(`${CREATE_CART}/${id}/productos`, {
     method: "POST",
     mode: "no-cors",
     headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
     },
    })
    .then((res) => {
     setIsModalVisible({
      isVisible: true,
      message: res.data.message,
     });
    });
  }
 };

 return (
  <>
   <div>
    {productData !== null ? (
     <div className="card-section">
      <div className="card-detail">
       <div>
        <img
         src={productData.foto}
         width={"auto"}
         height={300}
         alt="Imagen producto"
        />
       </div>
       <div>
        <h3>{productData.nombre}</h3>
        <p className="product-description">{productData.descripcion}</p>
        <p className="product-price">${productData.precio}</p>
        {productData.stock > 0 ? (
         <p className="product-description">Cantidad: {productData.stock}</p>
        ) : (
         <p className="product-description">Sin stock</p>
        )}
        {productData.stock > 0 && (
         <button onClick={() => addProduct()}>Agregar al carrito</button>
        )}
       </div>
      </div>
     </div>
    ) : (
     <div className="card-empty">
      <p>Producto no disponible</p>
     </div>
    )}
   </div>
   {isModalVisible.isVisible && (
    <div className="modal-add-product-cart">
     <button
      className="button-close-modal"
      onClick={() =>
       setIsModalVisible({
        isVisible: false,
        message: "",
       })
      }
     >
      X cerrar
     </button>
     <h5>{isModalVisible.message}</h5>
    </div>
   )}
  </>
 );
};

export default ProductDetail;
