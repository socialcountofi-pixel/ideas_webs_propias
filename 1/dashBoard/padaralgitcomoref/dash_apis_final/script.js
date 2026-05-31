// =========================
// URLs base
// =========================
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const GEN_URL = "https://pokeapi.co/api/v2/generation/";
const TYPE_URL = "https://pokeapi.co/api/v2/type/";
const ABILITY_URL = "https://pokeapi.co/api/v2/ability/";
const POKEDEX_URL = "https://pokeapi.co/api/v2/pokedex/";
const GRUPOHUEVO_URL = "https://pokeapi.co/api/v2/egg-group/";
const GENERO_URL = "https://pokeapi.co/api/v2/gender/";
const MOVE_URL = "https://pokeapi.co/api/v2/move/";
const POKECOLOR_URL = "https://pokeapi.co/api/v2/pokemon-color/";

//datos del pokemon especifico 'pokemon-species'  POKEMON-FORM stat ;
const endpoint = 'ability';
const urls = `https://pokeapi.co/api/v2/${endpoint}/`;
const urld = urls + 1;
console.log(urls);
console.log(urld);
/*ejemplo*/

/*
  "berry": "https://pokeapi.co/api/v2/berry/",
  "berry-firmness": "https://pokeapi.co/api/v2/berry-firmness/",
  "berry-flavor": "https://pokeapi.co/api/v2/berry-flavor/",
  "characteristic": "https://pokeapi.co/api/v2/characteristic/",
  "contest-effect": "https://pokeapi.co/api/v2/contest-effect/",
  "contest-type": "https://pokeapi.co/api/v2/contest-type/",
  "encounter-condition": "https://pokeapi.co/api/v2/encounter-condition/",
  "encounter-condition-value": "https://pokeapi.co/api/v2/encounter-condition-value/",
  "encounter-method": "https://pokeapi.co/api/v2/encounter-method/",
  "evolution-chain": "https://pokeapi.co/api/v2/evolution-chain/",
  "evolution-trigger": "https://pokeapi.co/api/v2/evolution-trigger/",
  "growth-rate": "https://pokeapi.co/api/v2/growth-rate/",
  "item": "https://pokeapi.co/api/v2/item/",
  "item-attribute": "https://pokeapi.co/api/v2/item-attribute/",
  "item-category": "https://pokeapi.co/api/v2/item-category/",
  "item-fling-effect": "https://pokeapi.co/api/v2/item-fling-effect/",
  "item-pocket": "https://pokeapi.co/api/v2/item-pocket/",
  "language": "https://pokeapi.co/api/v2/language/",
  "location": "https://pokeapi.co/api/v2/location/",
  "location-area": "https://pokeapi.co/api/v2/location-area/",
  "machine": "https://pokeapi.co/api/v2/machine/",
  "move-ailment": "https://pokeapi.co/api/v2/move-ailment/",
  "move-battle-style": "https://pokeapi.co/api/v2/move-battle-style/",
  "move-category": "https://pokeapi.co/api/v2/move-category/",
  "move-damage-class": "https://pokeapi.co/api/v2/move-damage-class/",
  "move-learn-method": "https://pokeapi.co/api/v2/move-learn-method/",
  "move-target": "https://pokeapi.co/api/v2/move-target/",
  "pal-park-area": "https://pokeapi.co/api/v2/pal-park-area/",
  "pokeathlon-stat": "https://pokeapi.co/api/v2/pokeathlon-stat/",
  "pokemon": "https://pokeapi.co/api/v2/pokemon/",
  "pokemon-form": "https://pokeapi.co/api/v2/pokemon-form/",
  "pokemon-habitat": "https://pokeapi.co/api/v2/pokemon-habitat/",
  "pokemon-shape": "https://pokeapi.co/api/v2/pokemon-shape/",
  "pokemon-species": "https://pokeapi.co/api/v2/pokemon-species/",
  "region": "https://pokeapi.co/api/v2/region/",
  "super-contest-effect": "https://pokeapi.co/api/v2/super-contest-effect/",
  "version": "https://pokeapi.co/api/v2/version/",
  "version-group": "https://pokeapi.co/api/v2/version-group/"
  */

