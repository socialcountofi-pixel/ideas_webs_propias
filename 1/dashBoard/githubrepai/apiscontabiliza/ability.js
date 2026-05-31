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
async function fetchAbilities() {
    if (cache.ability) return cache.ability;

    try {
        const response = await fetch(`${API_BASE}/ability/?limit=1`);
        const data = await response.json();
        return data.count;
    } catch (error) {
        console.error("Error fetching abilities:", error);
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
async function loadMenusa() {
    // Habilidades (mostrar solo algunas)
    const abilities = await fetch(`${API_BASE}/ability/?limit=100`).then((r) => r.json(), );
    const habilMenu = document.getElementById("habilidadesMenu");
    /* FUNCIONES CONTABILIZACIÓN - POKÉMON*/
    abilities.results.forEach((ability) => {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = ability.name;
        link.addEventListener("click", (e) => {
            e.preventDefault();
            showSection("ability-section");
            loadAbility(ability.url);
        });
        habilMenu.appendChild(link);
    });
}


// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================



export
/**
 * Carga y visualiza Pokémon de un abilidades
 */
async function loadAbility(typeUrl) {
    showSection("pokemon-section"); //muestra los datos de los pokemon
    //console.log(typeUrl);
    const typeData = await fetch(typeUrl).then((r) => r.json());
    //console.log('abilityData', typeData);
    const pokemonList = typeData.pokemon;
    //console.log('pokemonListAbility', pokemonList);
    const grid = document.getElementById("pokemonGrid");
    grid.innerHTML = "";
    // Limitar a 50
    const limited = pokemonList.slice(0, 50);

    for (const species of limited) {
        const pokemon = await fetchPokemon(species.pokemon.name); //[{} {}]

        if (pokemon) {
            createPokemonCard(pokemon, grid);
        }
    }
}