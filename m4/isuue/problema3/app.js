// problema 3: processamento de arrays JSON

// criar obj
const biblioteca = {
  nome: "Biblioteca Central",
  livros: [
    { titulo: "JavaScript Avançado", autor: "João Silva", paginas: 320 },
    { titulo: "Programação Web", autor: "Maria Oliveira", paginas: 280 },
    { titulo: "Algoritmos", autor: "Carlos Santos", paginas: 450 }
  ]
};

// serializar
const bibliotecaJSON = JSON.stringify(biblioteca);
console.log("Biblioteca serializada para JSON:");
console.log(bibliotecaJSON);

// desserializar e processar
function processarBibliotecaJSON(jsonString) {
  try {
    const biblioteca = JSON.parse(jsonString);

    // verifica se o JSON tem a estrutura esperada
    if (!biblioteca.livros || !Array.isArray(biblioteca.livros)) {
      throw new Error("JSON inválido: array de livros não encontrado");
    }

    console.log("Desserialização bem-sucedida:");
    console.log(biblioteca);

    // processamento dos livros
    console.log("\nProcessando os livros da biblioteca:");

    // tt de páginas
    const totalPaginas = biblioteca.livros.reduce((total, livro) => total + livro.paginas, 0);
    console.log(`Total de páginas: ${totalPaginas}`);

    // l com mais de 300 páginas
    const livrosGrandes = biblioteca.livros.filter(livro => livro.paginas > 300);
    console.log("Livros com mais de 300 páginas:", livrosGrandes);

    // lista de títulos
    const titulos = biblioteca.livros.map(livro => livro.titulo);
    console.log("Títulos disponíveis:", titulos);

    return biblioteca;

  } catch (erro) {
    console.error("Erro ao processar o JSON da biblioteca:");
    console.error(`Mensagem de erro: ${erro.message}`);
    return null;
  }
}

// testes
console.log("\n--- TESTES ---");

// teste c JSON válido
console.log("\nTeste com JSON válido:");
processarBibliotecaJSON(bibliotecaJSON);

// teste com JSON inválido (estrutura incorreta)
console.log("\nTeste com JSON de estrutura incorreta:");
processarBibliotecaJSON('{"nome": "Biblioteca Municipal", "acervo": []}');

// teste com JSON sintaticamente inválido
console.log("\nTeste com JSON sintaticamente inválido:");
processarBibliotecaJSON('{"nome": "Biblioteca Escolar" "livros": []}');
