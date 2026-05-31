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
// FUNCIONES DE ACTUALIZACIÃ“N DE DATA
// ====================================================

export
/**
 * Carga los menÃºs laterales
 */
async function loadMenuspf() {
    //pokemon_form
    const pokemonform = await fetchPokemonForm();
    const pokemonformMenu = document.getElementById("pokemonformMenu");
    /* FUNCIONES CONTABILIZACIÃ“N - POKÃ‰MON*/
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
// FUNCIONES DE VISUALIZACIÃ“N - POKÃ‰MON
// ====================================================

export
/**
 * Carga y visualiza PokÃ©mon de un Pokemon_Form
 */
async function loadPokemonForm(typeUrl) {
    showSection("pokemon-section"); //muestra los datos de los pokemon
    const typeData = await fetch(typeUrl).then((r) => r.json());

    console.log('typeData', typeData);
    const pokemonList = typeData.name;
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


    const pokemon = await fetchPokemon(pokemonList); //[{} {}]

    if (pokemonList) {
        const imagenspecieContenedorf = document.getElementById("pokemonImagef");
        createPokemonCard(pokemon, grid);
        console.log(typeData, grid);
        /*  dfatos del form */
        const nuevoTexto = document.createElement("span");
        nuevoTexto.textContent = "id :" + typeData.id +
            "is_baby :" + typeData.is_mega + "name :" + typeData.name;

        imagenspecieContenedorf.appendChild(nuevoTexto);
    }
    //}

}
