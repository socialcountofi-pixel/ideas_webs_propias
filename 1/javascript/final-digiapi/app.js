const pokemonForm = document.getElementById("pokemon-form");
const pokemonInput = document.getElementById("pokemon-input");
const pokemonInfo = document.getElementById("pokemon-info");
const pokemonList = document.getElementById("pokemon-list");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let offset = 0;
const limit = 10;
let totalCount = 0;

// Función para obtener y mostrar información de un Pokémon específico
const fetchPokemon = async (pokemonInput) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`
    );
    if (!response.ok) {
      throw new Error("Pokémon no encontrado");
    }
    const data = await response.json();

    pokemonInfo.innerHTML = `
      <h2>${data.name.toUpperCase()}</h2>
      <img src="${data.sprites.front_default}" alt="${data.name}">
      <p><strong>Tipos:</strong> ${data.types
        .map((type) => type.type.name)
        .join(", ")}</p>
      <p><strong>Habilidades:</strong> ${data.abilities
        .map((ability) => ability.ability.name)
        .join(", ")}</p>
      <p><strong>Estadísticas:</strong></p>
      <ul>
        ${data.stats
          .map((stat) => `<li>${stat.stat.name}: ${stat.base_stat}</li>`)
          .join("")}
      </ul>
    `;
  } catch (error) {
    pokemonInfo.innerHTML = `<p>${error.message}</p>`;
  }
};

// Función para obtener y mostrar una lista de Pokémon
const fetchPokemons = async () => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) {
      throw new Error("No se pudieron obtener los Pokémon");
    }
    const data = await response.json();
    totalCount = data.count;
    pokemonList.innerHTML = "";

    for (const pokemon of data.results) {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();

      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" />
        ${pokemonData.name}
      `;
      listItem.addEventListener("click", () => fetchPokemon(pokemon.name));
      pokemonList.appendChild(listItem);
    }

    prevButton.disabled = offset === 0;
    nextButton.disabled = offset + limit >= totalCount;
  } catch (error) {
    pokemonList.innerHTML = `<p>${error.message}</p>`;
  }
};

// Manejadores de eventos para los botones de paginación
prevButton.addEventListener("click", () => {
  if (offset - limit >= 0) {
    offset -= limit;
    fetchPokemons();
  }
});

nextButton.addEventListener("click", () => {
  if (offset + limit < totalCount) {
    offset += limit;
    fetchPokemons();
  }
});

// Manejador de evento para el formulario de búsqueda
pokemonForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const pokemonInputValue = pokemonInput.value.toLowerCase();
  fetchPokemon(pokemonInputValue);
});

// Cargar Pokémon inicial
fetchPokemons();
