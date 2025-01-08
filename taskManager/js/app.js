import { Tarefa, ListaDeTarefas } from './tasks.js';
import {
  inputTarefa,
  inputName,
  exibirMensagem,
  renderizarTarefas,
  atualizarContador
} from './dom.js';

const listaDeTarefas = new ListaDeTarefas();

let tarefasPorPagina = 5;
let paginaAtual = 1;

// Pegando referências aos elementos de paginação no HTML
const btnAnterior = document.getElementById('btnAnterior');
const btnProximo = document.getElementById('btnProximo');
const infoPaginacao = document.getElementById('infoPaginacao');

function obterTarefasPaginadas(tarefas, pagina, limite) {
  const inicio = (pagina - 1) * limite;
  const fim = inicio + limite;
  return tarefas.slice(inicio, fim);
}

function atualizarBotoesPaginacao(totalDeTarefas) {
  const totalPaginas = Math.ceil(totalDeTarefas / tarefasPorPagina);

  infoPaginacao.textContent = `Página ${paginaAtual} de ${totalPaginas}`;

  btnAnterior.disabled = (paginaAtual === 1);
  btnProximo.disabled = (paginaAtual === totalPaginas || totalPaginas === 0);
}

function exibirPaginaAtual(tarefasFiltradas = null) {
  const listaCompletaOuFiltrada = tarefasFiltradas || listaDeTarefas.tarefas;
  const paginaDeTarefas = obterTarefasPaginadas(
    listaCompletaOuFiltrada,
    paginaAtual,
    tarefasPorPagina
  );

  renderizarTarefas(listaDeTarefas, paginaDeTarefas);
  atualizarBotoesPaginacao(listaCompletaOuFiltrada.length);
}

btnAnterior.addEventListener('click', () => {
  if (paginaAtual > 1) {
    paginaAtual--;
    exibirPaginaAtual();
  }
});

btnProximo.addEventListener('click', () => {
  const total = listaDeTarefas.tarefas.length; // ou filtradas
  const totalPaginas = Math.ceil(total / tarefasPorPagina);
  if (paginaAtual < totalPaginas) {
    paginaAtual++;
    exibirPaginaAtual();
  }
});

document.getElementById('btnAdicionar').addEventListener('click', () => {
  const descricao = inputTarefa.value.trim();
  if (!descricao) {
    exibirMensagem('Por favor, digite uma descrição para a tarefa.', 'erro');
    return;
  }

  const novaTarefa = new Tarefa(descricao);
  listaDeTarefas.adicionarTarefa(novaTarefa);

  inputTarefa.value = '';
  inputName.value = '';
  exibirMensagem('Tarefa adicionada com sucesso!', 'sucesso');

  exibirPaginaAtual();
});

const btnFiltros = document.querySelectorAll('.btnFiltro');
btnFiltros.forEach((btn) => {
  btn.addEventListener('click', () => {
    btnFiltros.forEach((b) => b.classList.remove('ativo'));

    btn.classList.add('ativo');

    const filtro = btn.getAttribute('data-filtro');
    let resultado = null;

    if (filtro === 'todas') {
      resultado = null;
    } else if (filtro === 'pendentes') {
      resultado = listaDeTarefas.filtrarTarefas((t) => !t.concluida);
    } else if (filtro === 'concluidas') {
      resultado = listaDeTarefas.filtrarTarefas((t) => t.concluida);
    }

    paginaAtual = 1;

    exibirPaginaAtual(resultado);
  });
});

inputName.addEventListener('input', () => {
  const termoBusca = inputName.value.toLowerCase();
  if (!termoBusca) {
    paginaAtual = 1;
    exibirPaginaAtual();
    return;
  }

  const resultadoBusca = listaDeTarefas.filtrarTarefas((tarefa) => {
    return tarefa.descricao.toLowerCase().includes(termoBusca);
  });

  paginaAtual = 1;
  exibirPaginaAtual(resultadoBusca);
});

exibirPaginaAtual();

atualizarContador(listaDeTarefas);
