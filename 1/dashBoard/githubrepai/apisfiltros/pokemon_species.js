import { fetchPokemonShape } from '../apiscontabiliza/pokemon_shape.js';
import { API_BASE, cache } from '../config_apis/config_global.js'; // lo que levamos al script
import { showSection, fetchPokemon, createPokemonCard } from '../script.js'; // lo que traemos del script 


import { loadMenuspev } from './pokemon_evolution-chain.js'; // lo que traemos del evoution 

/*
pokemon-species:"https://pokeapi.co/api/v2/pokemon-species/"
// =>
evolution-chain:"https://pokeapi.co/api/v2/evolution-chain/"
*/
/// ====================================================
// FUNCIONES DE FETCH - APIS
// ====================================================
//pokemonSpecies
export
/**
 *  Obtiene todas los  formas contabilizadas
 */
async function fetchPokemonSpecies() {
    if (cache.pokemon_form) return cache.pokemon_form;

    try {
        const response = await fetch(`${API_BASE}/pokemon-species/?limit=100`);
        const data = await response.json();
        cache.pokemon_form = data.results;
        return (data.results);
    } catch (error) {
        console.error("Error fetching pokemonforms:", error);
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
async function loadMenuspcvv() {
    //pokemon_color 
    const pokemonspecies = await fetchPokemonSpecies();
    const pokemonspeciesMenu = document.getElementById("pokemonspeciesMenu");
    //console.log('params ', params, 'paramsMenu ', paramsMenu, ' ');
    /* FUNCIONES CONTABILIZACIÓN - POKÉMON*/
    pokemonspecies.results.forEach((pokemonspecie) => {
        //console.log(' pokemonspecies', pokemonspecies);
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = pokemonspecie.name;
        link.addEventListener("click", (e) => {
            //console.log(' e ', e);
            e.preventDefault();
            showSection("pokemonspecies-section");
            loadpokemonspecies(pokemonspecies.url);
        });
        pokemonspeciesMenu.appendChild(link);
    });
}




// ====================================================
// FUNCIONES DE ACTUALIZACIÓN DE DATA
// ====================================================



export
/**
 * Carga los menús laterales
 */
async function loadMenuspSp(formasDato) { //(pokemon);//del origen

    const pokemonspecies = await fetchPokemonSpecies();
    const pokemonspeciesMenu = document.getElementById("pokemonspeciesFilter");
    pokemonspeciesMenu.style.width = "150px"; //tamaño tempora pues haba que ver como mejorarlo
    //console.log('pokemonspecies', pokemonspecies, 'pokemonspeciesMenu', pokemonspeciesMenu);
    pokemonspecies.forEach((natures) => {
        //console.log('pokemonspecies', pokemonspecies);
        const option = document.createElement("option");
        option.href = "#";
        ((option.value = natures.url), natures.name); // cambia la , por + para saber que esta se ha pulsado
        option.textContent = natures.name;
        pokemonspeciesMenu.appendChild(option);
    });
    pokemonspeciesMenu.addEventListener("change", (e) => {
        console.log('ha pulsado ', e.target.value);
        const s = e.target.value;
        //datosnature(s); //datos de la nature
    });

    //console.log('epecies', formasDato);

    pokemospeciepokemon(formasDato.url);


    //formasDato.map((forma) => {

    //pokemospeciepokemon(forma.species);
    //console.log(forma.species, 'pokemonformwwws');

    //});


    /*
    https://pokeapi.co/api/v2/pokemon-species/669/
  */



}


// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================
/* solo si se carga los datos */

export
/**
 * Carga y visualiza Pokémon de un pokemonform 
 */
async function pokemospeciepokemon(typeUrl) {
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



    //document.getElementById("pokemonSpecies").innerHTML = "";

    //console.log('pokemon', specie, 'id', specie.id);
    const response = await fetch(specie);
    const datassdf = await response.json();
    //cache.pokemon_form = data.results;
    //return (data.results);
    // console.log('datasaprites', datassdf);

    //console.log('datasapritesform', datassdf.sprites.front_default);

    const imagenspecieContenedor = document.getElementById("pokemonSpecies");

    if (datassdf.name && imagenspecieContenedor) {


        const nuevoTexto = document.createElement("span");
        nuevoTexto.textContent = 'base_happiness :' + datassdf.base_happiness +
            "  capture_rate :" + 225;

        imagenspecieContenedor.appendChild(nuevoTexto);
    }

    /*
    
  "evolution_chain": {
    "url": "https://pokeapi.co/api/v2/evolution-chain/344/"
  },
   */
    //evolucion
    /////////////evolucion(pokemon)

    loadMenuspev(datassdf.evolution_chain.url)
        //evolucion

}