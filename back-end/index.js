const express = require('express');
const app = express();
const cors = require('cors');
const FilmesRouter = require('./routes/filmes.routes');
const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/filmes', FilmesRouter);


app.listen(port, ()=>{
    console.log(`Servidor rodando na porta http://localhost:${port}`)
});