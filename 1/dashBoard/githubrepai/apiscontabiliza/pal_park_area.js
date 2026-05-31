import { API_BASE, cache } from '../config_apis/config_global.js'; // lo que levamos al script
import { showSection, fetchPokemon, createPokemonCard } from '../script.js'; // lo que traemos del script 
// ====================================================
// ====================================================
// FUNCIONES DE FETCH - APIS
// ====================================================

export
/**
 *  Obtiene todas los fetchPalParkArea 
 */
async function fetchPalParkArea() {
    if (cache.pal_park_area) return cache.pal_park_area;
    try {
        const response = await fetch(`${API_BASE}/pal-park-area/?limit=100`);
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
async function loadMenusppa() {
    // Habilidades (mostrar solo algunas)
    const abilities = await fetch(`${API_BASE}/ability/?limit=100`).then((r) => r.json(), );
    const habilMenu = document.getElementById("habilidadesMenu");


    // pal park area
    const totalpalparkarea = await fetchPalParkArea();
    const totalpalparkareaMenu = document.getElementById("palparkareaMenu");
    /* FUNCIONES CONTABILIZACIÓN - POKÉMON*/
    /* para que al pasa se use el typo de datos typeData.evolutiontrigger; que es especico de esta api */
    //console.log('params ', evolutiontrigger, 'paramsMenu ', evolutiontriggerMenu, ' ');
    totalpalparkarea.results.forEach((palparkarea) => {
        //console.log(' palparkarea', palparkarea);
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = palparkarea.name;
        link.addEventListener("click", (e) => {
            //console.log(' e ', e);
            e.preventDefault();
            showSection("palparkarea-section");
            loadpalparkareaPokemon(palparkarea.url);
        });
        totalpalparkareaMenu.appendChild(link);
    });

}

// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================

export
/**
 * Carga y visualiza Pokémon de un Pal Parck area
 */
async function loadpalparkareaPokemon(typeUrl) {
    showSection("pokemon-section"); //muestra los datos de los pokemon
    const typeData = await fetch(typeUrl).then((r) => r.json());
    //console.log('typeData', typeData);
    const pokemonList = typeData.pokemon_encounters; //pokemon_species_details// para cada poemon que tiene evllucion
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
        //const pokemon = await fetchPokemon(species.pokemon_species.name); //[{} {}]
        const pokemon = await fetchPokemon(species.pokemon_species.name); //[{} {}] id "id": 413,
        if (pokemon) {
            createPokemonCard(pokemon, grid);
        }
    }

}