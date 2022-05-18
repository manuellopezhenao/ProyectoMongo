// create servidor express
const express = require('express');
const app = express();

const {mongoose} = require('./db/connection');

// iniciar el servidor
app.listen(3000, () => {
    console.log(mongoose.connection.user);
    console.log('Servidor iniciado en el puerto 3000');
});


// rutas
app.post('/guardarautor', (req, res) => {
    let autor = req.body;
    mongoose.autorSchema.create(autor, (err, autor) => {
        if (err) throw err;
        res.json(autor);
    });
});