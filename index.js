// Importaciones
require("dotenv").config();

const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");

// Crear/define el servidor express
const app = express();

// Configurar cors (para que el cliente se pueda conectar con el servidor)
app.use(cors());

// Lectura y parseo del body(express recibe la información del body)(usa un middleware)
app.use(express.json())

// Conexion a la bd
dbConnection();

// Rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/login", require("./routes/auth"));

// Levanta el servidor
app.listen(process.env.PORT, () => {
  console.log("servidor corriendo en el puerto " + process.env.PORT);
});
