// create book schema
const {mongoose} = require('../db/connection');

const Schema = mongoose.Schema;

const booksSchema = mongoose.model('book', new Schema({
    isbn: {
        type: String,
        required: true
    },
    fecha_publicacion : {
        type: Date,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    editorial : {
        type: String,
        required: true
    },
    genero : {
        type: String,
        required: true
    },
    sinopsis : {
        type: String,
        required: true
    },
    portada : {
        type: String,
        required: true
    },
    precio : {
        type: Number,
        required: true
    },
    stock : {
        type: Number,
        required: true
    },
    autor : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'autor',
        required: true
    }]
}));

module.exports = {booksSchema}

