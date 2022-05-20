const express = require("express");
const router = express.Router();
var path = require('path');
var fs = require("fs");



const { v4 } = require('uuid');

async function saveImage(filename, data) {
    var myBuffer =  Buffer(data.length);
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
    res.json({ id: "http://172.22.40.99:3000/getimage/" + id + ".jpg" });
    console.log({ id: "http://172.22.40.99:3000/getimage/" + id + ".jpg" });
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




module.exports = router;