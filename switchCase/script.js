const nome = prompt("Digite seu nome:")
const mesagemDisplay = document.getElementById('mesagem')

switch (nome) {
  case "Jonh":
  case "Jonh":
    mesagemDisplay.innerHTML = `Eu tenho um irmão com este nome: ${nome}`;
    break
  default:
    mesagemDisplay.innerText = `Gostei do seu nome!`
}
