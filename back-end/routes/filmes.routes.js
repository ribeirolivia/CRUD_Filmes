const express = require('express');
const router = express.Router();

const dbFilmes = [
    {
        id: Date.now(),
        nome: "Jurassic Park",
        image: "https://images-na.ssl-images-amazon.com/images/I/81VSEcW5E6L.jpg",
        genero:"Ficção Científica",
        avaliação: "5"
    },
];

router.get('/', (req, res) =>{
    res.send(dbFilmes)
});

router.get('/:id', (req,res)=>{
    const idSolicitado = req.params.id;
    const idRetorno = dbFilmes.findIndex(filme => filme.id == idSolicitado);
    const filme = dbFilmes[idRetorno];
    res.send(filme);
});

router.put('/:id', (req, res) =>{
    const idSolicitado = req.params.id;
    const filmeAtual = req.body;
    const idRetorno = dbFilmes.findIndex(filme => filme.id == idSolicitado);
    dbFilmes[idRetorno] = {
        id: dbFilmes[idRetorno].id,
        ...filmeAtual
    }
    res.send(dbFilmes[idRetorno]);
});

router.post('/add', (req, res)=>{
    const filme = req.body;
    filme.id = Date.now();
    if(!filme){
        res.status(500).send({
            message: 'Tente novamente.'
        })
    }
    dbFilmes.push(filme);
    res.status(200).send({
        message: `${filme} cadastrado com sucesso!`,
        data: filme,
    })
    }
);

router.delete('/:id', (req, res) =>{
    const idSolicitado = req.params.id;
    const idRetorno = dbFilmes.findIndex(filme => filme.id == idSolicitado);
    dbFilmes.slice(idRetorno,1);
    res.send({
        message: 'Filme excluído com sucesso!',
    })
});


module.exports = router