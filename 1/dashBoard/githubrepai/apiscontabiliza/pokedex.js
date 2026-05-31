import { API_BASE, cache } from '../config_apis/config_global.js'; // lo que levamos al script
import { showSection, fetchPokemon, createPokemonCard } from '../script.js'; // lo que traemos del script 
// ====================================================
// ====================================================
// FUNCIONES DE FETCH - APIS
// ====================================================

export
/**
 *  Obtiene todas los Pokedex
 */
async function fetchPokedex() {
    if (cache.pokedex) return cache.pokedex;
    try {
        const response = await fetch(`${API_BASE}/pokedex/?limit=100`);
        const data = await response.json();
        return (data.count, data);
    } catch (error) {
        console.error("Error fetching pokedex:", error);
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
async function loadMenuspx() {
    //pokedex
    const pokedex = await fetchPokedex();
    const pokedexMenu = document.getElementById("pokedexMenu");
    /* FUNCIONES CONTABILIZACIÓN - POKÉMON*/
    pokedex.results.forEach((pokedex) => {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = pokedex.name;
        link.addEventListener("click", (e) => {
            e.preventDefault();
            showSection("pokedex-section");
            loadPokedexPokemon(pokedex.url);
        });
        pokedexMenu.appendChild(link);
    });
}

// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================

export
/**
 * Carga y visualiza Pokémon de un pokedex
 */
async function loadPokedexPokemon(typeUrl) {
    showSection("pokemon-section"); //muestra los datos de los pokemon

    const typeData = await fetch(typeUrl).then((r) => r.json());
    //console.log("typeData", typeData);
    const pokemonList = typeData.pokemon_entries.map((p) => p.pokemon_species); //[[{}][{}]];
    //console.log("pokemonList", pokemonList);
    const grid = document.getElementById("pokemonGrid");
    grid.innerHTML = "";

    // Limitar a 50
    const limited = pokemonList.slice(0, 50);

    for (const species of limited) {
        //console.log("species", species);
        const typeData2 = await fetch(species.url).then((r) => r.json());
        //console.log("typeData2", typeData2.id);
        //const pokemon = await fetchPokemon(species.pokemon_species.name); //[{} {}]
        const pokemon = await fetchPokemon(typeData2.id); //[{} {}] id "id": 413, species.name
        /*name tatsugiri-curly : 'https://pokeapi.co/api/v2//pokemon/tatsugiri'  */
        if (pokemon) {
            createPokemonCard(pokemon, grid);
        }
    }
}