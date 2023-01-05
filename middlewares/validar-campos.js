const { response } = require("express");
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
  // Obtiene los errores que vienen del middleware
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errores.mapped(),
    });
  }
  next();
};

module.exports = {
  validarCampos,
};
