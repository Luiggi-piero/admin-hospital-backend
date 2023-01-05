const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJwt } = require('../helpers/jwt');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuarioDB = await Usuario.findOne({ email });

    // Validar email
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }

    // Validar password
    //bcrypt.compareSync( contraseña_que_escribe_el_usuario, hash_string_encriptado_de_la_bd)
    const validPasword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPasword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña inválida",
      });
    };

    // Generar token - JWT
    const token = await generarJwt(usuarioDB.id);

    res.json({
      ok: true,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Algo salio mal durante el login",
    });
  }
};

module.exports = {
  login,
};
