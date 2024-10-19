/* Arquivo JS aula 02 DOM + alterar CSS */

let titulo = document.querySelector('h1')
titulo.textContent = 'Aula 02 Manipular CSS'
titulo.innerHTML = 'Aula Manipular CSS'
let imagem = document.querySelector('#foto')
imagem.setAttribute('src', '../assets/img/imagem.png')
imagem.setAttribute('width', '210px')
// imagem.style.border = '2px solid red'

/* MANIPULAR CSS */
document.querySelector('h1').style.color = "red";
titulo.style.color = "red";
titulo.style.backgroundColor = "#121212";
titulo.style.borderBottom = "2px solid red";
titulo.style.padding = "10px";
titulo.style.borderRadius = "5px";

let box = document.querySelectorAll('.box')
box[0].setAttribute('class', 'escuro')
// box[0].removeAttribute('class')

// /////// MODOS DE COR ///////
let tela = document.querySelector('main')

// selecionando os botões e criando as variáveis para eles
let btnDark = document.getElementById('btdark')
let btnLight = document.getElementById('btlight')

btnDark.addEventListener('click', modoDark)
btnLight.addEventListener('click', modoLight)

function modoDark() {
    //event.preventDefault();
    console.log('modo dark')
    tela.classList.add("dark");
    tela.classList.remove("light");
    console.log(classList)
}

function modoLight() {
    //event.preventDefault();
    console.log('modo light')
    tela.classList.remove("dark");
    tela.classList.add("light");
    console.log(classList)
}

// /////// MUDAR ID ///////

titulo.addEventListener('click', mudarId)

function mudarId() {
    titulo.id = 'titulo'
    console.log(titulo.id)
    // return titulo.id
}

// mudarId()

const btnAdd = document.getElementById('addTask')
const campoTask = document.getElementById('newTask')
const lista = document.getElementById('taskList')

btnAdd.addEventListener("click", function (event) {
    event.preventDefault();
    const textTask = campoTask.value;

    if (textTask.trim() !== "") {
        // criar uma li
        const newTask = document.createElement("li");

        // criando btn excluir task
        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Excluir";

        btnDelete.style.marginLeft = "10px"

        btnDelete.addEventListener("click", function () {
            lista.removeChild(newTask);
        })

        newTask.textContent = textTask;

        newTask.appendChild(btnDelete)

        lista.appendChild(newTask);

        // limpa o campo de entrada
        campoTask.value = "";
    }
});
