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

    document.getElementById("pokemonImagef").innerHTML = "";
    const pokemon = await fetchPokemon(pokemonList); //[{} {}]
    console.log(pokemon);
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


export
/**
 * Carga y visualiza Pokémon de un Pokemon_Form
 */
async function loaddatosPokemonForm(typeUrl) {
    console.log(typeUrl);
    //showSection("pokemon-section"); //muestra los datos de los pokemon
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

    document.getElementById("pokemonImagef").innerHTML = "";

    const pokemon = await fetchPokemon(typeData.id); //[{} {}]
    //console.log('imagen', pokemon);
    if (pokemonList) {
        const imagenspecieContenedorf = document.getElementById("pokemonImagef");
        createPokemonCard(pokemon, grid);
        //console.log(typeData, grid);
        /*  dfatos del form */
        const nuevoTexto = document.createElement("span");
        nuevoTexto.textContent = "id :" + typeData.id +
            "is_baby :" + typeData.is_mega + "name :" + typeData.name;

        imagenspecieContenedorf.appendChild(nuevoTexto);

        console.log('sdfasdf', pokemon.sprites.front_default)

        const imagenformContenedor = document.getElementById("pokemonImagef");

        if (typeData.sprites.front_default && imagenformContenedor) {

            const nuevaImg = document.createElement("img");
            nuevaImg.src = typeData.sprites.front_default;
            nuevaImg.alt = typeData.name || "Forma Pokemon";
            nuevaImg.alt = typeData.name || "Forma Pokemon";
            imagenformContenedor.appendChild(nuevaImg);

            const nuevoTexto = document.createElement("span");;
            nuevoTexto.textContent = typeData.name;
            imagenformContenedor.appendChild(nuevoTexto);
        }


    }
    //}

}