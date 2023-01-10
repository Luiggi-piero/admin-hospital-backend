const fs = require("fs-extra");

const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const borrarImagen = (path) => {
  if (fs.pathExistsSync(path)) {
    fs.removeSync(path);
  }
};

const actualizarImagen = async (tipo, id, nombreArchivo) => {
  let pathViejo = "";

  switch (tipo) {
    case "medicos":
      const medico = await Medico.findById(id);
      if (!medico) {
        console.log("No es un id de médico");
        return false;
      }

      // Ubicacion de la imagen antigua
      pathViejo = `./uploads/medicos/${medico.img}`;
      // Si existe una img en la ruta antigua se elimina
      borrarImagen(pathViejo);

      medico.img = nombreArchivo;
      await medico.save();
      return true;

      break;
    case "usuarios":
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log("No es un id de usuario");
        return false;
      }

      // Ubicacion de la imagen antigua
      pathViejo = `./uploads/usuarios/${usuario.img}`;
      // Si existe una img en la ruta antigua se elimina
      borrarImagen(pathViejo);

      usuario.img = nombreArchivo;
      await usuario.save();
      return true;

      break;
    case "hospitales":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("No es un id de hospital");
        return false;
      }

      // Ubicacion de la imagen antigua
      pathViejo = `./uploads/hospitales/${hospital.img}`;
      // Si existe una img en la ruta antigua se elimina
      borrarImagen(pathViejo);

      hospital.img = nombreArchivo;
      await hospital.save();
      return true;

      break;

    default:
      break;
  }
};

module.exports = {
  actualizarImagen,
};
