document.getElementById("cepForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const cep = document.getElementById("cep").value;
    if (!cep) {
        document.getElementById("cepDetails").innerText = "Por favor, insira um CEP válido.";
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://viacep.com.br/ws/${cep}/json/`);
    xhr.send();

    xhr.onload = function () {
        if (xhr.status === 200) {
            const address = JSON.parse(xhr.response);
            document.getElementById("cepDetails").innerHTML = `
                <article class="address-info">
                    <h2>Endereço</h2>
                    <p><strong>CEP:</strong> ${address.cep}</p>
                    <p><strong>Logradouro:</strong> ${address.logradouro}</p>
                    <p><strong>Complemento:</strong> ${address.complemento}</p>
                    <p><strong>Bairro:</strong> ${address.bairro}</p>
                    <p><strong>Cidade:</strong> ${address.localidade}</p>
                    <p><strong>Estado:</strong> ${address.uf}</p>
                    <p><strong>IBGE:</strong> ${address.ibge}</p>
                    <p><strong>GIA:</strong> ${address.gia}</p>
                    <p><strong>DDD:</strong> ${address.ddd}</p>
                    <p><strong>Siafi:</strong> ${address.siafi}</p>
                </article>
            `;
        } else {
            document.getElementById("cepDetails").innerText = "CEP não encontrado. Tente outro CEP.";
        }
    };

    xhr.onerror = function () {
        document.getElementById("cepDetails").innerText = "Erro ao buscar dados. Verifique sua conexão.";
    };
} );