// =========================
// Variables de gráficos
// =========================
let barChart = null;
let pieChart = null;
let lineChart = null;

// =========================
// Cargar lista de Pokémon
// =========================
async function loadList(url) {
    const res = await fetch(url);
    const data = await res.json();

    document.getElementById('nextBtn').onclick = () => loadList(data.next);
    document.getElementById('prevBtn').onclick = () => loadList(data.previous);
    document.getElementById('nextBtn').disabled = !data.next;
    document.getElementById('prevBtn').disabled = !data.previous;

    const listDiv = document.getElementById('poke-list');
    listDiv.innerHTML = "";
    data.results.forEach(p => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerText = p.name;
        div.onclick = () => loadDetails(p.url);
        listDiv.appendChild(div);
    });
}

// =========================
// Cargar detalles de Pokémon
// =========================
async function loadDetails(url) {

    // Mostrar todas las cards de Pokémon
    document.querySelectorAll("#dashboard-view .card").forEach(card => {
        card.style.display = "block";
    });
    document.getElementById("globalCharts").style.display = "none";

    const res = await fetch(url);
    const p = await res.json();

    document.getElementById('title').innerText = p.name.toUpperCase();
    document.getElementById('p-id').innerText = p.id;
    document.getElementById('p-height').innerText = p.height;
    document.getElementById('p-weight').innerText = p.weight;
    document.getElementById('p-exp').innerText = p.base_experience;

    const sprites = document.getElementById('sprites-container');
    sprites.innerHTML = "";
    const imgUrls = [p.sprites.front_default, p.sprites.back_default, p.sprites.front_shiny];
    imgUrls.forEach(src => { if (src) sprites.innerHTML += `<img src="${src}" width="100">`; });

    document.getElementById('p-types').innerHTML = p.types.map(t => `<span class="badge" style="background:#ef4444">${t.type.name}</span>`).join('');
    document.getElementById('p-abilities').innerHTML = p.abilities.map(a => `<li>${a.ability.name} ${a.is_hidden ? '(Oculta)' : ''}</li>`).join('');
    document.getElementById('p-moves').innerHTML = p.moves.map(m => `<span class="badge" style="background:#3b82f6; margin-bottom:5px; display:inline-block">${m.move.name}</span>`).join('');
    document.getElementById('p-indices').innerHTML = p.game_indices.map(i => `<li>Versión: ${i.version.name} (ID: ${i.game_index})</li>`).join('');
    document.getElementById('json-raw').innerText = JSON.stringify(p, null, 2);

    updateStatsChart(p.stats);
}

// =========================
// Gráfico de stats individuales
// =========================
function updateStatsChart(stats) {
    const ctx = document.getElementById('statsChart').getContext('2d');
    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: stats.map(s => s.stat.name.toUpperCase()),
            datasets: [{
                label: 'Base Stats',
                data: stats.map(s => s.base_stat),
                backgroundColor: 'rgba(239, 83, 80, 0.2)',
                borderColor: '#ef5350'
            }]
        },
        options: { scales: { r: { beginAtZero: true } } }
    });
}

// =========================
// Función única para crear gráficas globales
// =========================
function crearGraficas(labels, values, labelDataset = "Cantidad de Pokémon") {
    if (barChart) barChart.destroy();
    if (pieChart) pieChart.destroy();
    if (lineChart) lineChart.destroy();

    barChart = new Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{ label: labelDataset, data: values, backgroundColor: "rgba(54, 162, 235, 0.7)", borderColor: "rgba(54, 162, 235, 1)", borderWidth: 1 }]
        }
    });

    pieChart = new Chart(document.getElementById("pieChart"), {
        type: "pie",
        data: { labels: labels, datasets: [{ data: values }] }
    });

    lineChart = new Chart(document.getElementById("lineChart"), {
        type: "line",
        data: { labels: labels, datasets: [{ label: labelDataset, data: values, fill: false, borderColor: "rgba(75, 192, 192, 1)", tension: 0.1 }] }
    });
}

// =========================
// Mostrar vistas
// =========================
function mostrarGlobal() {
    document.getElementById("globalCharts").style.display = "block";
    document.querySelectorAll("#dashboard-view .card").forEach(card => {
        if (card.id !== "globalCharts") card.style.display = "none";
    });
}

