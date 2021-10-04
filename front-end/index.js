let elementoAbreForm = document.querySelector('#abre');
const form = document.getElementById('formulario');

const urlApi = "http://localhost:3000/filmes";
const listaFilmes = document.getElementById("listaFilmes")

let edicap = false;
let idEdicao = 0;

//Apagar form do html
const formulario = elementoAbreForm.addEventListener('click', ()=>{
    
    form.insertAdjacentHTML("beforeend", `
    <form onsubmit="submit(event)" class="row gx-3 gy-2 align-items-center" >
            <label for="" >Filme</label>
            <input type="text" required id="nome" placeholder="Digite o nome do filme">
            <label for="">Capa</label>
            <input type="text" required id="img" placeholder="Insira a URL da imagem do filme">
            <br>
            <label for="">Gênero</label>
            <select required id="genero" name="genero" id="" >
                <option value="primeiro">Drama</option>
                <option value="segundo">Terror</option>
                <option value="terceiro">Suspense</option>
                <option value="quarto">Comédia</option>
                <option value="quinto">Ação</option>
                <option value="sexto">Biográficos</option>
                <option value="setimo">Animação</option>
                <option value="oitavo">Ficção Científica</option>
                <option value="nono">Documentário</option>
                <option value="decimo">Musical</option>
                <option value="dprimeiro">Outro</option>
            </select>
            <label for="" required id="nota" >Avaliação</label>
            <select name="nota" id="">
                <option value="nota1">1</option>
                <option value="nota2">2</option>
                <option value="nota3">3</option>
                <option value="nota4">4</option>
                <option value="nota5">5</option>
            </select>
            <button class="btn btn-outline-light">Enviar</button>
        
        </form>
    `)
}); 

getFilmes = async () =>{
    const response = await fetch(urlApi);
    const data = await response.json();
    console.log(data);
    data.map((filme) =>{
        listaFilmes.insertAdjacentHTML('beforeend', `
        <div class="card bg-dark " id="cards">
            <img src="${filme.image}" class="card-img" alt="...">
            <div class="card-img-overlay">
                <h5 class="card-title">${filme.nome}</h5>
                <p class="card-text">${filme.genero}</p>
                <span class="card-text">${filme.nota}</span> 
                <span class="itens"></span>
                <p></p>
                <i class="fa fa-eye" aria-hidden="true" value="false" id="view"></i>
                <button onclick="putFilme(${filme.id})"><i class="fa fa-pencil" aria-hidden="true" ></i></button>
                <button onclick="deleteFilme(${filme.id})"><i class="fa fa-trash" aria-hidden="true" ></i></button>
            </div>
        </div>
        `)
    })
};

getFilmes();

const submit = async(evento) =>{
    evento.preventDefault();
    let nome = document.getElementById('nome');
    let img = document.getElementById('img');
    let nota = document.getElementById("nota");
    let genero = document.getElementById("genero");

    const filme = {
        nome: nome.value,
        img: img.value,
        genero: genero.value,
        nota: nota.value
    };
    if(!edicao) {
        const request = new Request(`${urlApi}/add`,{
            method: 'POST',
            body: JSON.stringify(filme),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        const response = await fetch(request);
        const result = await response.json()
        if(result) {
            getFilmes();
        }
    }else{
        const request = new Request(`${urlApi}/${idEdicao}`, {
            method: 'PUT',
            body: JSON.stringify(filme),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
    })
    const response = await fetch(request);
        const result = await response.json()
        if(result) {
            getFilmes();
        }
    }
    nome.value = '';
    img.value = '';
    nota.value = 'nota1';
    genero.value = 'primeiro';

    listaFilmes.innerHTML = '';
}

const filmeId = async(id) =>{
    const response = await fetch(`${urlApi}/${id}`);
    return filme = response.json();
}


const editFilme = async (id) =>{
    edicao = true;
    idEdicao = id;

    const filme = await filmeId(id);
    let nomeEd = document.getElementById('nome');
    let imgEd = document.getElementById('img');
    let generoEd = document.getElementById('genero');
    let notaEd = document.getElementById('nota');

    nomeEd.value = filme.nome;
    imgEd.value = filme.img;
    generoEd.value = filme.genero;
    notaEd.value = filme.nota;
}

const deleteFilme = async(id) =>{
    const request = new Request(`${urlApi}/${id}`, {
        method: 'DELETE',
    })
    const response = await fetch(request);
    const data = await response.json();
    console.log(data.message);
    
    lista.innerHTML = '';
    getFilmes();
}



