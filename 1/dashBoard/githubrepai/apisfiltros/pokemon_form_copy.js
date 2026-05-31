import { API_BASE, cache } from '../config_apis/config_global.js'; // lo que levamos al script
import { showSection, fetchPokemon, createPokemonCard } from '../script.js'; // lo que traemos del script 
// ====================================================
// ====================================================
// FUNCIONES DE FETCH - APIS
// ====================================================

export
/**
 *  Obtiene todas los Pokemon Form
 */
async function fetchPokemonForm() {
    if (cache.pokemon_form) return cache.pokemon_form;
    try {
        const response = await fetch(`${API_BASE}/pokemon-form/?limit=100`);
        const data = await response.json();
        return (data.count, data);
    } catch (error) {
        console.error("Error fetching pokemon-form:", error);
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
async function loadMenuspf() {
    //pokemon_form
    const pokemonform = await fetchPokemonForm();
    const pokemonformMenu = document.getElementById("pokemonformMenu");
    /* FUNCIONES CONTABILIZACIÓN - POKÉMON*/
    pokemonform.results.forEach((pokemonform) => {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = pokemonform.name;
        link.addEventListener("click", (e) => {
            //console.log(' e ', e);
            e.preventDefault();
            showSection("pokemonform-section");
            loadPokemonForm(pokemonform.url);
        });
        pokemonformMenu.appendChild(link);
    });
}

// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================

export
/**
 * Carga y visualiza Pokémon de un Pokemon_Form
 */
async function loadPokemonForm(typeUrl) {
    showSection("pokemon-section"); //muestra los datos de los pokemon
    const typeData = await fetch(typeUrl).then((r) => r.json());

    console.log('typeData', typeData);
    const pokemonList = typeData.pokemon;
    console.log('pokemonList', pokemonList);

    const grid = document.getElementById("pokemonGrid");
    grid.innerHTML = "";

    // Limitar a 50
    //const limited = pokemonList.slice(0, 50);

    //for (const form of limited) {
    //console.log("form", form);
    //const typeData2 = await fetch(pokemonList.url).then((r) => r.json());
    //console.log("typeData2", typeData2);
    //const pokemon = await fetchPokemon(form.pokemon_form.name); //[{} {}]
    //const pokemon = await fetchPokemon(typeData2.id); //[{} {}] id "id": 413, form.name
    /*name giratina- : 'https://pokeapi.co/api/v2/pokemon/giratina'*/

    const imagenspecieContenedor = document.getElementById("pokemonSpecies");

    if (pokemonList) {
        createPokemonCard(pokemonList, grid);

    }
    //}
}