function mudarCor() {
  let titulo = document.getElementById('titulo');
  let botao = document.getElementById('btn');

  if (botao.textContent === "Acesso") {
    titulo.style.backgroundColor = "green";
    botao.textContent = "Apagado";
  } else {
    titulo.style.backgroundColor = "red";
    botao.textContent = "Acesso";
  }
}
