const button = document.getElementById("get-btn");
const div = document.getElementById("data-container");

document.onkeydown = function(event) {
    if (event.key === 'Enter') button.click();
};
// permite que o usuário pressione Enter para enviar o formulário

function getData() {
    const characterId = document.getElementById("character-id").value;
    if (!characterId) {
        div.innerText = "Por favor, insira um ID válido.";
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://rickandmortyapi.com/api/character/${characterId}`);
    xhr.send();

    xhr.onload = function () { // xhr.onload é chamado quando a requisição é completada
        if (xhr.status === 200) {
            const character = JSON.parse(xhr.response);
            div.innerHTML = `
                <article class="character-info">
                    <div class="character-info__image">
                    <img src="${character.image}" alt="${character.name}">
                    </div>
                    <div class="character-info__details">
                    <h2>${character.name}</h2>
                    <p><strong>Status:</strong> ${character.status}</p>
                    <p><strong>Species:</strong> ${character.species}</p>
                    <p><strong>Gender:</strong> ${character.gender}</p>
                    <p><strong>Origin:</strong> ${character.origin.name}</p>
                    <p><strong>Location:</strong> ${character.location.name}</p>
                </div>
                </article>
            `;
        } else {
            div.innerText = "Personagem não encontrado. Tente outro ID.";
        }
    };

    xhr.onerror = function () { // quando ocorre erro na requisição
        div.innerText = "Erro ao buscar dados. Verifique sua conexão.";
    };
}

button.addEventListener("click", getData);
