// Configuracion de mongoose(conexion entre node y mongo)

// Importacion
const mongoose = require("mongoose");

// Establece la conexion
const dbConnection = async () => {
    console.log(process.env.DB_CNN);
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('conexion a la bd lista');
    } catch (error) {
        console.log(error);
        throw new Error('algo fallo en la conexion a la bd')
    }
}

module.exports = {
    dbConnection
}