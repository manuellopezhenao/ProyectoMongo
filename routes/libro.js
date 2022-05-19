const express = require("express");
const router = express.Router();

const { booksSchema } = require("../schemas/books_schema");


let date = new Date();
console.log(date);


router.post('/guardarlibro', (req, res) => {
    let libro = req.body;
    booksSchema.create(libro, (err, libro) => {
        if (err) throw err;
        res.json({ estado: 'ok', mensaje: 'Libro guardado' });
    });
});

router.delete('/eliminarlibro/:id', (req, res) => {
    let id = req.params.id;
    booksSchema.findById(id, (err, autor) => {
        if (err) throw err;
        autor.libros.pull(id);
        autor.save((err, autor) => {
            if (err) throw err;
            res.json({estado: 'ok', mensaje: 'Libro eliminado'});
        });
    });
});

router.get('/listarlibros/:id', (req, res) => {
    let id = req.params.id;
    booksSchema.findById(id).populate('autor').exec((err, libro) => {
        if (err) throw err;
        res.json(libro);
    });

});

router.get('/listarlibros/', (req, res) => {
    
    booksSchema.find().populate('autor').exec((err, libros) => {
        if (err) throw err;
        res.json(libros);
    });

});

router.get('/buscarlibro/:id', (req, res) => {
    let id = req.params.id;
    booksSchema.findById(id, (err, autor) => {
        if (err) throw err;
        res.json(autor.libros.id(id));
    });
});

// buscar libros pór autor
router.get('/buscarlibrosautor/:idautor', (req, res) => {
    let idautor = req.params.id;
    booksSchema.find({
        'libros.autor': idautor
    }, (err, autores) => {
        if (err) throw err;
        res.json(autores);
    });
});

// buscar libros por genero
router.get('/buscarlibrosgenero/:genero', (req, res) => {
    let genero = req.params.genero;
    booksSchema.find({
        'libros.genero': genero
    }, (err, autores) => {
        if (err) throw err;
        res.json(autores);
    });
});

module.exports = router;