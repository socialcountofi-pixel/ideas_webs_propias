import { API_BASE, cache } from '../config_apis/config_global.js'; // lo que levamos al script
import { showSection, fetchPokemon, createPokemonCard } from '../script.js'; // lo que traemos del script 

/// ====================================================
// FUNCIONES DE FETCH - APIS
// ====================================================

export
/**
 * Obtiene estad�sticas
 */
async function fetchStats() {
    if (cache.stat) return cache.stat;

    try {
        const response = await fetch(`${API_BASE}/stat/?limit=100`);
        const data = await response.json();
        cache.stat = data.results;
        return data.results;
    } catch (error) {
        console.error("Error fetching stats:", error);
        return [];
    }
}

// ====================================================
// FUNCIONES DE ACTUALIZACIÓN DE DATA
// ====================================================
const urln = '';

export
/**
 * Carga los menús laterales
 */
async function loadMenuss() {
    // Estadísticas
    const stats = await fetchStats();
    const statsMenu = document.getElementById("statsFilter");
    statsMenu.style.width = "150px"; //tamaño tempora pues haba que ver como mejorarlo
    //console.log('stats', stats, 'statsMenu', statsMenu);
    stats.forEach((stat) => {
        const option = document.createElement("option");
        option.href = "#";
        ((option.value = stat.url), stat.name); // cambia la , por + para saber que esta se ha pulsado
        option.textContent = stat.name;
        statsMenu.appendChild(option);
    });
    statsMenu.addEventListener("change", (e) => {
        //console.log('ha pulsado ', e.target.value);
        const s = e.target.value;
        statnaturesindecrease(s); //incrementenaturalesas
        statmovesincre(s); //incremetas los movimientos
        statmovesdecre(s);
    });


}

export
/* incrementa la naturaleza */
async function statnaturesindecrease(s) {
    const abilitiesw = await fetch(s).then((r) => r.json());
    //console.log("prueba", abilitiesw);
    /**importante coando increase y decrease si hay datos se muestre caso hp nada pero atake muestre los movimientos */
    /* filtro 2 */
    const statsMenu = document.getElementById("statsFilterIncreaseN");
    statsMenu.style.width = "150px";
    //tamaño tempora pues haba que ver como mejorarlo
    /* INCREASE */
    //console.log('abilitiesw', abilitiesw.affecting_natures);
    abilitiesw.affecting_natures.increase.forEach((stat) => {
        //statsMenu.innerHTML += 'Movimiento Incrementa Stadist';
        //console.log('stats', stat);
        const option = document.createElement("option");
        option.href = "#";
        ((option.value = stat.url), stat.name); // cambia la , por + para saber que esta se ha pulsado
        option.textContent = stat.name;
        statsMenu.appendChild(option);
    });

    statsMenu.addEventListener("change", (e) => {
        console.log('ha pulsado ', e.target.value);
        const s = e.target.value;
        statNdDtos(s); //nos trae datos de nature

    });
    /* DECREASE */
    const statsMenu2 = document.getElementById("statsFilterDecreaseN");
    statsMenu2.style.width = "150px";

    abilitiesw.affecting_natures.decrease.forEach((stat) => {
        // statsMenu2.textContent += 'Movimiento Decrementa Stadist';
        //console.log('stats', stat);
        const option = document.createElement("option");
        option.href = "#";
        ((option.value = stat.url), stat.name); // cambia la , por + para saber que esta se ha pulsado
        option.textContent = stat.name;
        statsMenu2.appendChild(option);
    });
    statsMenu2.addEventListener("change", (e) => {
        console.log('ha pulsado ', e.target.value);
        const s = e.target.value;
        statNdDtos(s); //nos trae datos de nature

    });
    document.getElementById("statsDetail").innerHTML = "";
    const datositemq = document.getElementById("statsDetail");
    //console.log(datositemq);
    abilitiesw.affecting_items.forEach((stat) => {
        // console.log('stat', stat.name);
        const datositem = document.createElement("a");
        //datositem.href = '#';
        ((datositem.value = stat.url), stat.name); // cambia la , por + para saber que esta se ha pulsado
        datositem.textContent =
            stat.name + " - " + " - " + abilitiesw.move_damage_class.name;
        //console.log(datositem);
        datositemq.appendChild(datositem);
    });
}

export
/**
 * Carga y los datos de la api nature en los datos de stats 
 * lo ideal seria que se haga un import y estos datos lo haga desde nature y se cargue los datos dede donde se carga
 */
