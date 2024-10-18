// Usando callbacks
const operar = (a, b, operacao) => {
  if (b === 0 && operacao === dividir) {
    return "Impossivel Divisão por zero!";
  }
  return operacao(a, b);
};

const dividir = (a, b) => a / b;

console.log(operar(10, 0, dividir)); // Impossivel Divisão por zero!
console.log(operar(10, 2, dividir)); // 5
