const redline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

const {
  listarAlunos,
  adicionarAluno
} = require('./functions.js');

const rl = redline.createInterface({ input, output });

function exibirMenu() {
  console.log("\nMenu de Alunos:");
  console.log("1. Listar Alunos");
  console.log("2. Adicionar Aluno");
  console.log("0. Sair");
}

async function main() {
  while (true) {
    exibirMenu();
    const opcao = await rl.question("Escolha uma opção: ");

    switch (opcao) {
      case "1":
        listarAlunos();
        break;
      case "2":
        await adicionarAluno(rl);
        break;
      case "0":
        console.log("Saindo...");
        rl.close();
        return;
      default:
        console.log("Opção inválida. Tente novamente.");
    }

    await rl.question("\nPressione Enter para continuar...");
    console.clear();
  }
}

main();
