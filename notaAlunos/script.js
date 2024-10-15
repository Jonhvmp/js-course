const notasAluno = []; // Array para armazenar as notas
const alunosAprovados = []; // Array para armazenar as medias de alunos aprovados
const alunosReprovados = []; // Array para armazenar as medias de alunos aprovados


// Função para verificar se 60% ou mais da turma foi aprovada
function verificacaoTurma(){
    const numeroDeAlunos = Number(prompt("Quantos alunos há na turma?"));
    for (let i = 0; i < numeroDeAlunos; i++) {
        insiraNotas();
        verificacaoMedia();
    }
    if ((alunosAprovados.length > alunosReprovados.length)) {
        alert("Parabéns! A maioria da turma foi aprovada.");
    } else {
        alert("Infelizmente, a maioria da turma foi reprovada.");
    }
}

// /*notas*/
function insiraNotas(){
    let contador = 0;
     while (contador < 3) {
     const nota = Number(prompt("Insira a nota do aluno"));
     notasAluno.push(nota); // Adiciona as notas ao array
     console.log(nota)
     contador++;
    }

}

// media das notas
function verificacaoMedia(){
    let soma = 0;
    for (let i = 0; i < notasAluno.length; i++){ // soma as notas
        soma = soma +notasAluno[i];
        }
    const media = (soma)/notasAluno.length; // Calcula a média
    if (media>=7){
            console.log(`Parabéns! Você foi aprovado com média: ${media}`);
            alunosAprovados.push(media);
    } else{
        console.log(`Não foi dessa vez! Você foi reprovado com media: ${media}`);
        alunosReprovados.push(media);
        }
}

verificacaoTurma();
