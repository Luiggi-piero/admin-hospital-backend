const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");

const { generarJwt } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
const { getMenuFrontEnd } = require("../helpers/menu-frontend");

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
    }

    // Generar token - JWT
    const token = await generarJwt(usuarioDB.id);

    res.json({
      ok: true,
      token,
      menu: getMenuFrontEnd(usuarioDB.role),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Algo salio mal durante el login",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  try {
    // Veirifica el token que viene de google
    const { name, email, picture } = await googleVerify(req.body.token);

    const usuarioDB = await Usuario.findOne({ email });
    let usuario;

    if (!usuarioDB) {
      usuario = new Usuario({
        nombre: name,
        img: picture,
        email,
        password: "$$",
        google: true,
      });
    } else {
      usuario = usuarioDB;
      usuario.google = true;
    }

    // Guardar usuario
    await usuario.save();

    // Generar token - JWT
    const token = await generarJwt(usuario.id);

    res.json({
      ok: true,
      name,
      email,
      picture,
      token,
      menu: getMenuFrontEnd(usuario.role),
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Token de Google inválido",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;

  // Generar token - JWT
  const token = await generarJwt(uid);

  // Recuperar usuario
  const usuario = await Usuario.findById(uid);

  res.json({
    ok: true,
    token,
    usuario,
    menu: getMenuFrontEnd(usuario.role),
  });
};

module.exports = {
  login,
  googleSignIn,
  renewToken,
};
