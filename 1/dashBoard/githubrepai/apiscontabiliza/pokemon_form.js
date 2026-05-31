import { API_BASE, cache } from '../config_apis/config_global.js'; // lo que levamos al script
import { showSection, fetchPokemon, createPokemonCard } from '../script.js'; // lo que traemos del script 
/// ====================================================
// FUNCIONES DE FETCH - APIS
// ====================================================

export
/**
 *  Obtiene todas los  formas contabilizadas
 */
async function fetchPokemonFormF() {
    if (cache.pokemon_form) return cache.pokemon_form;

    try {
        const response = await fetch(`${API_BASE}/pokemon-form/?limit=100`);
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
async function loadMenuspf(formasDato) { //(pokemon);//del origen

    //console.log('formaasDatos', formasDato.forms);

    formasDato.forms.map((forma) => {

        pokemoformpokemon(forma.name);
        // console.log(forma.name, 'pokemonformwwws', forma.url);

    });


    /*
    "forms": [
        {
          "name": "flabebe-red",
          "url": "https://pokeapi.co/api/v2/pokemon-form/669/"
        },
        {
          "name": "flabebe-yellow",
          "url": "https://pokeapi.co/api/v2/pokemon-form/10103/"
        },
        {
          "name": "flabebe-orange",
          "url": "https://pokeapi.co/api/v2/pokemon-form/10104/"
        },
        {
          "name": "flabebe-blue",
          "url": "https://pokeapi.co/api/v2/pokemon-form/10105/"
        },
        {
          "name": "flabebe-white",
          "url": "https://pokeapi.co/api/v2/pokemon-form/10106/"
        }
      ], */



}


// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================
/* solo si se carga los datos */

export
/**
 * Carga y visualiza Pokémon de un pokemonform 
 */
async function pokemoformpokemon(pokemon) {
    document.getElementById("pokemonImagef").innerHTML = "";

    //console.log('pokemon', pokemon, 'id', pokemon.id);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${pokemon}/`);
    const datassd = await response.json();
    //cache.pokemon_form = data.results;
    //return (data.results);
    // console.log('datasaprites', datassd);

    //console.log('datasapritesform', datassdf.sprites.front_default);

    const imagenformContenedor = document.getElementById("pokemonImagef");

    if (datassd.sprites.front_default && imagenformContenedor) {

        const nuevaImg = document.createElement("img");
        nuevaImg.src = datassd.sprites.front_default;
        nuevaImg.alt = datassd.name || "Forma Pokemon";
        nuevaImg.alt = datassd.name || "Forma Pokemon";
        imagenformContenedor.appendChild(nuevaImg);

        const nuevoTexto = document.createElement("span");;
        nuevoTexto.textContent = datassd.name;
        imagenformContenedor.appendChild(nuevoTexto);
    }


}