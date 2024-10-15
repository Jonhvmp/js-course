const InputPeso = document.querySelector('#peso');
const InputAltura = document.querySelector('#altura');
const Button = document.getElementById('btn');
const Resultado = document.getElementById('resultado');

const calcularIMC = (peso, altura, callback) => {
  const imc = peso / (altura * altura);
  callback(imc);
};

Button.addEventListener('click', function () {
  const peso = parseFloat(InputPeso.value);
  const altura = parseFloat(InputAltura.value);

  if (!peso || !altura) {
    Resultado.textContent = 'Preencha todos os campos';
    return;
  }

  calcularIMC(peso, altura, function (imc) {
  Resultado.textContent = `${imc.toFixed(2)}`;
  });
});
