
// 🎯 Contenedor principal

// Crear y agregar elementos necesarios si no existen
if (!document.getElementById("ashAlturaImg")) {
  const imgAshAltura = document.createElement("img");
  imgAshAltura.id = "ashAlturaImg";
  document.body.appendChild(imgAshAltura);
}
if (!document.getElementById("ashPesoImg")) {
  const imgAshPeso = document.createElement("img");
  imgAshPeso.id = "ashPesoImg";
  document.body.appendChild(imgAshPeso);
}
if (!document.getElementById("pokemonAlturaImg")) {
  const imgPokemonAltura = document.createElement("img");
  imgPokemonAltura.id = "pokemonAlturaImg";
  document.body.appendChild(imgPokemonAltura);
}
if (!document.getElementById("pokemonPesoImg")) {
  const imgPokemonPeso = document.createElement("img");
  imgPokemonPeso.id = "pokemonPesoImg";
  document.body.appendChild(imgPokemonPeso);
}
if (!document.getElementById("pokemonAlturaTexto")) {
  const pAlturaTexto = document.createElement("p");
  pAlturaTexto.id = "pokemonAlturaTexto";
  document.body.appendChild(pAlturaTexto);
}
if (!document.getElementById("pokemonPesoTexto")) {
  const pPesoTexto = document.createElement("p");
  pPesoTexto.id = "pokemonPesoTexto";
  document.body.appendChild(pPesoTexto);
}

// Variables de estado
let currentId = 150;
let currentMoveIndex = 0;
let currentMoves = [];
let isShiny = false;
let isFemale = false;
let isFlipped = false;

const root = document.getElementById("root");

// Selección de elementos del DOM
const ashAlturaImg = document.getElementById("ashAlturaImg");
const ashPesoImg = document.getElementById("ashPesoImg");
const pokemonAlturaImg = document.getElementById("pokemonAlturaImg");
const pokemonPesoImg = document.getElementById("pokemonPesoImg");
const pokemonAlturaTexto = document.getElementById("pokemonAlturaTexto");
const pokemonPesoTexto = document.getElementById("pokemonPesoTexto");

const toggleComparationAlturaBtn = document.getElementById("toggleComparationAlturaBtn");
const toggleComparationPesoBtn = document.getElementById("toggleComparationPesoBtn");
const comparisonAContainer = document.getElementById("comparisonAContainer");
const comparisonPContainer = document.getElementById("comparisonPContainer");

// 🎨 Manejador de imágenes
const imageHandler = {
  getImageSource(pokemon, isShiny, isFemale, isFlipped) {
    let src = "";
    if (isShiny) {
      src = isFlipped
        ? (isFemale ? pokemon.sprites.back_shiny_female : pokemon.sprites.back_shiny)
        : (isFemale ? pokemon.sprites.front_shiny_female : pokemon.sprites.front_shiny);
    } else {
      src = isFlipped
        ? (isFemale ? pokemon.sprites.back_female : pokemon.sprites.back_default)
        : (isFemale ? pokemon.sprites.front_female : pokemon.sprites.front_default);
    }
    return src || "";
  },

  update(pokemon, isShiny, isFemale, isFlipped) {
    const img = root.querySelector("#pantalla");
    if (img) {
      img.src = this.getImageSource(pokemon, isShiny, isFemale, isFlipped);
    } else {
      console.warn("Elemento #pantalla no encontrado.");
    }
  }
};

// 🧩 Obtener Pokémon
async function getPokemon(pokemon) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!res.ok) throw new Error("Pokémon no encontrado");
    const data = await res.json();
    currentMoves = data.moves;
    currentMoveIndex = 0;

    await renderPokemon(data);
    if (currentMoves.length > 0) await renderMove(currentMoves[currentMoveIndex]);

    // Después de renderizar, asignar eventos a botones
    // Botones de comparación
    document.getElementById("toggleComparationAlturaBtn")?.addEventListener("click", toggleAlturaComparison);
    document.getElementById("toggleComparationPesoBtn")?.addEventListener("click", togglePesoComparison);
  } catch (error) {
    root.innerHTML = `<p style="color:red">${error.message}</p>`;
    console.error(error);
  }
}

