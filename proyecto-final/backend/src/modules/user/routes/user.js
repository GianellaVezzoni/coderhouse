const express = require("express");
const UserMongoController = require("../controllers/UserMongoController");
const router = express.Router();

router.post("/signUp", async (req, res) => {
  try {
    const userData = req.body;
    const user = new UserMongoController();
    const userCreated = await user.createUser(userData);
    if (userCreated) {
      return res.status(200).json({
        status: "success",
        message: `Usuario creado! ID asignado ${userCreated._id}`,
      });
    }

    return res.status(400).json({
      status: "error",
      message: "Error al crear el usuario.",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "error",
      error: "Error al crear el usuario.",
    });
  }
});

router.get("/login", async (req, res) => {
  try {
    const userData = req.body;
    const user = new UserMongoController();
    const userLoginResult = await user.loginUser(userData);
    if (userLoginResult !== null) {
      return res.status(200).json({
        status: "success",
        message: `Login exitoso!`,
      });
    }

    return res.status(400).json({
      status: "error",
      message: "Error al loguearse.",
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      error: "Error al loguearse.",
    });
  }
});

module.exports = router;
