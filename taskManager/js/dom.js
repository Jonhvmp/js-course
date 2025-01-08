import { Tarefa, ListaDeTarefas } from './tasks.js';

const inputTarefa = document.getElementById('tarefaInput');
const inputBusca = document.getElementById('buscaInput');
const listaTarefasDOM = document.getElementById('listaTarefas');
const mensagem = document.getElementById('mensagem');
const contadorTarefas = document.getElementById('contadorTarefas');

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

function atualizarContador(listaDeTarefas) {
  const total = listaDeTarefas.tarefas.length;
  const concluidas = listaDeTarefas.filtrarTarefas((t) => t.concluida).length;
  contadorTarefas.textContent = `Total: ${total} | Concluídas: ${concluidas}`;
}

function renderizarTarefas(listaDeTarefas, tarefasFiltradas = null) {
  const tarefasParaExibir = tarefasFiltradas || listaDeTarefas.tarefas;
  listaTarefasDOM.innerHTML = '';

  tarefasParaExibir.forEach((tarefa) => {
    const li = document.createElement('li');
    li.className = 'tarefa-item';

    const containerDescricao = document.createElement('div');
    containerDescricao.className = 'container-descricao';

    const spanDescricao = document.createElement('span');
    spanDescricao.className = 'tarefa-descricao';
    spanDescricao.textContent = tarefa.descricao;

    if (tarefa.concluida) {
      spanDescricao.classList.add('concluida');
    }

    const smallData = document.createElement('small');
    smallData.className = 'tarefa-data';
    smallData.textContent = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(tarefa.dataCriacao);

    containerDescricao.appendChild(spanDescricao);
    containerDescricao.appendChild(smallData);

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
      renderizarTarefas(listaDeTarefas);
      atualizarContador(listaDeTarefas);
    });

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

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.className = 'btn-remover';
    btnRemover.addEventListener('click', () => {
      listaDeTarefas.removerTarefa(tarefa.id);
      exibirMensagem('Tarefa removida com sucesso!', 'sucesso');
      renderizarTarefas(listaDeTarefas);
      atualizarContador(listaDeTarefas);
    });

    li.appendChild(containerDescricao);
    li.appendChild(btnConcluir);
    li.appendChild(btnEditar);
    li.appendChild(btnRemover);

    listaTarefasDOM.appendChild(li);
  });

  atualizarContador(listaDeTarefas);
}

export {
  inputTarefa,
  inputBusca,
  exibirMensagem,
  renderizarTarefas,
  atualizarContador
};
