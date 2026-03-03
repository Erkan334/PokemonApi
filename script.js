const userInput = document.getElementById("userInput");
const button = document.querySelector("#button");
const cardContainer = document.querySelector(".card-container");




function getPokemon() {
    const pokemonName = userInput.value.toLowerCase().trim();

    if (!pokemonName) return alert("Skriv in ett namn!");

    // 1. Starta hämtningen
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            // 2. Kolla om svaret är OK (t.ex. status 200)
            if (!response.ok) {
                throw new Error("Kunde inte hitta Pokémon");
            }
            // 3. Omvandla svaret till JSON och skicka vidare till nästa .then()
            return response.json();
        })
        .then(data => {
            // 4. Här har vi datan! Nu kör vi render-funktionen
            renderCard(data);
        })
        .catch(error => {
            // 5. Hit hamnar vi om något gick fel (nätverksfel eller 404)
            cardContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
}

// DENNA FUNKTION SAKNADES:
function renderCard(data) {
    // Koppla ihop JS-variabler med dina existerande HTML-element via deras ID
    const nameEl = document.getElementById("name");
    const imgEl = document.getElementById("card-image");
    const typeEl = document.getElementById("type");
    const weightEl = document.getElementById("weight");
    const heightEl = document.getElementById("height");

    // Uppdatera innehållet i elementen med data från API:et
    nameEl.textContent = data.name.toUpperCase();
    imgEl.src = data.sprites.front_default;
    imgEl.alt = data.name;

    // Mappa ut typerna (eftersom det kan vara flera)
    typeEl.textContent = data.types.map(t => t.type.name).join(", ");

    // Vikten i API:et är i hektogram, så vi delar med 10 för att få kg
    weightEl.textContent = data.weight / 10;
}

button.addEventListener("click", getPokemon);


