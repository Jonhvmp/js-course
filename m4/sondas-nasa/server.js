// Importa o framework Express e os dados das sondas do arquivo de utilitários.
import express from "express";
import { Voyager, Curiosity, Perseverance, Hubble, Juno } from "./utils/sondas.js";

// Inicializa o aplicativo Express e define a porta para o servidor.
const app = express();
const port = 3000;

// Middleware para processar requisições com corpo em JSON.
app.use(express.json());

/*
  Cria uma fila (dataQueue) para armazenar temporariamente os conjuntos de dados.
  Essa fila simula a acumulação de dados até que haja pelo menos 2 conjuntos para enviar.
*/
let dataQueue = [];

/*
  Função: addDataToQueue
  -----------------------
  Adiciona os dados de uma sonda na fila e retorna uma Promise.

  Parâmetros:
    - data: Conjunto de dados da sonda a ser adicionado.

  Lógica:
    - Adiciona os dados na fila.
    - Se a fila tiver 2 ou mais conjuntos, a Promise é resolvida, retornando todos os dados e esvaziando a fila.
    - Caso contrário, a Promise é rejeitada com uma mensagem indicando que ainda falta mais dados.

  Por que usar Promise?
    - Simula uma operação assíncrona onde o envio para a NASA só ocorre quando há dados suficientes.
*/
function addDataToQueue(data) {
  return new Promise((resolve, reject) => {
    // Adiciona os dados recebidos à fila
    dataQueue.push(data);

    // Verifica se há pelo menos 2 conjuntos de dados
    if (dataQueue.length >= 2) {
      const allData = [...dataQueue]; // Copia os dados da fila
      dataQueue = []; // Reseta a fila, simulando o envio dos dados
     resolve(allData);
    } else {
      reject("Estamos esperando mais quantidades de dados para enviar juntos.");
    }
  });
}

/*
  Rota GET /probes
  -----------------
  Retorna uma lista com os metadados (informações básicas) de todas as sondas.

  Por que essa rota?
    - Permite que o cliente visualize quais sondas estão disponíveis e seus detalhes.
*/
app.get("/probes", (req, res) => {
  const probes = [Voyager, Curiosity, Perseverance, Hubble, Juno].map((p) => ({
    nome: p.nome,
    lancamento: p.lancamento,
    objetivo: p.objetivo,
    status: p.status
  }));

  res.json(probes);
});

/*
  Rota POST /send-data
  ---------------------
  Recebe o nome da sonda no corpo da requisição e processa o envio dos dados.

  Lógica:
    - Procura a sonda pelo nome informado.
    - Se a sonda não for encontrada, retorna erro 404.
    - Se encontrada, adiciona seus dados à fila usando a função addDataToQueue.
    - Se houver 2 ou mais conjuntos de dados, a Promise é resolvida e simula o envio para a NASA.
    - Se não, a Promise é rejeitada e informa que ainda se aguarda mais dados.

  Exemplo de requisição (JSON):
    {
      "probeName": "Voyager"
    }
*/
app.post("/send-data", (req, res) => {
  const { probeName } = req.body;

  // Lista de sondas disponíveis para consulta
  const probeList = [Voyager, Curiosity, Perseverance, Hubble, Juno];

  // Busca a sonda com base no nome (ignorando maiúsculas/minúsculas)
  const foundProbe = probeList.find((p) => p.nome.toLowerCase() === probeName.toLowerCase());

  // Se a sonda não for encontrada, retorna erro 404
  if (!foundProbe) {
    return res.status(404).json({ error: "Sonda não encontrada." });
  }

  // Verificar se dados dessa sonda já existem na fila
  const dataAlreadyInQueue = dataQueue.some(item =>
    JSON.stringify(item) === JSON.stringify(foundProbe.dados)
  );

  if (dataAlreadyInQueue) {
    return res.status(409).json({
      message: "Dados desta sonda já estão na fila de envio"
    });
  }

  // Tenta adicionar os dados da sonda na fila e lida com a Promise
  addDataToQueue(foundProbe.dados)
    .then((allData) => {
      // Se a Promise for resolvida, significa que temos dados suficientes para enviar
      return res.json({
        message: "Dados enviados para a NASA com sucesso!",
        dadosEnviados: allData
      });
    })
    .catch((err) => {
      // Se a Promise for rejeitada, retornamos a mensagem informando que ainda aguardamos mais dados
      return res.json({
        message: err,
        dadosAtuaisNaFila: dataQueue
      });
    });
});

// Inicializa o servidor na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
