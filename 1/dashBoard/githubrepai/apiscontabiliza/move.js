import { API_BASE, cache } from '../config_apis/config_global.js'; // lo que levamos al script
import { showSection, fetchPokemon, createPokemonCard } from '../script.js'; // lo que traemos del script 
// ====================================================
// ====================================================
// FUNCIONES DE FETCH - APIS
// ====================================================

export
/**
 * Obtiene movimientos
 */
async function fetchMoves(limit = 50) {
    if (cache.move) return cache.move;

    try {
        const response = await fetch(`${API_BASE}/move/?limit=${limit}`);
        const data = await response.json();
        cache.move = data.results;
        return data.results, data;
    } catch (error) {
        console.error("Error fetching moves:", error);
        return [];
    }
}

// ====================================================
// FUNCIONES DE ACTUALIZACIÓN DE DATA
// ====================================================

export
/**
 * Carga los menús laterales
 */
async function loadMenusm() {
    // Movimientos
    const moves = await fetchMoves();
    const movesMenu = document.getElementById("movesMenu");
    /* FUNCIONES CONTABILIZACIÓN - POKÉMON*/
    moves.slice(10, 20).forEach((move) => {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = move.name;
        link.addEventListener("click", (e) => {
            e.preventDefault();
            showSection("move-section");
            loadMovePokemon(move.url);
        });
        movesMenu.appendChild(link);
    });


}

// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================

export
/**
 * Carga y visualiza Pok�mon de un tipo
 */
async function loadMovePokemon(typeUrl) {
    showSection("pokemon-section"); //muestra los datos de los pokemon
    //console.log("typeUrl", typeUrl);
    const typeData = await fetch(typeUrl).then((r) => r.json());
    //console.log("typeData", typeData);
    const pokemonList = typeData.learned_by_pokemon.map((p) => p.url); //[[{}][{}]]
    //console.log("pokemonList", pokemonList);
    const grid = document.getElementById("pokemonGrid");
    grid.innerHTML = "";

    // Limitar a 50
    const limited = pokemonList.slice(0, 50);

    for (const species of limited) {
        //console.log('species', species);
        const typeData = await fetch(species).then((r) => r.json());
        //console.log('typeData', typeData);
        const pokemonList = typeData.id; //pokemon_species_details// para cada poemon que tiene evllucion
        // console.log('pokemonList', pokemonList);

        const pokemon = await fetchPokemon(pokemonList); //[{} {}]

        if (pokemon) {
            createPokemonCard(pokemon, grid);
        }
    }
}