async function statNdDtos(s) {
    const abilitiesw = await fetch(s).then((r) => r.json());
    console.log('s', s, "prueba", abilitiesw);
    /**importante coando increase y decrease si hay datos se muestre caso hp nada pero atake muestre los movimientos */
    /* filtro 2 */
    // funcionalidad por si trae un null  
    /**decreased_stat    :     {name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/'}
     */

    /* muesta los datos de la naturaleza */
    //document.getElementById("statsDetail").innerHTML = "";
    const datositemq = document.getElementById("statsDetail");
    console.log('datositemq', datositemq);

    const datositem = document.createElement("a");
    //datositem.href = '#';
    //((option.value = abilitiesw.name), abilitiesw.id); // cambia la , por + para saber que esta se ha pulsado
    datositem.textContent +=
        abilitiesw.name + " - " + " - " + abilitiesw.id + " - " + " odia berry sabor : " + abilitiesw.hates_flavor.name + " - " + " gusta beery sabor : " + abilitiesw.likes_flavor.name;
    //console.log(datositem);
    datositemq.appendChild(datositem);
}

export
/* incrementa los movimientos */
async function statmovesincre(s) {
    /* DECREASE */
    const abilitiesw = await fetch(s).then((r) => r.json());
    //console.log('prueba', abilitiesw);
    /**importante coando increase y decrease si hay datos se muestre caso hp nada pero atake muestre los movimientos */
    /* filtro 2 */
    const statsMenu = document.getElementById("statsFilterIncreaseM");
    statsMenu.style.width = "150px";
    //tamaño tempora pues haba que ver como mejorarlo
    //console.log('abilitiesw', abilitiesw);
    /* INCREASE */
    //console.log('abilitiesw', abilitiesw.affecting_moves.increase);
    abilitiesw.affecting_moves.increase.forEach((stat) => {
        //statsMenu.innerHTML += "Movimiento Incrementa Stadist";
        //console.log('stats', stat.move.name);
        const option = document.createElement("option");
        option.href = "#";
        ((option.value = stat.move.url), stat.move.name); // cambia la , por + para saber que esta se ha pulsado
        option.textContent = stat.move.name;
        statsMenu.appendChild(option);
    });
    statsMenu.addEventListener("change", (e) => {
        console.log('ha pulsado ', e.target.value);
        const s = e.target.value;
        statMdDtos(s) //incremetas los movimientos
    });

}

export
/* incrementa los movimientos */
async function statmovesdecre(s) {
    /* DECREASE */
    const abilitiesw = await fetch(s).then((r) => r.json());
    //console.log('prueba', abilitiesw);
    /**importante coando increase y decrease si hay datos se muestre caso hp nada pero atake muestre los movimientos */
    /* filtro 2 */
    const statsMenu2 = document.getElementById("statsFilterDecreaseM");
    statsMenu2.style.width = "150px";
    //console.log('statsMenu2', statsMenu2);
    abilitiesw.affecting_moves.decrease.forEach((stat) => {
        //statsMenu2.textContent += "Movimiento Decrementa Stadist";
        //console.log('stats', stat.move.url);

        const option = document.createElement("option");
        option.href = "#";
        ((option.value = stat.move.url) + stat.move.name); // cambia la , por + para saber que esta se ha pulsado
        option.textContent = stat.move.name;
        statsMenu2.appendChild(option);
    });
    statsMenu2.addEventListener("change", (e) => {
        console.log('ha pulsado ', e.target.value);
        const s = e.target.value;
        statMdDtos(s) //decrementa los movimientos
    });

    document.getElementById("statsDetail").innerHTML = "";
    const datositemq = document.getElementById("statsDetail");
    //console.log('datositemq', datositemq);
    abilitiesw.affecting_items.forEach((stat) => {
        //console.log('stat', stat.name);
        const datositem = document.createElement("a");
        //datositem.href = '#';
        ((datositem.value = stat.url), stat.name); // cambia la , por + para saber que esta se ha pulsado
        datositem.textContent = stat.name + "  ";
        //console.log(datositem);
        datositemq.appendChild(datositem);
    });
};

// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================

export
/**
 * Carga y visualiza Pokémon de un DECREASE o un INCREASE
 */
async function statMdDtos(typeUrl) {
    showSection("pokemon-section"); //muestra los datos de los pokemon
    //console.log('typeUrl', typeUrl);
    const typeData = await fetch(typeUrl).then((r) => r.json());
    //console.log('abilityData', typeData);
    const pokemonList = typeData.learned_by_pokemon;
    //console.log('pokemonListAbility', pokemonList);
    const grid = document.getElementById("pokemonGrid");
    grid.innerHTML = "";
    // Limitar a 50
    const limited = pokemonList.slice(0, 50);

    for (const species of limited) {
        console.log("species", species);
        /* https://pokeapi.co/api/v2/pokemon/384/ pasa nombre correcto */
        //const pokemon = await fetchPokemon(species.pokemon_species.name); //[{} {}]
        const pokemon = await fetchPokemon(species.name); //[{} {}] id "id": 413,
        if (pokemon) {
            createPokemonCard(pokemon, grid);
        }
    }
}