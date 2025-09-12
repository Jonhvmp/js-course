const alunos = require('./database.js');

function listarAlunos() {
  console.log("Lista de Alunos:");
  if (alunos.length === 0) {
    console.log("Nenhum aluno cadastrado.");
  } else {
      console.table(alunos);
  }
}

async function adicionarAluno(rl) {
  console.log("Adicionar Novo Aluno:");
  const nome = await rl.question("Nome: ");
  const idade = await rl.question("Idade: ");
  const curso = await rl.question("Curso: ");

  const novoId = alunos.length > 0 ? Math.max(...alunos.map(a => a.id)) + 1 : 1;

  const novoAluno = {
    id: novoId,
    nome,
    idade: parseInt(idade),
    curso
  };

  alunos.push(novoAluno);
  console.log("Aluno adicionado com sucesso!");
}

module.exports = {
  listarAlunos,
  adicionarAluno
};
