// connecion to database database books
// import mongoose
const mongoose = require('mongoose');

mongoose.connection.openUri('mongodb://localhost:27017/books', (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
});

mongoose.set('debug', true);


module.exports = {mongoose};






