// classe Tarefa
export class Tarefa {
  constructor(descricao) {
    this.id = Date.now(); // ID único baseado no timestamp
    this.descricao = descricao;
    this.concluida = false;
    this.dataCriacao = new Date();
  }

  marcarConcluida() {
    this.concluida = true;
  }

  desmarcarConcluida() {
    this.concluida = false;
  }

  atualizarDescricao(novaDescricao) {
    this.descricao = novaDescricao;
  }

  toString() {
    const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(this.dataCriacao);
    return `Tarefa: ${this.descricao} (Criada em: ${dataFormatada})`;
  }
}

// classe ListaDeTarefas
export class ListaDeTarefas {
  constructor() {
    this.tarefas = [];
    this.carregarDoLocalStorage();
  }

  adicionarTarefa(tarefa) {
    this.tarefas.push(tarefa);
    this.salvarNoLocalStorage();
  }

  removerTarefa(id) {
    this.tarefas = this.tarefas.filter((t) => t.id !== id);
    this.salvarNoLocalStorage();
  }

  atualizarTarefa(id, novaDescricao) {
    const tarefa = this.buscarPorId(id);
    if (tarefa) {
      tarefa.atualizarDescricao(novaDescricao);
      this.salvarNoLocalStorage();
    }
  }

  marcarConcluida(id) {
    const tarefa = this.buscarPorId(id);
    if (tarefa) {
      tarefa.marcarConcluida();
      this.salvarNoLocalStorage();
    }
  }

  desmarcarConcluida(id) {
    const tarefa = this.buscarPorId(id);
    if (tarefa) {
      tarefa.desmarcarConcluida();
      this.salvarNoLocalStorage();
    }
  }

  filtrarTarefas(callback) {
    return this.tarefas.filter(callback);
  }

  buscarPorId(id) {
    return this.tarefas.find((t) => t.id === id);
  }

  salvarNoLocalStorage() {
    localStorage.setItem('listaTarefas', JSON.stringify(this.tarefas));
  }

  carregarDoLocalStorage() {
    const data = localStorage.getItem('listaTarefas');
    if (data) {
      const tarefasParse = JSON.parse(data);
      this.tarefas = tarefasParse.map((obj) => {
        const t = new Tarefa(obj.descricao);
        t.id = obj.id;
        t.concluida = obj.concluida;
        t.dataCriacao = new Date(obj.dataCriacao);
        return t;
      });
    }
  }
}
