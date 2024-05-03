// Codigo realizado por Lucas y Adrian Giner.
const express = require('express');
const app = express();
const fs = require("fs")
const scraping = require("./scraping")
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/scraping', scraping);

// Obtener todas las noticias.
app.get('/noticias', (req, res) => {
    try {
        const data = fs.readFileSync('noticias.json', 'utf-8');
        noticias = JSON.parse(data);
        res.send(noticias);
    } catch (error) {
        console.error('Error al leer el archivo noticias.json:', error.message);
    }
})

// Obtener una noticia por indice.
app.get("/noticias/:id",(req,res)=>{
    const id = req.params['id'];

    try {
        const data = fs.readFileSync('noticias.json', 'utf-8');
        noticias = JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo noticias.json:', error.message);
    }

    if (id > noticias.length - 1) { res.send("No tenemos tantas noticias.");    };

    res.send(noticias[id]);
})

// Crear una nueva noticia.
app.post('/noticias', (req, res) => {
    try {
        const data = fs.readFileSync('noticias.json', 'utf-8');
        noticias = JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo noticias.json:', error.message);
    }

    const noticia = {
        titulo: req.body.titulo,
        imagen: req.body.imagen,
        descripcion: req.body.descripcion,
        enlace: req.body.enlace,
    };

    noticias.push(noticia);
    fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
    res.send(noticias)
})

// Actualizar una noticia.
app.put("/noticias/:id",(req,res)=>{
    const id = req.params['id'];

    try {
        const data = fs.readFileSync('noticias.json', 'utf-8');
        noticias = JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo noticias.json:', error.message);
    }

    if (id > noticias.length - 1) { res.send("No tenemos tantas noticias.");    };

    noticias[id].titulo = req.body.titulo ? req.body.titulo : noticias[id].titulo;
    noticias[id].imagen = req.body.imagen ? req.body.imagen : noticias[id].imagen;
    noticias[id].descripcion = req.body.descripcion ? req.body.descripcion : noticias[id].descripcion
    noticias[id].enlace = req.body.enlace ? req.body.enlace : noticias[id].enlace;

    fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
    res.send(noticias);
})

// Borrar una noticia por indice.
app.delete('/noticias/:id', (req, res) => {
    const id = req.params['id']

    try {
        const data = fs.readFileSync('noticias.json', 'utf-8');
        noticias = JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo noticias.json:', error.message);
    }
    
    if (id > noticias.length - 1) { res.send("No tenemos tantas noticias.");    };

    noticias.splice(id, 1);
    fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
    res.send(noticias);
})


app.listen(port,() =>{
    console.log(`Server active at http://localhost:${port}`)
})