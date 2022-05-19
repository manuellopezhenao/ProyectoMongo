
const {mongoose} = require('../db/connection');
const Schema = mongoose.Schema;

const autorSchema = mongoose.model('autor', new Schema({
    nombre: {
        type: String,
        unique: true,
        required: true
    },
    nacionalidad: {
        type: String,
        required: true
    },
    foto_url : {
        type: String,
        required: true
    }, 
    año_nacimiento : {
        type: Number,
        required: true
    },
}));


module.exports = {autorSchema}

