const express = require('express');
const app = express();
const port = 3000;

const filmes =[];

app.get('/', (req, res) =>{
    res.send("Bem vindo a minha página de filmes!");
});

app.get('/filmes',(req, res)=>{
    res.send(filmes);
});

app.get('/filmes/:id', (req,res)=>{
    const id = req.params.id;
    const filmeEscolhido = filmes.find((filmeEscolhido)=>{
        return filmeEscolhido.id == id;
    });
    res.send(filmeEscolhido)
});



app.listen(port, ()=>{
    console.log(`Servidor rodando na porta http://localhost:${port}`)
});