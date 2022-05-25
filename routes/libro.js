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
    booksSchema.findByIdAndDelete(id, (err, libro) => {
        if (err) throw err;
        res.json({ estado: 'ok', mensaje: 'Libro eliminado' });
    }
    );
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

router.put('/actualizarlibro/:id', (req, res) => {
    let id = req.params.id;
    let librodata = req.body;
    booksSchema.findById(id, (err, libro) => {
        if (err) throw err;
        libro.titulo = librodata.titulo;
        libro.isbn = librodata.isbn;
        libro.nombre = librodata.nombre;
        libro.genero = librodata.genero;
        libro.sinopsis = librodata.sinopsis;
        libro.portada = librodata.portada;
        libro.precio = librodata.precio;
        libro.stock = librodata.stock;
        libro.autor = librodata.autor;
        libro.editorial = librodata.editorial;
        libro.año_publicacion = librodata.año_publicacion;
        libro.save((err, libro) => {
            if (err) throw err;
            res.json({estado: 'ok', mensaje: 'Libro actualizado'});
        });
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
    console.log(genero);
    booksSchema.find({
        'libros.genero': genero
    }, (err, autores) => {
        if (err) throw err;
        res.json(autores);
    });
});



router.get('/buscarLibroNombre/:nombre', (req, res) => {
    let nombre = req.params.nombre;
    console.log(nombre);
    // buscar coincidencias en nombre
    booksSchema.find({
        'nombre': {
            $regex: nombre,
            $options: 'i'
        }
    }, (err, autores) => {
        if (err) throw err;
        res.json(autores);
    }).populate('autor');
});

module.exports = router;