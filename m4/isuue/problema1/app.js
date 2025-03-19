// problema 1: manipulação básica de JSON

// criar obj
const pessoa = {
  nome: "Jonh Alex",
  idade: 20,
  profissao: "Desenvolvedor Web"
};

// serializar
const pessoaJSON = JSON.stringify(pessoa);
console.log("Objeto serializado para JSON:");
console.log(pessoaJSON);

// desserializar com validação
function parseJSON(jsonString) {
  try {
    const objeto = JSON.parse(jsonString);
    console.log("Desserialização bem-sucedida:");
    console.log(objeto);
    return objeto;
  } catch (erro) {
    console.error("Erro ao converter o JSON para objeto:");
    console.error(`Mensagem de erro: ${erro.message}`);
    return null;
  }
}

// testes
console.log("\n--- TESTES ---");

// teste com JSON válido
console.log("\nTeste com JSON válido:");
parseJSON(pessoaJSON);

// teste com JSON inválido, porém sintaticamente correto
console.log("\nTeste com JSON inválido:");
parseJSON('{"nome": "Jonh", "idade": 20, profissao: "Estudante"}');
