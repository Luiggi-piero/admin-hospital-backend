// ruta -> /api/usuarios

const { Router } = require("express");
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require("../controllers/usuarios");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getUsuarios);

router.post(
  "/",
  [
    // check('nombre_del_campo', 'mensaje_de_error)
    check("nombre", "El nombre es necesario").not().isEmpty(),
    check("password", "El password es necesario").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuario
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es necesario").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El rol es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);

router.delete("/:id", validarJWT, borrarUsuario);

module.exports = router;