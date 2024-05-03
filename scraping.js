// Codigo realizado por Lucas y Adrian Giner.
const express = require('express')
const router = express.Router()
const axios = require("axios");
const cheerio = require("cheerio")
const fs = require("fs")

const url = "https://elpais.com/ultimas-noticias/"

router.get('/scraping', (req, res) => {
    axios.get(url).then((response)=>{
        if (response.status ===200){
            const html = response.data
            const $ = cheerio.load(html)

            const noticias = [];
            

            $('._g-md article').each((i, el) => {
                const noticia = {
                    titulo: "",
                    imagen: "",
                    descripcion: "",
                    enlace: "",
                };

                noticia.titulo = $(el).find('h2').text();
                noticia.imagen = $(el).find("img").attr("src") ? $(el).find("img").attr("src") : "No tenemos imagen para este articulo."
                noticia.descripcion = $(el).find("p").text()
                noticia.enlace = $(el).find("h2 a").attr("href")

                noticias.push(noticia);
            })

            fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
            
            res.send(noticias);
        }
    })
})

module.exports = router;