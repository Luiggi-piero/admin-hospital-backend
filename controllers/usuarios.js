const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJwt } = require("../helpers/jwt");

const Usuario = require("../models/usuario");

const getUsuarios = async (request, response) => {
  const usuarios = await Usuario.find({}, "nombre email google role");
  // const usuarios = await Usuario.find(); // Obtiene todo sin filtrar

  response.json({
    ok: true,
    usuarios,
  });
};

const crearUsuario = async (request, res = response) => {
  const { email, password } = request.body;

  // Validar el correo unico
  try {
    // const existeEmail = Usuario.findOne({email:'luiggiyantas@gmail.com'}) // Busca un valor estatico

    // const existeEmail = Usuario.findOne({email: email}) // Busca un documento donde el 'email' es igual al 'email' que viene del 'request.body'
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya esta existe en la bd",
      });
    }

    const usuario = new Usuario(request.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync(); // genera una data aleatoria para ayudar a la ecriptacion
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar en la bd
    await usuario.save();

    // Generar token
    const token = await generarJwt(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "algo salio mal",
    });
  }
};

const actualizarUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: "Registro no encontrado",
      });
    }

    // Actualizar
    const { password, google, email, ...campos } = req.body;
    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email });

      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Este email ya esta en uso",
        });
      }
    }

    campos.email = email;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "algo salio mal al actualizar",
    });
  }
};

const borrarUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: "Registro a eliminar no fue encontrado",
      });
    }

    // Eliminar
    await Usuario.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: "Usuario eliminado con exito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Algo salio mal al borrar",
    });
  }
};

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
};
