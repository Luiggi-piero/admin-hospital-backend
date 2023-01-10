const path = require("path"); // para construir un path

const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const fs = require("fs-extra");

const fileUpload = (req, res = response) => {
  // Nombre de la coleccion (tipo)
  const tipo = req.params.tipo;
  // id del documento
  const id = req.params.id;

  // Validar tipo
  const tipoValidos = ["hospitales", "medicos", "usuarios"];
  if (!tipoValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "El tipo no es válido, usar hospitales, medicos o usuarios",
    });
  }

  // Responde con un bad request si no hay archivo para cargar
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay archivos para guardar",
    });
  }

  // Procesar imagen
  const file = req.files.imagen;
  // Extrae la extension del archivo
  const nombreCortado = file.name.split(".");
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  // Validar extension
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: "Extensión del archivo no válida",
    });
  }

  // Crear el nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  // Ruta para almacenar la imagen
  const path = `./uploads/${tipo}/${nombreArchivo}`;

  // Colocar la imagen en el servidor
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error al colocar la imagen",
      });
    }

    // Actualizar bd
    actualizarImagen(tipo, id, nombreArchivo);

    res.json({
      ok: true,
      nombreArchivo,
      msg: "Archivo cargado",
    });
  });
};

const retornaImagen = (req, res = response) => {
  const { tipo, foto } = req.params;

  // path.join(ubicacion_de_la_aplicacion_desplegada, ubicacion_de_la_imagen)
  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

  // Retornar imagen por defecto sino existiera
  if(fs.existsSync(pathImg)){
    // Responde una imagen
    res.sendFile(pathImg);
  }else{
    // Imagen por defecto
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }
};

module.exports = { fileUpload, retornaImagen };
