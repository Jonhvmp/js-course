// function saudacao(nome, exibirSaudacao) {
//   exibirSaudacao(nome);
// }

// saudacao("Jonh", function (nome) {
//   console.log("Olá " + nome);
// }
// );

// function saudacao(nome, mostrarSaudacao) {
//   mostrarSaudacao(nome);
// }

// saudacao(prompt("Digite seu nome"), function (nome) {
//   alert("Olá " + nome);
// });

const saudacao = (function(nome, mostrarSaudacao) {
  mostrarSaudacao(nome);
})

(prompt("Digite seu nome"), function (nome) {
  alert("Olá " + nome);
});
