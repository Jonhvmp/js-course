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


//================= Teste coodesh ===================

// function calculoImc(peso, altura) {
//   const imc = peso / (altura * altura);

//   if(imc < 18.5) {
//     return 'Abaixo do peso';
//   } else if (imc >= 18.5 && imc <= 24.9) {
//     return 'Peso normal';
//   } else if (imc >= 25 && imc <= 29.9) {
//     return 'Sobrepeso';
//   } else if (imc >= 30 && imc <= 34.9) {
//     return 'Obesidade grau I';
//   } else if (imc >= 35 && imc <= 39.9) {
//     return 'Obesidade grau II';
//   } else {
//     return 'Obesidade grau III';
//   }
// }

// teste 2 > multiplo de 3 e 5

// function multi3or5(num) {
//   let soma = 0; // inicializa a variável soma

//   for (let i = 0; i < num; i++) { // i começa em 0, enquanto i for menor que num, incrementa i
//     if (i % 3 === 0 || i % 5 === 0) {
//       soma += i; // soma recebe o valor de i + soma
//     }
//   }
//   return soma;
// }