function mostrarPokemon() {
    document.getElementById("globalCharts").style.display = "none";
    document.querySelectorAll("#dashboard-view .card").forEach(card => card.style.display = "block");
}

// =========================
// Generaciones
// =========================
async function mostrarGeneraciones() {
    mostrarGlobal();

    const res = await fetch(GEN_URL);
    const data = await res.json();

    let labels = [];
    let values = [];

    // Limpiamos la lista de generaciones
    const listDiv = document.getElementById('gen-list');
    listDiv.innerHTML = "";

    for (let gen of data.results) {
        // Agregar a la lista lateral
        const div = document.createElement('div');
        div.className = 'item';
        div.innerText = gen.name;
        div.onclick = async() => {
            // Al pulsar la generación, mostramos solo los Pokémon de esa generación en gráficos
            const r = await fetch(gen.url);
            const d = await r.json();
            const genLabel = d.name;
            const genCount = d.pokemon_species.length;
            crearGraficas([genLabel], [genCount], `Pokémon en ${genLabel}`);
        };
        listDiv.appendChild(div);

        // Datos para las gráficas globales
        const r = await fetch(gen.url);
        const d = await r.json();
        labels.push(d.name);
        values.push(d.pokemon_species.length);
    }

    crearGraficas(labels, values, "Pokémon por Generación");
}


// =========================
// Tipos
// =========================
async function mostrarTipos() {
    mostrarGlobal();

    const res = await fetch(TYPE_URL);
    const data = await res.json();

    let labels = [];
    let values = [];

    for (let type of data.results) {
        const r = await fetch(type.url);
        const d = await r.json();

        if (d.name === "unknown" || d.name === "shadow") continue;

        labels.push(d.name);
        values.push(d.pokemon.length);
    }

    crearGraficas(labels, values, "Pokémon por Tipo");
}

// =========================
// Habilidades
// =========================
async function mostrarHabilidades() {
    mostrarGlobal();

    const res = await fetch(TYPE_URL);
    const data = await res.json();

    let labels = [];
    let values = [];

    for (let abilities of data.results) {
        const r = await fetch(abilities.url);
        const d = await r.json();

        if (d.name === "unknown" || d.name === "shadow") continue;

        labels.push(d.name);
        values.push(d.pokemon.length);
    }

    crearGraficas(labels, values, "Pokémon por Tipo");
}

// =========================
// Pokedex
// =========================
async function mostrarPokedex() {
    mostrarGlobal();

    const res = await fetch(POKEDEX_URL);
    const data = await res.json();

    let labels = [];
    let values = [];

    for (let abilities of data.results) {
        const r = await fetch(abilities.url);
        const d = await r.json();

        if (d.name === "unknown" || d.name === "shadow") continue;

        labels.push(d.name);
        values.push(d.pokemon_entries.length);
    }
    console.log('value', values);

    crearGraficas(labels, values, "Pokémon por Tipo");
}


// =========================
// Grupo Huevos
// =========================
async function mostrarGrupoHuevo() {
    mostrarGlobal();

    const res = await fetch(GRUPOHUEVO_URL);
    const data = await res.json();

    let labels = [];
    let values = [];

    for (let GrupoHuevo of data.results) {
        const r = await fetch(GrupoHuevo.url);
        const d = await r.json();

        labels.push(d.name);
        values.push(d.pokemon_species.length);
    }

    crearGraficas(labels, values, "Pokémon por Grupo Huevo");
}

// =========================
// Genero
// =========================
async function mostrarGenero() {
    mostrarGlobal();

    const res = await fetch(GENERO_URL);
    const data = await res.json();

    let labels = [];
    let values = [];

    for (let Genero of data.results) {
        const r = await fetch(Genero.url);
        const d = await r.json();

        labels.push(d.name);
        values.push(d.pokemon_species_details.length);
    }

    crearGraficas(labels, values, "Pokémon por Grupo Huevo");
}


