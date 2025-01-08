import { Tarefa, ListaDeTarefas } from './tasks.js';

const inputTarefa = document.getElementById('tarefaInput');
const inputBusca = document.getElementById('buscaInput');
const listaTarefasDOM = document.getElementById('listaTarefas');
const mensagem = document.getElementById('mensagem');
const contadorTarefas = document.getElementById('contadorTarefas');

/**
 * Exibe uma mensagem de sucesso ou erro.
 */
function exibirMensagem(texto, tipo = 'sucesso') {
  mensagem.textContent = texto;
  mensagem.classList.remove('mensagem-oculta', 'mensagem-sucesso', 'mensagem-erro');

  if (tipo === 'sucesso') {
    mensagem.classList.add('mensagem-sucesso');
  } else {
    mensagem.classList.add('mensagem-erro');
  }

  setTimeout(() => {
    mensagem.classList.add('mensagem-oculta');
  }, 3000);
}

/**
 * Atualiza o contador de tarefas (total e concluídas).
 */
function atualizarContador(listaDeTarefas) {
  const total = listaDeTarefas.tarefas.length;
  const concluidas = listaDeTarefas.filtrarTarefas((t) => t.concluida).length;
  contadorTarefas.textContent = `Total: ${total} | Concluídas: ${concluidas}`;
}

/**
 * Renderiza as tarefas no DOM. Recebe a lista completa e
 * opcionalmente um array de tarefas já filtradas/paginadas.
 */
function renderizarTarefas(listaDeTarefas, tarefasParaExibir = null) {
  const tarefas = tarefasParaExibir || listaDeTarefas.tarefas;
  listaTarefasDOM.innerHTML = '';

  tarefas.forEach((tarefa) => {
    const li = document.createElement('li');
    li.className = 'tarefa-item';

    const containerDescricao = document.createElement('div');
    containerDescricao.className = 'container-descricao';

    // Descrição
    const spanDescricao = document.createElement('span');
    spanDescricao.className = 'tarefa-descricao';
    spanDescricao.textContent = tarefa.descricao;

    // Se a tarefa estiver concluída, adiciona estilo de "riscar"
    if (tarefa.concluida) {
      spanDescricao.classList.add('concluida');
    }

    // Data
    const smallData = document.createElement('small');
    smallData.className = 'tarefa-data';
    smallData.textContent = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(tarefa.dataCriacao);

    containerDescricao.appendChild(spanDescricao);
    containerDescricao.appendChild(smallData);

    // Botão Concluir/Desmarcar
    const btnConcluir = document.createElement('button');
    btnConcluir.textContent = tarefa.concluida ? 'Desmarcar' : 'Concluir';
    btnConcluir.className = 'btn-concluir';
    btnConcluir.addEventListener('click', () => {
      if (!tarefa.concluida) {
        listaDeTarefas.marcarConcluida(tarefa.id);
        exibirMensagem('Tarefa concluída com sucesso!');
      } else {
        listaDeTarefas.desmarcarConcluida(tarefa.id);
        exibirMensagem('Tarefa marcada como pendente novamente!');
      }

      // Observação: se quiser manter a mesma "página" depois de concluir,
      // quem controla é o app.js. Aqui, por simplicidade, chamamos novamente:
      renderizarTarefas(listaDeTarefas);
      atualizarContador(listaDeTarefas);
    });

    // Botão Editar
    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.className = 'btn-editar';
    btnEditar.addEventListener('click', () => {
      const inputEdicao = document.createElement('input');
      inputEdicao.type = 'text';
      inputEdicao.value = tarefa.descricao;
      inputEdicao.className = 'edicao-ativa';

      const btnConfirmar = document.createElement('button');
      btnConfirmar.textContent = 'Ok';
      btnConfirmar.classList.add('btn-concluir');

      // Limpa o li e insere o campo de edição
      li.innerHTML = '';
      li.appendChild(inputEdicao);
      li.appendChild(btnConfirmar);

      btnConfirmar.addEventListener('click', () => {
        const novaDescricao = inputEdicao.value.trim();
        if (novaDescricao) {
          listaDeTarefas.atualizarTarefa(tarefa.id, novaDescricao);
          exibirMensagem('Tarefa editada com sucesso!', 'sucesso');
        }
        renderizarTarefas(listaDeTarefas);
      });
    });

    // Botão Remover
    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.className = 'btn-remover';
    btnRemover.addEventListener('click', () => {
      listaDeTarefas.removerTarefa(tarefa.id);
      exibirMensagem('Tarefa removida com sucesso!', 'sucesso');
      renderizarTarefas(listaDeTarefas);
      atualizarContador(listaDeTarefas);
    });

    // Monta a <li>
    li.appendChild(containerDescricao);
    li.appendChild(btnConcluir);
    li.appendChild(btnEditar);
    li.appendChild(btnRemover);

    // E adiciona ao <ul>
    listaTarefasDOM.appendChild(li);
  });

  // Atualiza o contador (total e concluídas)
  atualizarContador(listaDeTarefas);
}

export {
  inputTarefa,
  inputBusca,
  exibirMensagem,
  renderizarTarefas,
  atualizarContador
};
