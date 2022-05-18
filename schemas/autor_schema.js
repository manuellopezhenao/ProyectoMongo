// create book schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {} = require('../db/connection');


const autorSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    edad : {
        type: Number,
        required: true
    },
    nacionalidad: {
        type: String,
        required: true
    },
});

module.exports = {autorSchema}

