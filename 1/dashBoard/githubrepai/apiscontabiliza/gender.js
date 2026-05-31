import { API_BASE, cache } from '../config_apis/config_global.js'; // lo que levamos al script
import { showSection, fetchPokemon, createPokemonCard } from '../script.js'; // lo que traemos del script 
// ====================================================
// ====================================================
// FUNCIONES DE FETCH - APIS
// ====================================================


export
/**
 *  Obtiene todas los  Gender
 */
async function fetchGender() {
    if (cache.gender) return cache.gender;
    try {
        const response = await fetch(`${API_BASE}/gender/?limit=100`);
        const data = await response.json();
        return (data.count, data);
    } catch (error) {
        console.error("Error fetching gender:", error);
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
async function loadMenusg() {
    // gender
    const gender = await fetchGender();
    const genderMenu = document.getElementById("genderMenu");
    /* FUNCIONES CONTABILIZACIÓN - POKÉMON*/
    /* para que al pasa se use el typo de datos typeData.required_for_evolution; que es especico de esta api */
    gender.results.forEach((gender) => {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = gender.name;
        link.addEventListener("click", (e) => {
            e.preventDefault();
            showSection("gender-section");
            loadGenderPokemon(gender.url);
        });
        genderMenu.appendChild(link);
    });
}


// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================



export
/**
 * Carga y visualiza Pokémon de un Gender
 */
async function loadGenderPokemon(typeUrl) {
    showSection("pokemon-section"); //muestra los datos de los pokemon
    const typeData = await fetch(typeUrl).then((r) => r.json());
    //console.log('typeData', typeData);
    const pokemonList = typeData.required_for_evolution; //pokemon_species_details//  para cada poemon que tiene evllucion
    //console.log('pokemonList', pokemonList);
    const genderlessList = typeData.pokemon_species_details.map((p) => p.pokemon_species); //[[{}][{}]];
    //console.log("genderlessList", genderlessList);
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
        //console.log("typeData2", typeData2.id);
        //const pokemon = await fetchPokemon(species.pokemon_species.name); //[{} {}]
        const pokemon = await fetchPokemon(typeData2.id); //[{} {}] id "id": 413, species.name

        if (pokemon) {
            createPokemonCard(pokemon, grid);
        }
    }

    if (typeData.name == "genderless") {
        /* casos genderless */
        const limited2 = genderlessList.slice(0, 50);
        //console.log('idOrName', idOrName); //"name": "wormadam-plant",
        for (const species of limited2) {
            //console.log("species", species);
            const typeData2 = await fetch(species.url).then((r) => r.json());
            //console.log("typeData2", typeData2.id);
            //const pokemon = await fetchPokemon(species.pokemon_species.name); //[{} {}]
            const pokemon = await fetchPokemon(typeData2.id); //[{} {}] id "id": 413, species.name

            if (pokemon) {
                //createPokemonCard(pokemon, grid);
                console.log("no hay pokemon que necesite ser sin genero o no teerno para evolucionarlo");
                // alert("no hay pokemon que necesite ser sin genero o no teerno para evolucionarlo")
            }
        }
    }
}