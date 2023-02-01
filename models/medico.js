// Importaciones
const {Schema, model} = require('mongoose');

const MedicoSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    // El schema medico esta relacionado con el schema Usuario  y hospital
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true 
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true 
    }
});

// Sobrescribir schema para cambiar los nombres de las propiedades
MedicoSchema.method('toJSON', function(){
    // instancia del objeto actual ->  this.toObject()
    const { __v, ...object} = this.toObject();
    return object;
});

// Un modelo usa un schema
module.exports = model('Medico', MedicoSchema);