// 🧬 Obtener cadena evolutiva
function getEvolutionChain(chain, processed = new Set()) {
  const evoData = [];
  let current = chain;

  while (current) {
    if (processed.has(current.species.name)) break;
    processed.add(current.species.name);

    let evoCondition = "";
    const details = current.evolution_details?.[0];
    if (details) {
      if (details.base_form_id) evoCondition += ` Base Form: ${details.base_form_id.name}`;
      if (details.gender) evoCondition += ` Gender: ${details.gender.name}`;
      if (details.held_item) evoCondition += ` Held Item: ${details.held_item.name || details.held_item}`;
      if (details.item) evoCondition += ` Item: ${details.item.name || details.item}`;
      if (details.known_move) evoCondition += ` Known Move: ${details.known_move.name}`;
      if (details.known_move_type) evoCondition += ` Known Move Type: ${details.known_move_type.name}`;
      if (details.location) evoCondition += ` Location: ${details.location.name}`;
      if (details.min_affection) evoCondition += ` Min Affection: ${details.min_affection}`;
      if (details.min_beauty) evoCondition += ` Min Beauty: ${details.min_beauty}`;
      if (details.min_happiness) evoCondition += ` Min Happiness: ${details.min_happiness}`;
      if (details.min_level) evoCondition += ` Min Level: ${details.min_level}`;
      if (details.needs_overworld_rain) evoCondition += ` Needs Overworld Rain: ${details.needs_overworld_rain}`;
      if (details.party_species) evoCondition += ` Party Species: ${details.party_species.name}`;
      if (details.party_type) evoCondition += ` Party Type: ${details.party_type.name}`;
      if (details.region_id) evoCondition += ` Region: ${details.region_id.name}`;
      if (details.relative_physical_stats) evoCondition += ` Relative Physical Stats: ${details.relative_physical_stats}`;
      if (details.time_of_day) evoCondition += ` Time of Day: ${details.time_of_day}`;
      if (details.trade_species) evoCondition += ` Trade Species: ${details.trade_species.name}`;
      if (details.trigger) {
        if (details.trigger.name === "shed") {
          evoCondition += ` Un hueco en el equipo y una Poké Ball `;
        } else {
          evoCondition += ` Trigger: ${details.trigger.name}`;
        }
      }
      if (details.turn_upside_down) evoCondition += ` Turn Upside Down: ${details.turn_upside_down}`;
    }

    evoData.push({
      name: current.species.name,
      id: current.species.url.split("/").slice(-2, -1)[0],
      evolutionDetails: evoCondition || "Base"
    });

    if (current.evolves_to.length > 0)
      current.evolves_to.forEach(next => evoData.push(...getEvolutionChain(next, processed)));

    current = current.evolves_to.length ? current.evolves_to[0] : null;
  }
  return evoData;
}

