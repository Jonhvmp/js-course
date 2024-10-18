const alunosAprovados = []; // Array para armazenar as médias de alunos aprovados
const alunosReprovados = []; // Array para armazenar as médias de alunos reprovados

// Função para verificar se 60% ou mais da turma foi aprovada
function verificacaoTurma(callback) {
    // Limpa os arrays a cada execução
    alunosAprovados.length = 0;
    alunosReprovados.length = 0;

    const numeroDeAlunos = Number(prompt("Quantos alunos há na turma?"));
    if (isNaN(numeroDeAlunos) || numeroDeAlunos <= 0) {
        alert("Por favor, insira um número válido de alunos.");
        return;
    }

    for (let i = 0; i < numeroDeAlunos; i++) {
        callback(i + 1, insiraNotas, verificarAprovacao); // Chama a função callback para verificar a média do aluno
    }

    alert(`Total de alunos aprovados: ${alunosAprovados.length}`);
    alert(`Total de alunos reprovados: ${alunosReprovados.length}`);

    // Verifica o resultado da turma
    if (alunosAprovados.length > alunosReprovados.length) {
        alert("Parabéns! A maioria da turma foi aprovada.");
    } else if (alunosReprovados.length > alunosAprovados.length) {
        alert("Infelizmente, a maioria da turma foi reprovada.");
    } else {
        alert("A turma está empatada entre aprovados e reprovados.");
    }
}

// Função para inserir as notas
function insiraNotas(alunoNumero, callback) {
    let notas = [];
    let soma = 0;
    for (let i = 0; i < 3; i++) {
        let nota = Number(prompt(`Insira a nota ${i + 1} do Aluno ${alunoNumero} (0 a 10):`));
        while (isNaN(nota) || nota < 0 || nota > 10) {
            alert("Erro: A nota deve ser um número entre 0 e 10.");
            nota = Number(prompt(`Insira uma nota válida para o Aluno ${alunoNumero} (0 a 10):`));
        }
        notas.push(nota);
        soma += nota; // Acumula a soma das notas
    }
    const media = soma / 3;
    callback(alunoNumero, media); // Chama a função callback com o número do aluno e a média calculada
}

// Função para verificar a média e aprovação de um aluno específico
function verificacaoMedia(alunoNumero, notasCallback, aprovacaoCallback) {
    notasCallback(alunoNumero, function(alunoNumero, media) {
        if (aprovacaoCallback(media)) {
            console.log(`Aluno ${alunoNumero}: Parabéns! Você foi aprovado com média: ${media}`);
            alunosAprovados.push(media);
        } else {
            console.log(`Aluno ${alunoNumero}: Não foi dessa vez! Você foi reprovado com média: ${media}`);
            alunosReprovados.push(media);
        }
    });
}

// Função para verificar se o aluno foi aprovado
function verificarAprovacao(media) {
    return media >= 7;
}

// Inicia o processo de verificação da turma
verificacaoTurma(verificacaoMedia);
