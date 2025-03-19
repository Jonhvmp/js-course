// problema 5: classes e serialização JSON - música

class Musica {
  constructor(titulo, artista, duracao, genero, anoLancamento, album) {
    this.titulo = titulo;
    this.artista = artista;
    this.duracao = duracao; // em segundos
    this.genero = genero;
    this.anoLancamento = anoLancamento;
    this.album = album;
  }

  // m para formatar a duração em minutos:segundos
  getDuracaoFormatada() {
    const minutos = Math.floor(this.duracao / 60);
    const segundos = this.duracao % 60;
    return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
  }

  // m de instância para serializar o objeto
  paraJSON() {
    const jsonString = JSON.stringify(this);
    console.log("Música serializada para JSON:");
    console.log(jsonString);
    return jsonString;
  }

  // m estático para desserializar
  static deJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);

      // validação da estrutura
      if (!data.titulo || !data.artista || typeof data.duracao !== 'number') {
        throw new Error("JSON inválido: propriedades essenciais ausentes ou incorretas");
      }

      return new Musica(
        data.titulo,
        data.artista,
        data.duracao,
        data.genero,
        data.anoLancamento,
        data.album
      );
    } catch (erro) {
      console.error("Erro ao desserializar música:");
      console.error(`Mensagem de erro: ${erro.message}`);
      return null;
    }
  }

  // info musica
  exibirInfo() {
    console.log(`"${this.titulo}" por ${this.artista}`);
    console.log(`Álbum: ${this.album}, Ano: ${this.anoLancamento}`);
    console.log(`Duração: ${this.getDuracaoFormatada()}, Gênero: ${this.genero}`);
  }
}

// Testes
console.log("--- TESTES ---\n");

// criar música, serializar e exibir
console.log("Teste 1: Criar e serializar uma música");
const musica = new Musica("Bohemian Rhapsody", "Queen", 354, "Rock", 1975, "A Night at the Opera");
const musicaJSON = musica.paraJSON();

// desserializar um JSON válido
console.log("\nTeste 2: Desserializar um JSON válido");
const musicaRecuperada = Musica.deJSON(musicaJSON);
if (musicaRecuperada) {
  console.log("Música desserializada com sucesso:");
  musicaRecuperada.exibirInfo();
}

// desserializar um JSON com dados de tipo incorreto
console.log("\nTeste 3: Desserializar um JSON com dados inválidos");
const musicaInvalida = Musica.deJSON('{"titulo": "Yellow Submarine", "artista": "The Beatles", "duracao": "três minutos"}');
if (musicaInvalida === null) {
  console.log("Resultado verificado: retornou null");
}

// desserializar um JSON sintaticamente inválido
console.log("\nTeste 4: Desserializar um JSON sintaticamente inválido");
const musicaSintaticamenteInvalida = Musica.deJSON('{"titulo": "Imagine" "artista": "John Lennon"}');
if (musicaSintaticamenteInvalida === null) {
  console.log("Resultado verificado: retornou null");
}
