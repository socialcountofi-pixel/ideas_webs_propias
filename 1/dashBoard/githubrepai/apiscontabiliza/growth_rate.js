import { API_BASE, cache } from '../config_apis/config_global.js'; // lo que levamos al script
import { showSection, fetchPokemon, createPokemonCard } from '../script.js'; // lo que traemos del script 
// ====================================================
// ====================================================
// FUNCIONES DE FETCH - APIS
// ====================================================


export
/**
 *  Obtiene todas los growth-rate https://pokeapi.co/api/v2/growth-rate/    pensarlo bien contabiliza los pokemon */
async function fetchGrowthRate() {
    if (cache.evolution_trigger) return cache.evolution_trigger;
    try {
        const response = await fetch(`${API_BASE}/growth-rate/?limit=100`);
        const data = await response.json();
        return (data.count, data);
    } catch (error) {
        console.error("Error fetching growth rate:", error);
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
async function loadMenusgr() {
    // growh rate
    const growthRrate = await fetchGrowthRate();
    const growthRrateMenu = document.getElementById("growthrateMenu");
    /* FUNCIONES CONTABILIZACIÓN - POKÉMON*/

    /* para que al pasa se use el typo de datos typeData.evolutiontrigger; que es especico de esta api */
    //console.log('params ', evolutiontrigger, 'paramsMenu ', evolutiontriggerMenu, ' ');
    growthRrate.results.forEach((growthrate) => {
        //console.log(' growthrate', growthrate);
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = growthrate.name;
        link.addEventListener("click", (e) => {
            //console.log(' e ', e);
            e.preventDefault();
            showSection("growthRrate-section");
            loadgrowthRrate(growthrate.url);
        });
        growthRrateMenu.appendChild(link);
    });
}


// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================



export


/**
 * Carga y visualiza Pokémon de un Growth rate
 */
async function loadgrowthRrate(typeUrl) {
    showSection("pokemon-section"); //muestra los datos de los pokemon
    const typeData = await fetch(typeUrl).then((r) => r.json());
    //console.log('typeData', typeData);
    const pokemonList = typeData.pokemon_species; //pokemon_species_details// para cada poemon que tiene evllucion
    //console.log('pokemonList', pokemonList);
    const grid = document.getElementById("pokemonGrid");
    grid.innerHTML = "";
    /* {name: 'wormadam', url: 'https://pokeapi.co/api/v2/pokemon-species/413/'}
     
         */
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