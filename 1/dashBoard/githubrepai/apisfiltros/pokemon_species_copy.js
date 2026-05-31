import { fetchPokemonShape } from '../apiscontabiliza/pokemon_shape.js';
import { API_BASE, cache } from '../config_apis/config_global.js'; // lo que levamos al script
import { showSection, fetchPokemon, createPokemonCard } from '../script.js'; // lo que traemos del script 


import { loadMenuspev } from './pokemon_evolution-chain.js'; // lo que traemos del evoution 

/*
pokemon-species:"https://pokeapi.co/api/v2/pokemon-species/"
// =>
evolution-chain:"https://pokeapi.co/api/v2/evolution-chain/"
*/
// ====================================================
// ====================================================
// FUNCIONES DE FETCH - APIS
// ====================================================

export
/**
 *  Obtiene todas los  Pokemon Species
 */
async function fetchPokemonSpecies() {
    if (cache.pokemon_species) return cache.pokemon_species;
    try {
        const response = await fetch(`${API_BASE}/pokemon-species/?limit=100`);
        const data = await response.json();
        return (data.count, data);
    } catch (error) {
        console.error("Error fetching pokemon-species:", error);
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
async function loadMenuspe() {
    //pokemon_species 
    const pokemonspecies = await fetchPokemonSpecies();
    const pokemonspeciesMenu = document.getElementById("pokemonspeciesMenu");
    //console.log('params ', params, 'paramsMenu ', paramsMenu, ' ');
    /* FUNCIONES CONTABILIZACIÓN - POKÉMON*/
    pokemonspecies.results.forEach((pokemonspecies) => {
        //console.log(' pokemonspecies', pokemonspecies);
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = pokemonspecies.name;
        link.addEventListener("click", (e) => {
            //console.log(' e ', e);
            e.preventDefault();
            showSection("pokemonspecies-section");
            loadPokemonSpecies(pokemonspecies.url);
        });
        pokemonspeciesMenu.appendChild(link);
    });
}

// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================

export
/**
 * Carga y visualiza Pokémon de un Pokemon_Species
 */
async function loadPokemonSpecies(typeUrl) {
    showSection("pokemon-section"); //muestra los datos de los pokemon desde el menu desplegable
    const typeData = await fetch(typeUrl).then((r) => r.json());
    console.log('typeData', typeData);
    const pokemonList = typeData.name;
    console.log('pokemonList', pokemonList);
    const grid = document.getElementById("pokemonGrid");
    grid.innerHTML = "";

    // Limitar a 50
    //const limited = pokemonList.slice(0, 50);

    //for (const species of limited) {
    //console.log('species', species.url);
    //const typeData = await fetch(species.url).then((r) => r.json());
    //console.log('typeData', typeData);
    //const pokemonList = typeData.id; //pokemon_species_details// para cada poemon que tiene evllucion
    //console.log('pokemonList', pokemonList);



    const pokemon = await fetchPokemon(pokemonList); //[{} {}]

    if (pokemonList) {
        const imagenspecieContenedor = document.getElementById("pokemonSpecies");
        createPokemonCard(pokemon, grid);
        /*datos dela especie */
        const nuevoTexto = document.createElement("span");
        nuevoTexto.textContent = 'base_happiness :' + typeData.base_happiness +
            "  capture_rate :" + typeData.capture_rate;

        imagenspecieContenedor.appendChild(nuevoTexto);
    }
    //}
}



export
/**
 * Carga y visualiza Pokémon de un Pokemon_Species
 */
async function loaddatosPokemonSpecies(typeUrl) {
    //showSection("pokemon-section"); //muestra los datos de los pokemon desde el menu desplegable
    const typeData = await fetch(typeUrl).then((r) => r.json());
    //console.log('typeData', typeData);
    const pokemonList = typeData.name;
    //console.log('pokemonList', pokemonList);
    const grid = document.getElementById("pokemonGrid");
    grid.innerHTML = "";

    // Limitar a 50
    //const limited = pokemonList.slice(0, 50);

    //for (const species of limited) {
    //console.log('species', species.url);
    //const typeData = await fetch(species.url).then((r) => r.json());
    //console.log('typeData', typeData);
    //const pokemonList = typeData.id; //pokemon_species_details// para cada poemon que tiene evllucion
    //console.log('pokemonList', pokemonList);



    const pokemon = await fetchPokemon(pokemonList); //[{} {}]

    if (pokemonList) {
        const imagenspecieContenedor = document.getElementById("pokemonSpecies");
        createPokemonCard(pokemon, grid);
        /*datos dela especie */
        const nuevoTexto = document.createElement("span");
        nuevoTexto.textContent = 'base_happiness :' + typeData.base_happiness +
            "  capture_rate :" + typeData.capture_rate;

        imagenspecieContenedor.appendChild(nuevoTexto);

        /* imagenes variedades */
        const imagenformContenedor = document.getElementById("pokemonImagef");
        //console.log(typeData.varieties);

        typeData.varieties.forEach((element) =>

            //console.log(element.pokemon.name)

            imagenesvariedades(element.pokemon.name)

        );

    }

    //}
}

async function imagenesvariedades(variedades) {
    document.getElementById("pokemonImagef").innerHTML = "";
    const pokemon = await fetchPokemon(variedades);
    //console.log(pokemon);

    const imagenformContenedor = document.getElementById("pokemonVarieties");

    if (pokemon.sprites.front_default && imagenformContenedor) {

        const nuevaImg = document.createElement("img");
        nuevaImg.src = pokemon.sprites.front_default;
        nuevaImg.alt = pokemon.name || "Forma Pokemon";
        nuevaImg.alt = pokemon.name || "Forma Pokemon";
        imagenformContenedor.appendChild(nuevaImg);

        const nuevoTexto = document.createElement("span");;
        nuevoTexto.textContent = pokemon.name;
        imagenformContenedor.appendChild(nuevoTexto);
    }
}
