import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

const ProductTable = ({ productsData, deleteProduct, setForm }) => {

 return (
  <TableContainer className="table-container">
   <Table>
    <TableHead>
     <TableRow>
      <TableCell>#id</TableCell>
      <TableCell>Nombre producto</TableCell>
      <TableCell>Descripción</TableCell>
      <TableCell>Código</TableCell>
      <TableCell align="center">Foto</TableCell>
      <TableCell>Precio</TableCell>
      <TableCell>Stock</TableCell>
      <TableCell>Acciones</TableCell>
     </TableRow>
    </TableHead>
    {productsData !== undefined && productsData.length > 0 ? (
     <TableBody>
      {productsData?.map((item) => (
       <TableRow key={item.id}>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.nombre}</TableCell>
        <TableCell>{item.descripcion}</TableCell>
        <TableCell>{item.codigo}</TableCell>
        <TableCell align="center">
         <img src={item.foto} height={100} width={"auto"} />
        </TableCell>
        <TableCell>${item.stock}</TableCell>
        <TableCell>{item.precio}</TableCell>
        <TableCell>
         <div className="delete-button-container">
          <button
           onClick={() => deleteProduct(item.id)}
           className="delete-product-button"
          >
           X
          </button>
          <button onClick={()=> {
            setForm({
                nombre: item?.nombre,
                descripcion: item?.descripcion,
                codigo: item?.codigo,
                foto: item?.foto,
                precio: item?.precio,
                stock: item?.stock,
                id: item?.id
            });
          }}>Editar producto</button>
         </div>
        </TableCell>
       </TableRow>
      ))}
     </TableBody>
    ) : (
     <TableBody>
      <TableRow>
       <TableCell>No se encontraron productos.</TableCell>
      </TableRow>
     </TableBody>
    )}
   </Table>
  </TableContainer>
 );
};

export default ProductTable;
