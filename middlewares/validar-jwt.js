const { response } = require("express");
const jwt = require('jsonwebtoken');

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
        msg: 'Token inválido'
    })
  }
};

module.exports = {
  validarJWT,
};
