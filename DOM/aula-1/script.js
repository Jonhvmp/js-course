// Aula de Manipulação de DOM

// Selecionando um elemento a partir do ID
let botao = document.getElementById('meuBotao');
console.log(botao);

// // Selecionando um elemento a partir da classe
let paragrafo = document.getElementsByClassName('meuParagrafo');
// console.log(paragrafo);

// // Selecionando um elemento a partir da tag
let headers = document.getElementsByTagName('h1');
console.log(headers);

// headers[1].style.color = 'red';

// // Selecionando um elemento a partir do seletor
let primeiroPargrafo = document.querySelector('p');
console.log(primeiroPargrafo);

let todosParagrafos = document.querySelectorAll('p');
console.log(todosParagrafos);
