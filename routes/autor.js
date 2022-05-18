const express = require("express");
const router = express.Router();

const { autorSchema } = require('../schemas/autor_schema');



// rutas
router.post('/guardarautor', (req, res) => {
    let autor = req.body;
    console.log(autor);
    autorSchema.create(autor, (err, autor) => {
        if (err) throw err;
        res.json({estado: 'ok', mensaje: 'Autor guardado'});
    });
});

router.delete('/eliminarautor/:id', (req, res) => {
    let id = req.params.id;
    autorSchema.findByIdAndRemove(id, (err, autor) => {
        if (err) throw err;
        res.json({estado: 'ok', mensaje: 'Autor eliminado'});
    });
});

router.get('/listarautores', (req, res) => {
    autorSchema.find({}, (err, autores) => {
        if (err) throw err;
        res.json(autores);
    });
});

router.get('/buscarautor/:id', (req, res) => {
    let id = req.params.id;
    autorSchema.findById(id, (err, autor) => {
        if (err) throw err;
        res.json(autor);
    });
});

router.put('/actualizarautor/:id', (req, res) => {
    let id = req.params.id;
    let autordata = req.body;
    autorSchema.findById(id, (err, autor) => {
        
        // verficar si existe el autor
        if (!autor) {
            return res.json({
                success: false,
                msg: 'No existe el autor'
            });
        }


        autor.nombre = autordata.nombre;
        autor.edad = autordata.edad;
        autor.nacionalidad = autordata.nacionalidad;
        autor.save((err, autor) => {
            if (err) throw err;
            res.json({estado: 'ok', mensaje: 'Autor actualizado'});
        });
    });
});



module.exports = router;