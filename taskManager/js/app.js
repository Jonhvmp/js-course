import { Tarefa, ListaDeTarefas } from './tasks.js';
import {
  inputTarefa,
  inputBusca,
  exibirMensagem,
  renderizarTarefas,
  atualizarContador
} from './dom.js';

// Instancia a classe que guarda as tarefas
const listaDeTarefas = new ListaDeTarefas();

/**
 * Configuração de paginação
 */
let tarefasPorPagina = 5; // Mostra 5 tarefas por página (ajuste como preferir)
let paginaAtual = 1;      // Começa na página 1

// Pegando referências aos elementos de paginação no HTML
const btnAnterior = document.getElementById('btnAnterior');
const btnProximo = document.getElementById('btnProximo');
const infoPaginacao = document.getElementById('infoPaginacao');

/**
 * Retorna somente as tarefas da página atual.
 */
function obterTarefasPaginadas(tarefas, pagina, limite) {
  const inicio = (pagina - 1) * limite;
  const fim = inicio + limite;
  return tarefas.slice(inicio, fim);
}

/**
 * Atualiza os botões de paginação e mostra em qual página estamos.
 */
function atualizarBotoesPaginacao(totalDeTarefas) {
  const totalPaginas = Math.ceil(totalDeTarefas / tarefasPorPagina);

  // Exibe algo como "Página 2 de 5"
  infoPaginacao.textContent = `Página ${paginaAtual} de ${totalPaginas}`;

  // Desabilita botões quando não há mais páginas
  btnAnterior.disabled = (paginaAtual === 1);
  btnProximo.disabled = (paginaAtual === totalPaginas || totalPaginas === 0);
}

/**
 * Renderiza a "página atual" das tarefas.
 * Se passarmos um array filtrado, paginamos esse array.
 */
function exibirPaginaAtual(tarefasFiltradas = null) {
  const listaCompletaOuFiltrada = tarefasFiltradas || listaDeTarefas.tarefas;
  const paginaDeTarefas = obterTarefasPaginadas(
    listaCompletaOuFiltrada,
    paginaAtual,
    tarefasPorPagina
  );

  // Renderiza somente as tarefas da página atual
  renderizarTarefas(listaDeTarefas, paginaDeTarefas);
  atualizarBotoesPaginacao(listaCompletaOuFiltrada.length);
}

// Botão "Anterior" da paginação
btnAnterior.addEventListener('click', () => {
  if (paginaAtual > 1) {
    paginaAtual--;
    exibirPaginaAtual();
  }
});

// Botão "Próximo" da paginação
btnProximo.addEventListener('click', () => {
  const total = listaDeTarefas.tarefas.length; // ou filtradas
  const totalPaginas = Math.ceil(total / tarefasPorPagina);
  if (paginaAtual < totalPaginas) {
    paginaAtual++;
    exibirPaginaAtual();
  }
});

// Adiciona tarefa
document.getElementById('btnAdicionar').addEventListener('click', () => {
  const descricao = inputTarefa.value.trim();
  if (!descricao) {
    exibirMensagem('Por favor, digite uma descrição para a tarefa.', 'erro');
    return;
  }

  const novaTarefa = new Tarefa(descricao);
  listaDeTarefas.adicionarTarefa(novaTarefa);

  inputTarefa.value = '';
  exibirMensagem('Tarefa adicionada com sucesso!', 'sucesso');

  // Exibe a última página (caso queira pular para onde a nova tarefa está):
  // paginaAtual = Math.ceil(listaDeTarefas.tarefas.length / tarefasPorPagina);
  // exibirPaginaAtual();
  //
  // Ou simplesmente reexibe a página atual:
  exibirPaginaAtual();
});

// Filtros (Todas, Pendentes, Concluídas)
const btnFiltros = document.querySelectorAll('.btnFiltro');
btnFiltros.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filtro = btn.getAttribute('data-filtro');
    let resultado = null;

    if (filtro === 'todas') {
      // exibe tudo
      resultado = null;
    } else if (filtro === 'pendentes') {
      // filtra somente as não concluídas
      resultado = listaDeTarefas.filtrarTarefas((t) => !t.concluida);
    } else if (filtro === 'concluidas') {
      // filtra somente as concluídas
      resultado = listaDeTarefas.filtrarTarefas((t) => t.concluida);
    }

    // Sempre que trocar de filtro, reseta para a página 1
    paginaAtual = 1;

    // Passamos o array filtrado para a função de paginação
    exibirPaginaAtual(resultado);
  });
});

// Busca (filtra por descrição)
inputBusca.addEventListener('input', () => {
  const termoBusca = inputBusca.value.toLowerCase();
  if (!termoBusca) {
    // Se limpou a busca, volta para todas
    paginaAtual = 1;
    exibirPaginaAtual();
    return;
  }

  const resultadoBusca = listaDeTarefas.filtrarTarefas((tarefa) => {
    return tarefa.descricao.toLowerCase().includes(termoBusca);
  });

  // Começa na primeira página do resultado
  paginaAtual = 1;
  exibirPaginaAtual(resultadoBusca);
});

// Exibe a página inicial (sem filtros) ao carregar
exibirPaginaAtual();

// Atualiza o contador de tarefas (total e concluídas)
atualizarContador(listaDeTarefas);
