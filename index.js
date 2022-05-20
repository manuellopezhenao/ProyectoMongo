const express = require('express');
const fileUpload = require('express-fileupload')

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));

// Middlewares

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Routes
app.use(require('./routes/autor'));
app.use(require('./routes/libro'));
app.use(require('./routes/imagenes'));

app.use(fileUpload())






// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')} `);
});