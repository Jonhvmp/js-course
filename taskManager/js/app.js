import { Tarefa, ListaDeTarefas } from './tasks.js';
import {
  inputTarefa,
  inputBusca,
  exibirMensagem,
  renderizarTarefas,
  atualizarContador
} from './dom.js';

const listaDeTarefas = new ListaDeTarefas();

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
  renderizarTarefas(listaDeTarefas);
});

const btnFiltros = document.querySelectorAll('.btnFiltro');
btnFiltros.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filtro = btn.getAttribute('data-filtro');

    if (filtro === 'todas') {
      renderizarTarefas(listaDeTarefas);
    } else if (filtro === 'pendentes') {
      const pendentes = listaDeTarefas.filtrarTarefas((t) => !t.concluida);
      renderizarTarefas(listaDeTarefas, pendentes);
    } else if (filtro === 'concluidas') {
      const concluidas = listaDeTarefas.filtrarTarefas((t) => t.concluida);
      renderizarTarefas(listaDeTarefas, concluidas);
    }
  });
});

inputBusca.addEventListener('input', () => {
  const termoBusca = inputBusca.value.toLowerCase();
  if (!termoBusca) {
    renderizarTarefas(listaDeTarefas);
    return;
  }

  const resultadoBusca = listaDeTarefas.filtrarTarefas((tarefa) => {
    return tarefa.descricao.toLowerCase().includes(termoBusca);
  });

  renderizarTarefas(listaDeTarefas, resultadoBusca);
});

renderizarTarefas(listaDeTarefas);
atualizarContador(listaDeTarefas);
