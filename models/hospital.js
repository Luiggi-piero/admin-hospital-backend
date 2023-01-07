// Importaciones
const {Schema, model} = require('mongoose');

const HospitalSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    // El schema hospital esta relacionado con el schema Usuario 
    usuario:{
        required: true, 
        type: Schema.Types.ObjectId,
        ref: 'Usuario' 
    }
}, {collection: 'hospitales'});

// Sobrescribir schema para cambiar los nombres de las propiedades
HospitalSchema.method('toJSON', function(){
    // instancia del objeto actual ->  this.toObject()
    const { __v, ...object} = this.toObject();
    return object;
});

// Un modelo usa un schema
module.exports = model('Hospital', HospitalSchema);