// 🧱 Render Pokémon
async function renderPokemon(data) {
  const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}/`);
  const speciesData = await speciesRes.json();

  const entry = speciesData.flavor_text_entries.find(e => e.language.name === "en");
  const flavorText = entry ? entry.flavor_text.replace(/\n|\f/g, " ") : "No disponible";

  const genusEntry = speciesData.genera.find(g => g.language.name === "en");
  const genus = genusEntry ? genusEntry.genus : "No disponible";

  // Evoluciones
  let evolutionHTML = "";
  if (speciesData.evolution_chain?.url) {
    const evoRes = await fetch(speciesData.evolution_chain.url);
    const evoData = await evoRes.json();
    const chain = getEvolutionChain(evoData.chain);
    evolutionHTML = chain.map(evo => `
        <div>
          <div class="flex-center">
            <div class="evo-num">${evo.evolutionDetails || "No disponible"}</div>
          </div>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.id}.png" class="pokemon-sprite pokemon-sprite-small" />
          <div class="screen evo-name">${evo.name}</div>
        </div>
    `).join('');
  }

  // Variedades
  const varieties = speciesData.varieties.filter(v => !v.is_default);
  let varietiesHTML = "";
  if (varieties.length > 0) {
    const results = await Promise.all(varieties.map(async v => {
      const res = await fetch(v.pokemon.url);
      const pokeVar = await res.json();

      let evoText = "I";
      let spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeVar.id}.png`;

      for (const form of pokeVar.forms) {
        const formRes = await fetch(form.url);
        const formData = await formRes.json();
        if (formData.is_mega && formData.is_battle_only) {
          evoText = "mega y <br> en batalla";
          spriteUrl = formData.sprites.front_default || spriteUrl;
          break;
        } else if (formData.is_battle_only) {
          evoText = " en batalla";
          spriteUrl = formData.sprites.front_default || spriteUrl;
        }
      }

      return `
          <div>
            <div class="flex-center">
              <div class="evo-num">${evoText}</div>
            </div>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeVar.id}.png" class="pokemon-sprite pokemon-sprite-small" />
            <div class="screen evo-name">${pokeVar.name}</div>
          </div>
      `;
    }));
    varietiesHTML = results.join('');
  } else {
    console.log("No hay variedades disponibles.");
  }

  // Render principal
  root.innerHTML = `
    <div class="pokedex">
      <div class="panel left-panel">
        <div class="pokemon-name screen">${data.name.toUpperCase()} <span>no. ${data.id}</span></div>
        <div>
          <img id="pantalla" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png" alt="${data.name}" class="pokemon-sprite" />
          <div class="sprite-controls">
            <div id="latestBtn">🔊</div>
            <div id="legacyBtn">🎵</div>
            <div id="toggleShinyBtn">💎 Shiny</div>
            <div id="toggleGenderBtn">♀️ Gender</div>
            <div id="toggleFlipBtn">🔄 Flip</div>
          </div>
        </div>
        <div class="pokemon-description screen" id="flavorTextContainer">${flavorText}</div>
        <div class="pokemon-description2 screen" id="genusTextContainer">${genus}</div>

        <!-- Contenedor de Comparación -->
        <div class="pokemon-description screen" id="comparisonAContainer" style="display: none;">
          <div id="alturaContainer" class="comparacion">
            <div>
              <img id="ashAlturaImg" src="https://images.wikidexcdn.net/mwuploads/wikidex/e/eb/latest/20220628064212/Ash_Masters.png" alt="Ash" title="Ash" height="169" />
              <p>Ash: 1.69 m</p>
            </div>
            <div>
              <img id="pokemonAlturaImg" src="" alt="Pokémon" />
              <p id="pokemonAlturaTexto"></p>
            </div>
          </div>
        </div>
        <div class="pokemon-description screen" id="comparisonPContainer" style="display: none;">
          <div id="pesoContainer" class="comparacion">
            <div>
              <img id="ashPesoImg" src="https://images.wikidexcdn.net/mwuploads/wikidex/e/eb/latest/20220628064212/Ash_Masters.png" alt="Ash" title="Ash" />
              <p>Ash: 40.0 kg</p>
            </div>
            <div>
              <img id="pokemonPesoImg" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png" alt="Pokémon" />
              <p id="pokemonPesoTexto"></p>
            </div>
          </div>
        </div>
        <!-- Fin comparación -->
      </div>
      <div class="divider">
        <div class="gap"></div>
        <div class="hinge"></div>
        <div class="gap"></div>
        <div class="hinge"></div>
        <div class="gap"></div>
        <div class="hinge"></div>
        <div class="gap"></div>
      </div>
      <div class="panel right-panel">
        <div class="panel-row">
          <div class="screen stats">
            <div class="stat-line">
              ${data.stats.map(s => `${s.stat.name}...${s.base_stat}`).join("<br>")}
            </div>
          </div>
          <div class="type-list">
            <div class="panel-header">Types</div>
            <div class="type-box">
              <div class="types">
                ${data.types.map(t => `<div class="type ${t.type.name}">${t.type.name}</div>`).join("")}
              </div>
            </div>
          </div>
        </div>
        <div class="panel-row panel-evo" id="evolutionContainer">
          ${evolutionHTML}
        </div>
        <div class="panel-row panel-evo" id="varietiesContainer" style="display:none;">
          ${varietiesHTML}
        </div>
        <div class="panel-row blue-buttons">
          <div class="blue-button" id="toggleVarietiesBtn"><span>Mostrar Variedades</span></div>
          <div class="blue-button" id="toggleComparationAlturaBtn"><span>Comparacion Altura</span></div>
          <div class="blue-button" id="toggleComparationPesoBtn"><span>Comparacion Peso</span></div>
        </div>
        <div id="moveContainer"></div>
        <div class="panel-row controls">
          <div id="prevBtn" class="button"><!--⬅️--></div>
          <div><input type="number" id="search" class="screen num-input" placeholder="1" />
            <div id="searchBtn" class="submit"><!--🔍--></div>
          </div>
          <div id="nextBtn" class="button"><!--➡️--></div>
        </div>
      </div>
    </div>
  `;

  // Asignar eventos a botones de navegación
  document.getElementById("searchBtn").addEventListener("click", () => {
    const searchValue = document.getElementById("search").value.toLowerCase().trim();
    if (searchValue) getPokemon(searchValue);
  });
  document.getElementById("nextBtn").addEventListener("click", () => {
    currentId++;
    getPokemon(currentId);
  });
  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentId > 1) {
      currentId--;
      getPokemon(currentId);
    }
  });

  // Función toggle para comparación altura
  function toggleAlturaComparison() {
    const containerA = document.getElementById("comparisonAContainer");
    const containerP = document.getElementById("comparisonPContainer");
    const flavorText = document.getElementById("flavorTextContainer");
    const genusText = document.getElementById("genusTextContainer");
    const btn = document.getElementById("toggleComparationAlturaBtn");
    if (containerA.style.display === "none" || containerA.style.display === "") {
      containerA.style.display = "block";
      btn.textContent = "Ocultar Altura";
      containerP.style.display = "none";
      flavorText.style.display = "none";
      genusText.style.display = "none";
    } else {
      containerA.style.display = "none";
      btn.textContent = "Comparar Altura";
      flavorText.style.display = "block";
      genusText.style.display = "block";
    }
  }

  // Función toggle para comparación peso
  function togglePesoComparison() {
    const containerP = document.getElementById("comparisonPContainer");
    const containerA = document.getElementById("comparisonAContainer");
    const flavorText = document.getElementById("flavorTextContainer");
    const genusText = document.getElementById("genusTextContainer");
    const btn = document.getElementById("toggleComparationPesoBtn");
    if (containerP.style.display === "none" || containerP.style.display === "") {
      containerP.style.display = "block";
      btn.textContent = "Ocultar Peso";
      containerA.style.display = "none";
      flavorText.style.display = "none";
      genusText.style.display = "none";
    } else {
      containerP.style.display = "none";
      btn.textContent = "Comparar Peso";
      flavorText.style.display = "block";
      genusText.style.display = "block";
    }
  }
}

