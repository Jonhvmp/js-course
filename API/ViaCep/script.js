document.getElementById("cepForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const cep = document.getElementById("cep").value.replace(/\D/g, '');
  console.log(cep)

  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json`)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          displayCepInfo(data);
        } else {
          document.getElementById("cepDetails").innerHTML = `<p>CEP não encontrado. Verifique e tente novamente.</p>`;
        }
      })
      .catch(error => {
        document.getElementById("cepDetails").innerHTML = `<p>Ocorreu um erro ao buscar o CEP.</p>`;
        console.error("Erro:", error);
      });
  } else {
    document.getElementById("cepDetails").innerHTML = `<p>CEP inválido. Digite um CEP com 8 dígitos.</p>`;
  }
});

function displayCepInfo(data) {
  const cepInfo = `
    <h2>Endereço Encontrado:</h2>
    <p><strong>CEP:</strong>${data.cep}</p>
    <p><strong>Logradouro:</strong>${data.logradouro}</p>
    <p><strong>Bairro:</strong>${data.bairro}</p>
    <p><strong>Cidade:</strong>${data.localidade}</p>
    <p><strong>Estado:</strong>${data.uf}</p>
    <p><strong>DDD:</strong>${data.ddd}</p>
  `;
  document.getElementById("cepDetails").innerHTML = cepInfo;
  console.log(data)
};
