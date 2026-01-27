/*******************************************
 * BLOQUE 1 – Variables globales y estado
 *******************************************/
let currentId = 150; // Pokémon inicial (Mewtwo)
let currentPokemonData = null; // Datos del Pokémon cargado
let isShiny = false; // Controla si se muestra el sprite shiny

// Referencias a elementos del DOM
const spriteMain = document.getElementById("spriteMain");
const nameEl = document.getElementById("nameEl");
const heightEl = document.getElementById("heightEl");
const weightEl = document.getElementById("weightEl");
const statsEl = document.getElementById("statsEl");
const movesSection = document.getElementById("movesSection");
const varietiesSection = document.getElementById("varietiesSection");
const evolutionsSection = document.getElementById("evolutionsSection");

// Botones
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shinyBtn = document.getElementById("shinyBtn");
const varietiesBtn = document.getElementById("varietiesBtn");
const evolutionsBtn = document.getElementById("evolutionsBtn");
const searchBtn = document.getElementById("searchBtn");


/*******************************************
 * BLOQUE 2 – Función para cargar Pokémon
 *******************************************/
async function loadPokemon(idOrName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
    const data = await response.json();
    currentPokemonData = data; // Guardamos los datos globalmente
    currentId = data.id;       // Actualizamos el ID global
    
    // Actualiza la visualización principal
    updateMainDisplay(); // Bloque 3
    updateStats();       // Bloque 4
    loadVarieties();     // Bloque 5
    loadEvolutions();    // Bloque 5
    loadMoves();         // Bloque 5
  } catch (error) {
    console.error("Error cargando Pokémon:", error);
    alert("No se pudo cargar el Pokémon. Revisa el nombre o ID.");
  }
}


/*******************************************
 * BLOQUE 3 – Actualización de sprites y animaciones
 *******************************************/
function updateMainDisplay() {
  if (!currentPokemonData) return;

  // Elige el sprite normal o shiny
  const spriteUrl = isShiny
    ? currentPokemonData.sprites.front_shiny
    : currentPokemonData.sprites.front_default;

  spriteMain.src = spriteUrl;         // Actualiza la imagen
  nameEl.textContent = currentPokemonData.name; // Actualiza nombre

  // Animación simple: fade-in
  spriteMain.classList.remove("fade-in");
  void spriteMain.offsetWidth; // reinicia animación
  spriteMain.classList.add("fade-in");
}


/*******************************************
 * BLOQUE 4 – Estadísticas, altura y peso
 *******************************************/
function updateStats() {
  if (!currentPokemonData) return;

  heightEl.textContent = `Altura: ${currentPokemonData.height}`;
  weightEl.textContent = `Peso: ${currentPokemonData.weight}`;

  // Limpia stats anteriores
  statsEl.innerHTML = "";

  // Lista todas las estadísticas base
  currentPokemonData.stats.forEach(stat => {
    const p = document.createElement("p");
    p.textContent = `${stat.stat.name}: ${stat.base_stat}`;
    statsEl.appendChild(p);
  });
}


/*******************************************
 * BLOQUE 5 – Variedades, evoluciones y movimientos
 *******************************************/
async function loadVarieties() {
  varietiesSection.innerHTML = ""; // Limpiar botones

  try {
    const speciesRes = await fetch(currentPokemonData.species.url);
    const speciesData = await speciesRes.json();

    speciesData.varieties.forEach(variety => {
      const btn = document.createElement("button");
      btn.textContent = variety.pokemon.name;
      btn.onclick = () => loadPokemon(variety.pokemon.name);
      varietiesSection.appendChild(btn);
    });
  } catch (error) {
    console.error("Error cargando variedades:", error);
  }
}

async function loadEvolutions() {
  evolutionsSection.innerHTML = ""; // Limpiar botones

  try {
    const speciesRes = await fetch(currentPokemonData.species.url);
    const speciesData = await speciesRes.json();

    const evoRes = await fetch(speciesData.evolution_chain.url);
    const evoData = await evoRes.json();

    // Función recursiva para obtener todos los nombres de la cadena de evolución
    function getEvoNames(chain) {
      const names = [chain.species.name];
      if (chain.evolves_to.length) {
        chain.evolves_to.forEach(subChain => {
          names.push(...getEvoNames(subChain));
        });
      }
      return names;
    }

    const evoNames = getEvoNames(evoData.chain);
    evoNames.forEach(name => {
      const btn = document.createElement("button");
      btn.textContent = name;
      btn.onclick = () => loadPokemon(name);
      evolutionsSection.appendChild(btn);
    });
  } catch (error) {
    console.error("Error cargando evoluciones:", error);
  }
}

function loadMoves() {
  movesSection.innerHTML = ""; // Limpiar movimientos
  currentPokemonData.moves.forEach(move => {
    const p = document.createElement("p");
    p.textContent = move.move.name;
    movesSection.appendChild(p);
  });
}


/*******************************************
 * EVENTOS – Botones principales
 *******************************************/
prevBtn.onclick = () => loadPokemon(currentId - 1);
nextBtn.onclick = () => loadPokemon(currentId + 1);
shinyBtn.onclick = () => {
  isShiny = !isShiny;
  updateMainDisplay();
};
searchBtn.onclick = () => {
  const nameOrId = prompt("Ingresa nombre o ID del Pokémon:");
  if (nameOrId) loadPokemon(nameOrId.toLowerCase());
};

/*******************************************
 * CARGA INICIAL
 *******************************************/
loadPokemon(currentId);