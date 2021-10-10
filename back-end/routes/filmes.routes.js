const express = require("express");
const router = express.Router();

const dbFilmes = [
  {
    id: Date.now(),
    nome: "Jurassic Park",
    image: "https://images-na.ssl-images-amazon.com/images/I/81VSEcW5E6L.jpg",
    genero: "Ficção Científica",
    nota: "5",
  },
  {
    id: Date.now(),
    nome: "Mulan",
    image:
      "https://static.stealthelook.com.br/wp-content/uploads/2021/02/series-e-filmes-do-disney-plus-mulan-20210205140508.jpg",
    genero: "Animação",
    nota: "5",
  },
  {
    id: Date.now(),
    nome: "Cruela",
    image:
      "https://lumiere-a.akamaihd.net/v1/images/image_46443ba4.jpeg?region=0,0,540,810&width=480",
    genero: "Animação",
    nota: "5",
  },
  {
    id: Date.now(),
    nome: "X-men",
    image: "https://upload.wikimedia.org/wikipedia/pt/0/06/X-Men_Filme.jpg",
    genero: "Ação",
    nota: "5",
  },
  {
    id: Date.now(),
    nome: "Capitão América",
    image: "https://m.media-amazon.com/images/I/91Ku9J2anzL._AC_SX522_.jpg",
    genero: "Ação",
    nota: "5",
  },
  {
    id: Date.now(),
    nome: "IT",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtzko3gnzefKf-kVTryg3IfEpGxfceLvsAA4zr80cAOK35b5eAnrN1ww3OJIqAYmZRMyA&usqp=CAU",
    genero: "Terror",
    nota: "5",
  },
];

router.get("/", (req, res) => {
  res.send(dbFilmes);
});

router.get("/:id", (req, res) => {
  const idSolicitado = req.params.id;
  const idRetorno = dbFilmes.findIndex((filme) => filme.id == idSolicitado);
  const filme = dbFilmes[idRetorno];
  res.send(filme);
});

router.put("/:id", (req, res) => {
  const idSolicitado = req.params.id;
  const filmeAtual = req.body;
  const idRetorno = dbFilmes.findIndex((filme) => filme.id == idSolicitado);
  dbFilmes[idRetorno] = {
    id: dbFilmes[idRetorno].id,
    ...filmeAtual,
  };
  res.send(dbFilmes[idRetorno]);
});

router.post("/add", (req, res) => {
  const filme = req.body;
  filme.id = Date.now();
  if (!filme) {
    res.status(500).send({
      message: "Tente novamente.",
    });
  }
  dbFilmes.push(filme);
  res.status(200).send({
    message: `${filme.nome} cadastrado com sucesso!`,
    data: filme,
  });
});

router.delete("/:id", (req, res) => {
  const idSolicitado = req.params.id;
  const idRetorno = dbFilmes.findIndex((filme) => filme.id == idSolicitado);
  dbFilmes.slice(idRetorno, 1);
  res.send({
    message: "Filme excluído com sucesso!",
  });
});

module.exports = router;
