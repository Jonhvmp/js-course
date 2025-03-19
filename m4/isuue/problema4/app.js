// problema 4: classes e serialização JSON - futebol

class JogadorFutebol {
  constructor(nome, idade, posicao, numeroCamisa, golsMarcados, time) {
    this.nome = nome;
    this.idade = idade;
    this.posicao = posicao;
    this.numeroCamisa = numeroCamisa;
    this.golsMarcados = golsMarcados;
    this.time = time;
  }

  // m de instância para serializar o objeto
  paraJSON() {
    const jsonString = JSON.stringify(this);
    console.log("Jogador serializado para JSON:");
    console.log(jsonString);
    return jsonString;
  }

  // m estático para desserializar
  static deJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);

      // v básica da estrutura
      if (!data.nome || !data.posicao || !data.numeroCamisa) {
        throw new Error("JSON inválido: propriedades essenciais de jogador ausentes");
      }

      return new JogadorFutebol(
        data.nome,
        data.idade,
        data.posicao,
        data.numeroCamisa,
        data.golsMarcados,
        data.time
      );
    } catch (erro) {
      console.error("Erro ao desserializar o jogador:");
      console.error(`Mensagem de erro: ${erro.message}`);
      return null;
    }
  }

  // m para exibir informações sobre o jogador
  exibirInfo() {
    console.log(`Jogador: ${this.nome}, ${this.idade} anos`);
    console.log(`Posição: ${this.posicao}, Camisa: ${this.numeroCamisa}`);
    console.log(`Time: ${this.time}, Gols: ${this.golsMarcados}`);
  }
}

// Testes
console.log("--- TESTES ---\n");

// criar jogador, serializar e exibir
console.log("Teste 1: Criar e serializar um jogador");
const jogador = new JogadorFutebol("Neymar Jr", 31, "Atacante", 10, 400, "Santos FC");
const jogadorJSON = jogador.paraJSON();

// desserializar um JSON válido
console.log("\nTeste 2: Desserializar um JSON válido");
const jogadorRecuperado = JogadorFutebol.deJSON(jogadorJSON);
if (jogadorRecuperado) {
  console.log("Jogador desserializado com sucesso:");
  jogadorRecuperado.exibirInfo();
}

// desserializar um JSON inválido
console.log("\nTeste 3: Desserializar um JSON inválido");
const jogadorInvalido = JogadorFutebol.deJSON('{"nome": "Ronaldo", "idade": "quarenta e cinco"}');
if (jogadorInvalido === null) {
  console.log("Resultado verificado: retornou null");
}

// desserializar um JSON sintaticamente inválido
console.log("\nTeste 4: Desserializar um JSON sintaticamente inválido");
const jogadorSintaticamenteInvalido = JogadorFutebol.deJSON('{"nome": "Messi" "time": "Inter Miami"}');
if (jogadorSintaticamenteInvalido === null) {
  console.log("Resultado verificado: retornou null");
}
