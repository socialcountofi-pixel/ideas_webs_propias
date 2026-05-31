import { API_BASE, cache } from '../config_apis/config_global.js'; // lo que levamos al script
import { showSection, fetchPokemon, createPokemonCard } from '../script.js'; // lo que traemos del script 
// ====================================================
// ====================================================
// FUNCIONES DE FETCH - APIS
// ====================================================

export
/**
 *  Obtiene todas los  Pokemon Color
 */
async function fetchPokemonColor() {
    if (cache.pokemon_color) return cache.pokemon_color;
    try {
        const response = await fetch(`${API_BASE}/pokemon-color/?limit=100`);
        const data = await response.json();
        return (data.count, data);
    } catch (error) {
        console.error("Error fetching pokemon-color:", error);
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
async function loadMenuspc() {
    //pokemon_color 
    const pokemoncolor = await fetchPokemonColor();
    const pokemoncolorMenu = document.getElementById("pokemoncolorMenu");
    //console.log('params ', params, 'paramsMenu ', paramsMenu, ' ');
    /* FUNCIONES CONTABILIZACIÓN - POKÉMON*/
    pokemoncolor.results.forEach((pokemoncolor) => {
        //console.log(' pokemoncolor', pokemoncolor);
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = pokemoncolor.name;
        link.addEventListener("click", (e) => {
            //console.log(' e ', e);
            e.preventDefault();
            showSection("pokemoncolor-section");
            loadPokemonColor(pokemoncolor.url);
        });
        pokemoncolorMenu.appendChild(link);
    });
}

// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================

export
/**
 * Carga y visualiza Pokémon de un Pokemon_Color
 */
async function loadPokemonColor(typeUrl) {
    showSection("pokemon-section"); //muestra los datos de los pokemon
    const typeData = await fetch(typeUrl).then((r) => r.json());
    // console.log('typeData', typeData);
    const pokemonList = typeData.pokemon_species;
    //console.log('pokemonList', pokemonList);
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