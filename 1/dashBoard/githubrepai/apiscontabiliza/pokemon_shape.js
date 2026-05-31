import { API_BASE, cache } from '../config_apis/config_global.js'; // lo que levamos al script
import { showSection, fetchPokemon, createPokemonCard } from '../script.js'; // lo que traemos del script 
// ====================================================
// ====================================================
// FUNCIONES DE FETCH - APIS
// ====================================================

export
/**
 *  Obtiene todas los  Pokemon Shape
 */
async function fetchPokemonShape() {
    if (cache.pokemon_shape) return cache.pokemon_shape;
    try {
        const responseS = await fetch(`${API_BASE}/pokemon-shape/?limit=20`);
        const datas = await responseS.json();
        return (datas.count, datas);
    } catch (error) {
        console.error("Error fetching  pokemon-shape:", error);
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
async function loadMenusps() {
    //pokemon_shape
    const pokemonshape = await fetchPokemonShape(); // trae el valor count
    const pokemonshapeMenu = document.getElementById("pokemonshapeMenu"); /* FUNCIONES CONTABILIZACIÓN - POKÉMON*/
    pokemonshape.results.forEach((pokemonshape) => {
        //console.log(' pokemonshape', pokemonshape);
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = pokemonshape.name;
        link.addEventListener("click", (e) => {
            //console.log(' e ', e);
            e.preventDefault();
            showSection("pokemonshape-section");
            loadPokemonShape(pokemonshape.url);
        });
        pokemonshapeMenu.appendChild(link);
    });
}

// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================

export
/**
 * Carga y visualiza Pokémon de un Pokemon_Shape
 */
async function loadPokemonShape(typeUrl) {
    showSection("pokemon-section"); //muestra los datos de los pokemon
    const typeData = await fetch(typeUrl).then((r) => r.json());
    //console.log("typeData", typeData);
    const pokemonList = typeData.pokemon_species;
    //console.log("pokemonList", pokemonList);
    const grid = document.getElementById("pokemonGrid");
    grid.innerHTML = "";

    // Limitar a 50
    const limited = pokemonList.slice(0, 50);

    for (const species of limited) {
        //console.log("species", species);
        const typeData2 = await fetch(species.url).then((r) => r.json());
        //console.log("typeData2", typeData2);
        //const pokemon = await fetchPokemon(species.pokemon_species.name); //[{} {}]
        const pokemon = await fetchPokemon(typeData2.id); //[{} {}] id "id": 413, species.name
        /*name giratina- : 'https://pokeapi.co/api/v2//pokemon/giratina'*/

        if (pokemon) {
            createPokemonCard(pokemon, grid);
        }
    }
}