import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Login.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [publishStatusModal, setPublishStatusModal] = useState({
    isVisible: false,
    message: "",
  });
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onHandleChange = (value, inputName) => {
    setForm({
      ...form,
      [inputName]: value.target.value,
    });
  };

  const onSubmit = async () => {
    await axios.post("", { ...form }).then((res) => {
      setPublishStatusModal({
        isVisible: true,
        message: res.data.message,
      });
    });
  };

  return (
    <div>
      <Typography>Iniciar sesión</Typography>
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
          />
        </Box>
        <Typography>
          No tenes cuenta? <Link to="/registro">Registrate ahora</Link>
        </Typography>
        <Button onClick={() => onSubmit()} variant="contained">
          Enviar
        </Button>
        <Button
          onClick={() =>
            setForm({
              email: "",
              password: "",
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

export default Login;
