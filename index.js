// Importaciones
require('dotenv').config();

const express = require('express');
const {dbConnection} = require('./database/config');
const cors = require('cors');

// Crear/define el servidor express
const app = express();

// Configurar cors
app.use(cors());

// Conexion a la bd
dbConnection();


// Rutas
app.get('/', (request, response)=>{
    response.json({
        ok:true,
        msg: 'peticion al /'
    })
})

// Levanta el servidor
app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en el puerto '+ process.env.PORT);
})
