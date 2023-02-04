const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

// next() -> funcion que se llama si todo se ejecuta de forma correcta

const validarJWT = (req, res = response, next) => {
  // leer token
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Token no encontrado en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    // Agregar informacion a 'req' para que lo reciba el controlador
    // El uid es el identificador del usuario dueño el token
    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token inválido",
    });
  }
};

const validarADMIN_ROLE = async (req, res = response, next) => {
  const uid = req.uid;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el usuario",
      });
    }

    if (usuarioDB.role !== "ADMIN_ROLE") {
      return res.status(401).json({
        ok: false,
        msg: "No tiene los permisos necesarios",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Consulte con el administrador",
    });
  }
};

const validarADMIN_ROLE_o_MismoUsuario = async (req, res = response, next) => {
  const uid = req.uid;
  const id = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el usuario",
      });
    }

    if (usuarioDB.role !== "ADMIN_ROLE" && uid !== id) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene los permisos necesarios",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Consulte con el administrador",
    });
  }
};

module.exports = {
  validarJWT,
  validarADMIN_ROLE,
  validarADMIN_ROLE_o_MismoUsuario
};
