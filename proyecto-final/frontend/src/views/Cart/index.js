import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import axios from "axios";
import { CREATE_CART } from "../../config/constans";
import "./Cart.css";

const Cart = () => {
 const [cartData, setCartData] = useState();
 const cartId = localStorage.getItem("cartId");
 const [isCartEmpty, setIsCartEmpty] = useState(false);

 const getProductById = async () => {
  await axios
   .get(`${CREATE_CART}/${cartId}/productos`, {
    method: "GET",
    mode: "no-cors",
    headers: {
     "Access-Control-Allow-Origin": "*",
     "Content-Type": "application/json",
    },
   })
   .then((res) => {
    return setCartData(res.data.products);
   });
 };

 useEffect(() => {
  getProductById();
 }, []);

 const deleteProduct = async (productId) => {
  await axios
   .delete(`${CREATE_CART}/${cartId}/productos/${productId}`, {
    method: "DELETE",
    mode: "no-cors",
    headers: {
     "Access-Control-Allow-Origin": "*",
     "Content-Type": "application/json",
    },
   })
   .then((res) => {
    getProductById();
   });
 };

 const deleteCart = async () => {
  await axios
   .delete(`${CREATE_CART}/${cartId}`, {
    method: "DELETE",
    mode: "no-cors",
    headers: {
     "Access-Control-Allow-Origin": "*",
     "Content-Type": "application/json",
    },
   })
   .then((res) => {
    setIsCartEmpty(true);
   });
 };

 return (
  <>
   <div className="cart-container">
    <TableContainer className="table-container">
     <Table>
      <TableHead>
       <TableRow>
        <TableCell>Nombre producto</TableCell>
        <TableCell>Descripción</TableCell>
        <TableCell>Código</TableCell>
        <TableCell align="center">Foto</TableCell>
        <TableCell>Precio</TableCell>
        <TableCell>Acciones</TableCell>
       </TableRow>
      </TableHead>
      {cartData !== undefined && cartData.length > 0 ? (
       <TableBody>
        {cartData?.map((item) => (
         <TableRow key={item.id}>
          <TableCell>{item.nombre}</TableCell>
          <TableCell>{item.descripcion}</TableCell>
          <TableCell>{item.codigo}</TableCell>
          <TableCell align="center">
           <img src={item.foto} height={100} width={"auto"} />
          </TableCell>
          <TableCell>${item.precio}</TableCell>
          <TableCell>
           <div className="delete-button-container">
            <button
             onClick={() => deleteProduct(item.id)}
             className="delete-product-button"
            >
             X
            </button>
           </div>
          </TableCell>
         </TableRow>
        ))}
       </TableBody>
      ) : (
       <TableBody>
        <TableRow>
         <TableCell>No se encontraron productos en el carrito</TableCell>
        </TableRow>
       </TableBody>
      )}
     </Table>
    </TableContainer>
   </div>
   {!isCartEmpty && <div className='delete-cart-button-container'>
    <button className="delete-cart-button" onClick={() => deleteCart()}>
      Eliminar carrito
    </button>
   </div>}
  </>
 );
};
export default Cart;