// 🎯 Render movimiento
async function renderMove(moveData) {
  const container = root.querySelector("#moveContainer");
  if (!container) return;
  container.innerHTML = "Cargando movimiento...";

  const moveRes = await fetch(moveData.move.url);
  const moveDetails = await moveRes.json();

  const methodUrl = moveData.version_group_details[0]?.move_learn_method.url;
  let methodDesc = "No disponible";
  if (methodUrl) {
    const methodRes = await fetch(methodUrl);
    const methodData = await methodRes.json();
    const entry = methodData.descriptions.find(d => d.language.name === "en");
    if (entry) methodDesc = entry.description;
  }

  const versionGroups = moveData.version_group_details.map(v => v.version_group.name).join(", ");

  const machinesHTML = moveDetails.machines.length
    ? await Promise.all(moveDetails.machines.map(async m => {
        const machineRes = await fetch(m.machine.url);
        const machineData = await machineRes.json();
        return `${machineData.item.name} (${m.version_group.name})`;
      }))
    : ["No disponible"];

  root.querySelector("#moveContainer").innerHTML = `
<div class="move-list">
  <div class="move-body move-screen screen">
    <div class="move-left">
      <div class="move-name">${moveData.move.name.toUpperCase()}</div>
      <div class="move-stat">Accuracy.....${moveDetails.accuracy}</div>
      <div class="move-stat">Power.........${moveDetails.power}</div>
      <div class="move-stat">PP............${moveDetails.pp}</div>
    </div>
    <div class="move-right">
      <div class="move-type">Type: ${moveDetails.type.name}</div>
      <div class="move-learn">Learn: Lvl ${moveData.version_group_details[0]?.level_learned_at || 0}</div>
      <div class="move-learn">Método: ${moveData.version_group_details[0]?.move_learn_method.name || "Desconocido"}</div>
      <div class="move-learn">Prioridad: ${moveDetails.priority}</div>
      <div class="move-learn">Generación: ${moveDetails.generation.name}</div>
    </div>
  </div>
  <div class="move-controls">
    <div id="prevMoveBtn" class="move-arrow"><i class="fas fa-caret-up"></i></div>
    <div id="nextMoveBtn" class="move-arrow"><i class="fas fa-caret-down"></i></div>
  </div>
</div>
`;

  // Asignar eventos a botones de movimiento
  root.querySelector("#prevMoveBtn")?.addEventListener("click", () => {
    currentMoveIndex = (currentMoveIndex - 1 + currentMoves.length) % currentMoves.length;
    renderMove(currentMoves[currentMoveIndex]);
  });
  root.querySelector("#nextMoveBtn")?.addEventListener("click", () => {
    currentMoveIndex = (currentMoveIndex + 1) % currentMoves.length;
    renderMove(currentMoves[currentMoveIndex]);
  });
}

// Cargar primer Pokémon
getPokemon(currentId);

