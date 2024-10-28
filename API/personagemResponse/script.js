const button = document.getElementById("get-btn");
const div = document.getElementById("data-container");

function getData() {
    const characterId = document.getElementById("character-id").value;
    if (!characterId) {
        div.innerText = "Por favor, insira um ID válido.";
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://rickandmortyapi.com/api/character/${characterId}`);
    xhr.send();

    xhr.onload = function () {
        if (xhr.status === 200) {
            const character = JSON.parse(xhr.response);
            div.innerHTML = `
                <div class="character-info">
                    <img src="${character.image}" alt="${character.name}">
                    <h2>${character.name}</h2>
                    <p><strong>Status:</strong> ${character.status}</p>
                    <p><strong>Species:</strong> ${character.species}</p>
                    <p><strong>Gender:</strong> ${character.gender}</p>
                    <p><strong>Origin:</strong> ${character.origin.name}</p>
                    <p><strong>Location:</strong> ${character.location.name}</p>
                </div>
            `;
        } else {
            div.innerText = "Personagem não encontrado. Tente outro ID.";
        }
    };

    xhr.onerror = function () {
        div.innerText = "Erro ao buscar dados. Verifique sua conexão.";
    };
}

button.addEventListener("click", getData);
