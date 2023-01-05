// Importaciones
const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        default: false
    }
});

// Sobrescribir schema para cambiar los nombres de las propiedades
UsuarioSchema.method('toJSON', function(){
    // instancia del objeto actual ->  this.toObject()
    const { __v, _id, password, ...object} = this.toObject();
    object.uid =  _id;
    // console.log('object final',object);
    return object;
});

// Un modelo usa un schema
module.exports = model('Usuario', UsuarioSchema);