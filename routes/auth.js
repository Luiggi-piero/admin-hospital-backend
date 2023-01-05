// Ruta -> /api/login

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { login } = require("../controllers/auth");

const router = Router();

router.post(
  "/",
  [
    check("email", "El email es necesario").isEmail(),
    check("password", "El pasword es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;