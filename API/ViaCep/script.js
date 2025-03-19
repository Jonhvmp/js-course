document.getElementById("cepForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const cep = document.getElementById("cep").value.replace(/\D/g, '');
  const cepDetails = document.getElementById("cepDetails");

  // Mostrar loading
  cepDetails.innerHTML = `
    <div class="loading">
      <div class="loading-spinner"></div>
      <p>Buscando informações...</p>
    </div>
  `;

  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        return response.json();
      })
      .then(data => {
        if (!data.erro) {
          displayCepInfo(data);
        } else {
          cepDetails.innerHTML = `
            <div class="error-message">
              <p>CEP não encontrado. Verifique e tente novamente.</p>
            </div>
          `;
        }
      })
      .catch(error => {
        cepDetails.innerHTML = `
          <div class="error-message">
            <p>Ocorreu um erro ao buscar o CEP. Tente novamente mais tarde.</p>
          </div>
        `;
        console.error("Erro:", error);
      });
  } else {
    cepDetails.innerHTML = `
      <div class="error-message">
        <p>CEP inválido. Digite um CEP com 8 dígitos.</p>
      </div>
    `;
  }
});

function displayCepInfo(data) {
  const cepInfo = `
    <div class="address-info">
      <h2>Endereço Encontrado</h2>
      <p><strong>CEP:</strong> ${data.cep}</p>
      <p><strong>Logradouro:</strong> ${data.logradouro || 'Não informado'}</p>
      <p><strong>Bairro:</strong> ${data.bairro || 'Não informado'}</p>
      <p><strong>Cidade:</strong> ${data.localidade}</p>
      <p><strong>Estado:</strong> ${data.uf}</p>
      <p><strong>DDD:</strong> ${data.ddd}</p>
    </div>
  `;
  document.getElementById("cepDetails").innerHTML = cepInfo;
};
