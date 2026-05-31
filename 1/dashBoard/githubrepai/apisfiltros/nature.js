import { API_BASE, cache } from '../config_apis/config_global.js'; // lo que levamos al script
import { showSection, fetchPokemon, createPokemonCard } from '../script.js'; // lo que traemos del script 
/// ====================================================
// FUNCIONES DE FETCH - APIS
// ====================================================

export
/**
 *  Obtiene todas los  naturees
 */
async function fetchNatures() {
    if (cache.nature) return cache.nature;

    try {
        const response = await fetch(`${API_BASE}/nature/?limit=100`);
        const data = await response.json();
        cache.nature = data.results;
        return (data.results);
    } catch (error) {
        console.error("Error fetching nature:", error);
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
async function loadMenusn() {
    // naturees
    const natures = await fetchNatures();
    const naturesMenu = document.getElementById("naturesFilter");
    naturesMenu.style.width = "150px"; //tamaÃ±o tempora pues haba que ver como mejorarlo
    //console.log('natures', natures, 'naturesMenu', naturesMenu);
    natures.forEach((nature) => {
        //console.log('natures', natures);
        const option = document.createElement("option");
        option.href = "#";
        ((option.value = nature.url), nature.name); // cambia la , por + para saber que esta se ha pulsado
        option.textContent = nature.name;
        naturesMenu.appendChild(option);
    });
    naturesMenu.addEventListener("change", (e) => {
        console.log('ha pulsado ', e.target.value);
        const s = e.target.value;
        datosnature(s); //datos de la nature
    });

}

export
/**
 * Carga los datos de la naturaleza
 */
async function datosnature(s) {
    const abilitiesw = await fetch(s).then((r) => r.json());
    //console.log('s', s, "prueba", abilitiesw);
    /**importante coando increase y decrease si hay datos se muestre caso hp nada pero atake muestre los movimientos */
    /* filtro 2 */
    // funcionalidad por si trae un null  
    /**decreased_stat    :     {name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/'}
     */
    const natureDMenu = document.getElementById("NatureDecreasedStat");
    natureDMenu.style.width = "150px";
    //tamaÃ±o tempora pues haba que ver como mejorarlo
    /* INCREASE */
    //console.log('abilitiesw', abilitiesw.decreased_stat);
    /* muesta los datos de la increased_staten un select */
    const option = document.createElement("option");
    option.href = "#";
    ((option.value = abilitiesw.decreased_stat.url), abilitiesw.decreased_stat.name); // cambia la , por + para saber que esta se ha pulsado
    option.textContent = abilitiesw.decreased_stat.name;
    natureDMenu.appendChild(option);

    natureDMenu.addEventListener("change", (e) => {
        console.log('ha pulsado ', e.target.value);
        //const s = e.target.value;
        //natureDatos(s); //datos de la nature
        //statmovesincredecre(s);//incremetas los movimientos
    });


    /*         increased_stat    :     {name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/'} */
    const natureIMenu = document.getElementById("NatureIncreasedStat");
    natureIMenu.style.width = "150px";
    //tamaÃ±o tempora pues haba que ver como mejorarlo
    /* INCREASE */
    //console.log('abilitiesw', abilitiesw.increased_stat);
    /* muesta los datos de la increased_staten un select */
    const option2 = document.createElement("option");
    option2.href = "#";
    ((option2.value = abilitiesw.increased_stat.url), abilitiesw.increased_stat.name); // cambia la , por + para saber que esta se ha pulsado
    option2.textContent = abilitiesw.increased_stat.name;
    natureIMenu.appendChild(option2);

    natureIMenu.addEventListener("change", (e) => {
        console.log('ha pulsado ', e.target.value);
        //const s = e.target.value;
        //natureDatos(s); //datos de la nature
        //statmovesincredecre(s);//incremetas los movimientos
    });

    /* muesta los datos de la naturaleza */
    document.getElementById("naturesDetail").innerHTML = "";
    const datositemq = document.getElementById("naturesDetail");
    console.log('datositemq', datositemq);

    const datositem = document.createElement("a");
    //datositem.href = '#';
    ((option2.value = abilitiesw.name), abilitiesw.id); // cambia la , por + para saber que esta se ha pulsado
    ((option.value = abilitiesw.name), abilitiesw.id); // cambia la , por + para saber que esta se ha pulsado
    datositem.textContent =
        abilitiesw.name + " - " + " - " + abilitiesw.id + " - " + " odia berry sabor : " + abilitiesw.hates_flavor.name + " - " + " gusta berry sabor : " + abilitiesw.likes_flavor.name;
    //console.log(datositem);
    datositemq.appendChild(datositem);

};

/*
hates_flavor    :     {name: 'spicy', url: 'https://pokeapi.co/api/v2/berry-flavor/1/'}
id    :     2
likes_flavor    :     {name: 'sour', url: 'https://pokeapi.co/api/v2/berry-flavor/5/'}
move_battle_style_preferences    :     (3) [{…}, {…}, {…}]
name    :     "bold"
names    :     (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
pokeathlon_stat_changes    :     (2) [{…}, {…}]
*/

// ====================================================
// FUNCIONES DE VISUALIZACIÃ“N - POKÃ‰MON
// ====================================================

export
/**
 * Carga y visualiza PokÃ©mon de un nature local area
 */
async function natureDatos(typeUrl) {
    showSection("pokemon-section"); //muestra los datos de los pokemon
    console.log(typeUrl);
    const typeData = await fetch(typeUrl).then((r) => r.json());
    console.log('abilityData', typeData);
    const pokemonList = typeData.pokemon_encounters;
    console.log('pokemonListAbility', pokemonList);
    const grid = document.getElementById("pokemonGrid");
    grid.innerHTML = "";
    // Limitar a 50
    const limited = pokemonList.slice(0, 50);

    for (const species of limited) {
        //console.log("species", species);
        /* https://pokeapi.co/api/v2/pokemon/384/ pasa nombre correcto */
        //const pokemon = await fetchPokemon(species.pokemon_species.name); //[{} {}]
        const pokemon = await fetchPokemon(species.pokemon.name); //[{} {}] id "id": 413,
        if (pokemon) {
            createPokemonCard(pokemon, grid);
        }
    }
}