// =========================
//  Movimiento
// =========================
async function mostrarMove() {
    mostrarGlobal();

    const res = await fetch(MOVE_URL);
    const data = await res.json();

    let labels = [];
    let values = [];

    for (let Move of data.results) {
        const r = await fetch(Move.url);
        const d = await r.json();

        labels.push(d.name);
        values.push(d.learned_by_pokemon.length);
    }

    crearGraficas(labels, values, "Pokémon por Grupo Huevo");
}
// =========================
// Pokemon color 
// =========================
async function mostrarPokeColor() {
    mostrarGlobal();

    const res = await fetch(POKECOLOR_URL);
    const data = await res.json();

    let labels = [];
    let values = [];

    for (let Color of data.results) {
        const r = await fetch(Color.url);
        const d = await r.json();

        labels.push(d.name);
        values.push(d.pokemon_species.length);
    }

    crearGraficas(labels, values, "Pokémon por Grupo Huevo");
}

// =========================
// Inicialización
// =========================
document.addEventListener("DOMContentLoaded", () => {
    loadList(BASE_URL);
    mostrarGeneraciones(); // mostrar por defecto
});


// Función para mostrar las gráficas globales de Generaciones
async function mostrarGeneraciones() {
    mostrarGlobal();

    const res = await fetch(GEN_URL);
    const data = await res.json();

    let labels = [];
    let values = [];

    const listDiv = document.getElementById('gen-list');
    listDiv.innerHTML = "";

    for (let gen of data.results) {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerText = gen.name;
        div.onclick = async() => {
            const r = await fetch(gen.url);
            const d = await r.json();
            const genLabel = d.name;
            const genCount = d.pokemon_species.length;
            crearGraficas([genLabel], [genCount], `Pokémon en ${genLabel}`);
        };
        listDiv.appendChild(div);

        const r = await fetch(gen.url);
        const d = await r.json();
        labels.push(d.name);
        values.push(d.pokemon_species.length);
    }

    crearGraficas(labels, values, "Pokémon por Generación");
}

// Función para mostrar los tipos
async function mostrarTipos() {
    mostrarGlobal();

    const res = await fetch(TYPE_URL);
    const data = await res.json();

    let labels = [];
    let values = [];

    const listDiv = document.getElementById('gen-list');
    listDiv.innerHTML = "";

    for (let type of data.results) {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerText = type.name;
        div.onclick = async() => {
            const response = await fetch(type.url);
            const typeData = await response.json();
            labels = [typeData.name];
            values = [typeData.pokemon.length];
            crearGraficas(labels, values, `Pokémon con el tipo ${typeData.name}`);
        };
        listDiv.appendChild(div);

        const response = await fetch(type.url);
        const typeData = await response.json();
        labels.push(typeData.name);
        values.push(typeData.pokemon.length);
    }

    crearGraficas(labels, values, "Pokémon por Tipo");
}

// Función para mostrar habilidades
async function mostrarHabilidades() {
    mostrarGlobal();

    const res = await fetch(ABILITY_URL);
    const data = await res.json();

    let labels = [];
    let values = [];

    const listDiv = document.getElementById('gen-list');
    listDiv.innerHTML = "";

    for (let type of data.results) {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerText = type.name;
        div.onclick = async() => {
            const response = await fetch(type.url);
            const typeData = await response.json();
            labels = [typeData.name];
            values = [typeData.pokemon.length];
            crearGraficas(labels, values, `Pokémon con el tipo ${typeData.name}`);
        };
        listDiv.appendChild(div);

        const response = await fetch(type.url);
        const typeData = await response.json();
        labels.push(typeData.name);
        values.push(typeData.pokemon.length);
    }

    crearGraficas(labels, values, "Pokémon por Habilidades");
}

// Función para mostrar pokedex
async function mostrarPokedex() {
    mostrarGlobal();

    const res = await fetch(POKEDEX_URL);
    const data = await res.json();

    let labels = [];
    let values = [];

    const listDiv = document.getElementById('gen-list');
    listDiv.innerHTML = "";

    for (let pdex of data.results) {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerText = pdex.name;
        div.onclick = async() => {
            const r = await fetch(pdex.url);
            const d = await r.json();
            const pdexLabel = d.name;
            const pdexCount = d.pokemon_entries.length;
            crearGraficas([pdexLabel], [pdexCount], `Pokémon en ${genLabel}`);

        };
        listDiv.appendChild(div);

        const r = await fetch(pdex.url);
        const d = await r.json();
        labels.push(d.name);
        values.push(d.pokemon_entries.length);
    }

    crearGraficas(labels, values, "Pokémon por Pokedex");
}

