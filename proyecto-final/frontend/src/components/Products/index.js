import React from "react";
import "./Products.css";

const Products = ({ item }) => {
 const { foto, nombre, descripcion, precio, stock, id } = item;
 return (
  <div className="card-container">
   <img src={foto} alt={"Imagen producto"} />
   <div className="name-description-container">
    <p className="product-name">{nombre}</p>
    <p className="product-description">{descripcion}</p>
   </div>
   <div className="price-stock-container">
    <p className="product-price">Precio: ${precio}</p>
    <p className="product-stock">Cantidad: {stock}</p>
   </div>
   <div className="button-container">
    <a href={`detalle-producto/${id}`} className="link-button">
     <p>Ver producto</p>
    </a>
   </div>
  </div>
 );
};

export default Products;
