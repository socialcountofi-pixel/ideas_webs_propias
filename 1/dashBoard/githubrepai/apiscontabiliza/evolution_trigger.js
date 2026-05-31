import { API_BASE, cache } from '../config_apis/config_global.js'; // lo que levamos al script
import { showSection, fetchPokemon, createPokemonCard } from '../script.js'; // lo que traemos del script 
// ====================================================
// ====================================================
// FUNCIONES DE FETCH - APIS
// ====================================================


export
/**
 *  Obtiene todas los  evolution trigger
 */
async function fetchEvolutioTrigger() {
    if (cache.evolution_trigger) return cache.evolution_trigger;
    try {
        const response = await fetch(`${API_BASE}/evolution-trigger/?limit=100`);
        const data = await response.json();
        return (data.count, data);
    } catch (error) {
        console.error("Error fetching evolution trigger:", error);
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
async function loadMenuset() {
    // trigger
    const evolutiontrigger = await fetchEvolutioTrigger();
    const evolutiontriggerMenu = document.getElementById("evolutiontriggerMenu");
    /* FUNCIONES CONTABILIZACIÓN - POKÉMON*/
    /* para que al pasa se use el typo de datos typeData.evolutiontrigger; que es especico de esta api */
    //console.log('params ', evolutiontrigger, 'paramsMenu ', evolutiontriggerMenu, ' ');
    evolutiontrigger.results.forEach((evolutiotrigger) => {
        //console.log(' evolutiotrigger', evolutiotrigger);
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = evolutiotrigger.name;
        link.addEventListener("click", (e) => {
            //console.log(' e ', e);
            e.preventDefault();
            showSection("evolutiontrigger-section");
            loadEvolutionTriggerPokemon(evolutiotrigger.url);
        });
        evolutiontriggerMenu.appendChild(link);
    });

}


// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================



export
/**
 * Carga y visualiza Pokémon de un trigeer evoluciones
 */
async function loadEvolutionTriggerPokemon(typeUrl) {
    showSection("pokemon-section"); //muestra los datos de los pokemon
    const typeData = await fetch(typeUrl).then((r) => r.json());
    //console.log('typeData', typeData.pokemon_species);
    const pokemonList = typeData.pokemon_species; //pokemon_species_details// para cada poemon que tiene evllucion
    // const other = typeData.pokemon_species_details.map((p) => p.pokemon_species); 
    //console.log('pokemonList', pokemonList);
    const grid = document.getElementById("pokemonGrid");
    grid.innerHTML = "";

    /* {name: 'maushold', url: 'https://pokeapi.co/api/v2/pokemon-species/925/'}         */
    // Limitar a 50
    const limited = pokemonList.slice(0, 50);
    //console.log('idOrName', idOrName); //"name": "wormadam-plant",
    for (const species of limited) {
        //console.log("species", species);
        const typeData2 = await fetch(species.url).then((r) => r.json());
        //console.log('typeData2', typeData2);
        //const pokemon = await fetchPokemon(species.pokemon_species.name); //[{} {}]
        const pokemon = await fetchPokemon(typeData2.id); //[{} {}] id "id": 413,
        if (pokemon) {
            createPokemonCard(pokemon, grid);
        }
    }



}