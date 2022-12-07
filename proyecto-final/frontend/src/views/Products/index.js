import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Products.css";
import axios from "axios";
import { GET_PRODUCTS } from "../../config/constans";
import ProductTable from "./ProductTable";

const Products = () => {
 const [productsData, setProductsData] = useState([]);
 const [publishStatusModal, setPublishStatusModal] = useState({
  isVisible: false,
  message: "",
 });
 const [form, setForm] = useState({
  nombre: "",
  descripcion: "",
  codigo: "",
  foto: "",
  precio: "",
  stock: "",
 });

 const getProductsList = async () => {
  await axios
   .get(`${GET_PRODUCTS}`, {
    method: "GET",
    mode: "no-cors",
    headers: {
     "Access-Control-Allow-Origin": "*",
     "Content-Type": "application/json",
    },
   })
   .then((res) => {
    return setProductsData(res.data.products);
   });
 };

 useEffect(() => {
  getProductsList();
 }, []);

 const onHandleChange = (value, inputName) => {
  setForm({
   ...form,
   [inputName]: value.target.value,
  });
 };

 const onSubmit = async () => {
  if (!form?.id) {
   await axios.post(GET_PRODUCTS, {...form}).then((res) => {
    setPublishStatusModal({
     isVisible: true,
     message: res.data.message,
    });
    getProductsList();
    setForm({
     nombre: "",
     descripcion: "",
     codigo: "",
     foto: "",
     precio: "",
     stock: "",
    });
   });
  } else {
    const obj = { 
      timestamp: new Date(),
      nombre: form.nombre,
      descripcion: form.descripcion,
      codigo: form.codigo,
      foto: form.foto,
      precio: form.precio,
      stock: form.stock
    }
   await axios.put(`${GET_PRODUCTS}/${form.id}`, {...obj}).then((_) => {
    getProductsList();
    setForm({
     nombre: "",
     descripcion: "",
     codigo: "",
     foto: "",
     precio: "",
     stock: "",
    });
   });
  }
 };

 const deleteProduct = async (productId) => {
  await axios
   .delete(`${GET_PRODUCTS}/${productId}`, {
    method: "DELETE",
    mode: "no-cors",
    headers: {
     "Access-Control-Allow-Origin": "*",
     "Content-Type": "application/json",
    },
   })
   .then((_) => {
    getProductsList();
   });
 };

 return (
  <div>
   <div>
    <Box
     component="form"
     sx={{
      "& > :not(style)": { m: 1, width: "25ch" },
     }}
     noValidate
     autoComplete="off"
     className="form-container"
    >
     <TextField
      id="outlined-basic"
      onChange={(text) => onHandleChange(text, "nombre")}
      label="Nombre"
      variant="outlined"
      required
      value={form?.nombre || ''}
     />
     <TextField
      id="outlined-basic"
      onChange={(text) => onHandleChange(text, "descripcion")}
      label="Descripcion"
      variant="outlined"
      value={form?.descripcion || ''}
      required
     />
     <TextField
      id="outlined-basic"
      onChange={(text) => onHandleChange(text, "codigo")}
      label="Codigo"
      variant="outlined"
      value={form?.codigo || ''}
      required
     />
     <TextField
      id="outlined-basic"
      onChange={(text) => onHandleChange(text, "foto")}
      label="Link foto"
      variant="outlined"
      value={form?.foto || ''}
      required
     />
     <TextField
      id="outlined-basic"
      onChange={(text) => onHandleChange(text, "precio")}
      label="Precio"
      variant="outlined"
      value={form?.precio || ''}
      required
     />
     <TextField
      id="outlined-basic"
      onChange={(text) => onHandleChange(text, "stock")}
      label="Stock"
      variant="outlined"
      value={form?.stock || ''}
      required
     />
    </Box>
    <Button onClick={() => onSubmit()} variant="contained">
     Enviar
    </Button>
    <Button
     onClick={() =>
      setForm({
       nombre: "",
       descripcion: "",
       codigo: "",
       foto: "",
       precio: "",
       stock: "",
      })
     }
     sx={{ marginLeft: 2 }}
     variant="outlined"
    >
     Limpiar campos
    </Button>
    {publishStatusModal.isVisible && (
     <div className="div-box-container">
      <Box className={"box-product-published"}>
       <Typography>{publishStatusModal.message}</Typography>
      </Box>
     </div>
    )}
   </div>
   <div className="product-table-container">
    <ProductTable
     productsData={productsData}
     setForm={setForm}
     deleteProduct={deleteProduct}
    />
   </div>
  </div>
 );
};

export default Products;
