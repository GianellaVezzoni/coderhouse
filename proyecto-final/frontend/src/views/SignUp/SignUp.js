import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./SignUp.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {AUTH} from "../../config/constans";

const SignUp = () => {
  const navigate = useNavigate();
  const [publishStatusModal, setPublishStatusModal] = useState({
    isVisible: false,
    message: "",
  });
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    address: "",
    age: "",
    phone: "",
  });

  const onHandleChange = (value, inputName) => {
    setForm({
      ...form,
      [inputName]: value.target.value,
    });
  };

  const onSubmit = async () => {
    await axios.post(`${AUTH}/signUp`, { ...form }).then((res) => {
      setPublishStatusModal({
        isVisible: true,
        message: res.data.message,
      });
      navigate("/login");
    });
  };

  return (
    <div>
      <Typography>Bienvenido/a!</Typography>
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
            onChange={(text) => onHandleChange(text, "email")}
            label="Email"
            variant="outlined"
            required
            value={form?.email || ""}
          />
          <TextField
            id="outlined-basic"
            onChange={(text) => onHandleChange(text, "password")}
            label="Contraseña"
            variant="outlined"
            value={form?.password || ""}
            required
            type={'password'}
          />
          <TextField
            id="outlined-basic"
            onChange={(text) => onHandleChange(text, "name")}
            label="Nombre"
            variant="outlined"
            value={form?.name || ""}
            required
          />
          <TextField
            id="outlined-basic"
            onChange={(text) => onHandleChange(text, "address")}
            label="Dirección"
            variant="outlined"
            value={form?.address || ""}
            required
          />
          <TextField
            id="outlined-basic"
            onChange={(text) => onHandleChange(text, "age")}
            label="Edad"
            variant="outlined"
            value={form?.age || ""}
            required
          />
          <TextField
            id="outlined-basic"
            onChange={(text) => onHandleChange(text, "phone")}
            label="Número de teléfono"
            variant="outlined"
            value={form?.phone || ""}
            required
          />
        </Box>
        <Typography>
          Ya tenes cuenta? <Link to="/login">Inicia sesión</Link>
        </Typography>
        <Button onClick={() => onSubmit()} variant="contained">
          Enviar
        </Button>
        <Button
          onClick={() =>
            setForm({
              email: "",
              name: "",
              password: "",
              address: "",
              age: "",
              phone: "",
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
    </div>
  );
};

export default SignUp;
