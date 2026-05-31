import { API_BASE, cache } from '../config_apis/config_global.js'; // lo que levamos al script
import { showSection, fetchPokemon, createPokemonCard } from '../script.js'; // lo que traemos del script 
// ====================================================
// ====================================================
// FUNCIONES DE FETCH - APIS
// ====================================================


export
/**
 * Obtiene todos las generaciones
 */
async function fetchGenerations() {
    if (cache.generation) return cache.generation;

    try {
        const response = await fetch(`${API_BASE}/generation/?limit=100`);
        const data = await response.json();
        return (data.count, data);
    } catch (error) {
        console.error("Error fetching generations:", error);
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
async function loadMenusgn() {
    // Tipos
    const generations = await fetchGenerations();
    const genMenu = document.getElementById("generationsMenu");
    /* FUNCIONES CONTABILIZACIÓN - POKÉMON*/
    generations.results.forEach((generation) => {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = generation.name;
        link.addEventListener("click", (e) => {
            e.preventDefault();
            showSection("generations-section");
            loadGenerationPokemon(generation.url); // similar a egg Groups
        });
        genMenu.appendChild(link);
    });
}


// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================


export
/**
 * Carga y visualiza Pokémon de un generation
 */
async function loadGenerationPokemon(typeUrl) {
    showSection("pokemon-section"); //muestra los datos de los pokemon
    const typeData = await fetch(typeUrl).then((r) => r.json());

    const pokemonList = typeData.pokemon_species;

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