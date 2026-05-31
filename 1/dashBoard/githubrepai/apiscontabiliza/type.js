import { API_BASE, cache } from '../config_apis/config_global.js'; // lo que levamos al script
import { showSection, fetchPokemon, createPokemonCard } from '../script.js'; // lo que traemos del script 
// ====================================================
// ====================================================
// FUNCIONES DE FETCH - APIS
// ====================================================

export
/**
 * Obtiene todos los tipos
 */
async function fetchTypes() {
    if (cache.type) return cache.type;

    try {
        const response = await fetch(`${API_BASE}/type/?limit=100`);
        const data = await response.json();
        cache.type = data.results;
        return data.count;
    } catch (error) {
        console.error("Error fetching types:", error);
        return 0;
    }
}

// ====================================================
// FUNCIONES DE ACTUALIZACIÓN DE DATA
// ====================================================

export
/**
 * Carga los menús laterales
 */
async function loadMenust() {
    // Tipos
    const types = await fetchTypes();
    const typesMenu = document.getElementById("typesMenu");
    /* FUNCIONES CONTABILIZACIÓN - POKÉMON*/
    types.forEach((type) => {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = type.name;
        link.addEventListener("click", (e) => {
            e.preventDefault();
            showSection("types-section");
            loadTypePokemon(type.url);
        });
        typesMenu.appendChild(link);
    });
}

// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================

export
/**
 * Carga y visualiza Pokémon de un generation
 */
async function loadTypePokemon(typeUrl) {
    showSection("pokemon-section"); //muestra los datos de los pokemon
    //console.log("typeUrl", typeUrl);
    const typeData = await fetch(typeUrl).then((r) => r.json());
    //console.log("typeData", typeData);
    const pokemonList = typeData.pokemon.map((p) => p.pokemon); //[[{}][{}]]
    //console.log("pokemonList", pokemonList);
    const grid = document.getElementById("pokemonGrid");
    grid.innerHTML = "";

    // Limitar a 50
    const limited = pokemonList.slice(0, 50);

    for (const species of limited) {
        //console.log('species', species.url);
        const typeData = await fetch(species.url).then((r) => r.json());
        //console.log('typeData', typeData);
        const pokemonList = typeData.id; //pokemon_species_details// para cada poemon que tiene evllucion
        //console.log('pokemonList', pokemonList);

        const pokemon = await fetchPokemon(pokemonList); //[{} {}]

        if (pokemon) {
            createPokemonCard(pokemon, grid);
        }
    }
}