// Función para mostrar los GRUPOS HUEVOS
async function mostrarGrupoHuevo() {
    mostrarGlobal();

    const res = await fetch(GRUPOHUEVO_URL);
    const data = await res.json();

    let labels = [];
    let values = [];

    const listDiv = document.getElementById('gen-list');
    listDiv.innerHTML = "";

    for (let type of data.results) {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerText = type.name;
        div.onclick = async() => {
            const response = await fetch(type.url);
            const typeData = await response.json();
            labels = [typeData.name];
            values = [typeData.pokemon.length];
            crearGraficas(labels, values, `Pokémon con el Grupo Huevo ${typeData.name}`);
        };
        listDiv.appendChild(div);

        const response = await fetch(type.url);
        const typeData = await response.json();
        labels.push(typeData.name);
        values.push(typeData.pokemon_species.length);
    }

    crearGraficas(labels, values, "Pokémon por Grupo Huevo");
}

// Función para mostrar genero
async function mostrarGenero() {
    mostrarGlobal();

    const res = await fetch(GENERO_URL);
    const data = await res.json();

    let labels = [];
    let values = [];

    const listDiv = document.getElementById('gen-list');
    listDiv.innerHTML = "";

    for (let type of data.results) {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerText = type.name;
        div.onclick = async() => {
            const response = await fetch(type.url);
            const typeData = await response.json();
            labels = [typeData.name];
            values = [typeData.pokemon_species_details.length];
            crearGraficas(labels, values, `Pokémon con el tipo ${typeData.name}`);
        };
        listDiv.appendChild(div);

        const response = await fetch(type.url);
        const typeData = await response.json();
        labels.push(typeData.name);
        values.push(typeData.pokemon_species_details.length);
    }

    crearGraficas(labels, values, "Pokémon por Habilidades");
}
// Función para mostrar movimientos
async function mostrarMove() {
    mostrarGlobal();

    const res = await fetch(MOVE_URL);
    const data = await res.json();

    let labels = [];
    let values = [];

    const listDiv = document.getElementById('gen-list');
    listDiv.innerHTML = "";

    for (let type of data.results) {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerText = type.name;
        div.onclick = async() => {
            const response = await fetch(type.url);
            const typeData = await response.json();
            labels = [typeData.name];
            values = [typeData.learned_by_pokemon.length];
            crearGraficas(labels, values, `Pokémon con el tipo ${typeData.name}`);
        };
        listDiv.appendChild(div);

        const response = await fetch(type.url);
        const typeData = await response.json();
        labels.push(typeData.name);
        values.push(typeData.learned_by_pokemon.length);
    }

    crearGraficas(labels, values, "Pokémon por Habilidades");
}
// Función para mostrar pokemon color
async function mostrarPokeColor() {
    mostrarGlobal();

    const res = await fetch(POKECOLOR_URL);
    const data = await res.json();

    let labels = [];
    let values = [];

    const listDiv = document.getElementById('gen-list');
    listDiv.innerHTML = "";

    for (let type of data.results) {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerText = type.name;
        div.onclick = async() => {
            const response = await fetch(type.url);
            const typeData = await response.json();
            labels = [typeData.name];
            values = [typeData.pokemon_species.length];
            crearGraficas(labels, values, `Pokémon con el tipo ${typeData.name}`);
        };
        listDiv.appendChild(div);

        const response = await fetch(type.url);
        const typeData = await response.json();
        labels.push(typeData.name);
        values.push(typeData.pokemon_species.length);
    }

    crearGraficas(labels, values, "Pokémon por Habilidades");
}
// Mostrar las gráficas globales
function mostrarGlobal() {
    document.getElementById("global-view").style.display = "block"; // Muestra las gráficas
    document.getElementById("dashboard-view").style.display = "none"; // Oculta el dashboard de Pokémon
}

function mostrarPokemon() {
    document.getElementById("global-view").style.display = "none"; // Oculta las gráficas
    document.getElementById("dashboard-view").style.display = "block"; // Muestra los detalles del Pokémon
}