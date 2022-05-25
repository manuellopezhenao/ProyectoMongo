const express = require("express");
const router = express.Router();
var path = require('path');
var fs = require("fs");



const { v4 } = require('uuid');
const { booksSchema } = require("../schemas/books_schema");

async function saveImage(filename, data) {
    var myBuffer = Buffer(data.length);
    for (var i = 0; i < data.length; i++) {
        myBuffer[i] = data[i];
    }
    fs.writeFile(
        `./public/portadas/${filename}.jpg`,
        myBuffer,
        function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        }
    );
}


router.post('/upload', (req, res) => {
    console.log(req.body.portada);
    let id = v4();
    let filename = id; 
    let data = req.body.portada;
    saveImage(filename, data);
    res.json({ id: "http://192.168.15.98:3000/getimage/" + id + ".jpg" });
    console.log({ id: "http://192.168.15.98:3000/getimage/" + id + ".jpg" });
});


router.get('/getimage/:id', (req, res) => {
    var options = {
        root: path.join(__dirname, '../public/portadas/'),
    };
    res.sendFile(`${req.params.id}`, options, function (err) {
        if (err) {
            console.log(err);
        }
    });
});

router.get('/actualizarips', (req, res) => {

    let books = booksSchema.find({"portada": /172.22.40.99/}).then(books => {
        for (let i = 0; i < books.length; i++) {
        books[i].portada = books[i].portada.replace("172.22.40.99", "192.168.15.98");
        books[i].save();
    }

   res.json(books);


    }).catch(err => {
        return res.json(err);
    });
    
});




module.exports = router;