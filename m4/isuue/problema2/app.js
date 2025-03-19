// problema 2: validação de estrutura JSON

// criar obj
const produto = {
  id: 12345,
  nome: "Notebook",
  preco: 3500.99,
  especificacoes: {
    marca: "TechBrand",
    memoria: "16GB",
    armazenamento: "512GB SSD"
  }
};

// serializar
const produtoJSON = JSON.stringify(produto);
console.log("Produto serializado para JSON:");
console.log(produtoJSON);

// desserializar e validar com tratamento de erros
function deserializarEValidar(jsonString) {
  try {
    const objeto = JSON.parse(jsonString);

    // validar estrutura do JSON
    if (!objeto.id || !objeto.nome || !objeto.preco) {
      throw new Error("JSON inválido: propriedades obrigatórias ausentes");
    }

    if (typeof objeto.id !== 'number' || typeof objeto.nome !== 'string' || typeof objeto.preco !== 'number') {
      throw new Error("JSON inválido: tipos de dados incorretos");
    }

    console.log("Desserialização e validação bem-sucedidas:");
    console.log(objeto);
    return objeto;

  } catch (erro) {
    console.error("Erro no processamento do JSON:");
    console.error(`Mensagem de erro: ${erro.message}`);
    return null;
  }
}

// teste
console.log("\n--- TESTES ---");

// teste c JSON v
console.log("\nTeste com JSON válido:");
deserializarEValidar(produtoJSON);

// teste c JSON sem propriedades obrigatórias
console.log("\nTeste com JSON sem propriedades obrigatórias:");
deserializarEValidar('{"nome": "Monitor", "categoria": "Eletrônicos"}');

// teste com JSON inválido
console.log("\nTeste com JSON inválido:");
deserializarEValidar('{"id": "abc", "nome": 123, "preco": "caro"}');
