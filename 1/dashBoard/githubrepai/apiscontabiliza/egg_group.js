import { API_BASE, cache } from '../config_apis/config_global.js'; // lo que levamos al script
import { showSection, fetchPokemon, createPokemonCard } from '../script.js'; // lo que traemos del script 
// ====================================================
// ====================================================
// FUNCIONES DE FETCH - APIS
// ====================================================
export
/*
 * Obtiene todas los grupos huevos
 */
async function fetchEggGroup() {
    if (cache.egg_group) return cache.egg_group;
    try {
        const response = await fetch(`${API_BASE}/egg-group/?limit=100`);
        const data = await response.json();
        return (data.count, data);
    } catch (error) {
        console.error("Error fetching egg group:", error);
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
async function loadMenuseg() {
    //egg_goup
    const egggroup = await fetchEggGroup();
    const egggroupMenu = document.getElementById("egggroupMenu");
    /* FUNCIONES CONTABILIZACIÓN - POKÉMON*/
    egggroup.results.forEach((egggroup) => {
        //console.log(' egggroup', egggroup);
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = egggroup.name;
        link.addEventListener("click", (e) => {
            //console.log(' e ', e);
            e.preventDefault();
            showSection("egggroup-section");
            loadEggGroupPokemon(egggroup.url);
            (egggroup.url);
        });
        egggroupMenu.appendChild(link);
    });
}


// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================



export
/**
 * Carga y visualiza Pokémon de un grupo huevo
 */
async function loadEggGroupPokemon(typeUrl) {
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