document.getElementById("searchBtn").addEventListener("click", getPokemon);

async function getPokemon() {
  const nameInput = document.getElementById("pokemonName").value.toLowerCase();
  const card = document.getElementById("pokemonCard");

  if (!nameInput) {
    alert("Por favor, ingresa un nombre o número de Pokémon");
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameInput}`);
    if (!response.ok) throw new Error("Pokémon no encontrado");

    const data = await response.json();
    showPokemon(data);
  } catch (error) {
    card.style.display = "block";
    card.innerHTML = `<p>${error.message}</p>`;
  }
}

function showPokemon(pokemon) {
  const card = document.getElementById("pokemonCard");
  card.style.display = "block";
  const types = pokemon.types.map(t => t.type.name).join(", ");

  card.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <h2>${pokemon.name.toUpperCase()}</h2>
    <p><strong>Tipo:</strong> ${types}</p>
    <p><strong>ID:</strong> ${pokemon.id}</p>
  `;
}