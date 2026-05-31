import { API_BASE, cache } from '../config_apis/config_global.js'; // lo que levamos al script
import { showSection, fetchPokemon, createPokemonCard } from '../script.js'; // lo que traemos del script 
/// ====================================================
// FUNCIONES DE FETCH - APIS
// ====================================================

export
/**
 *  Obtiene todas los  regiones
 */
async function fetchRegions() {
    if (cache.region) return cache.region;

    try {
        const response = await fetch(`${API_BASE}/region/?limit=100`);
        const data = await response.json();
        cache.region = data.results;
        return (data.results);
    } catch (error) {
        console.error("Error fetching regions:", error);
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
async function loadMenusr() {
    // Regiones
    const regions = await fetchRegions();
    const regionsMenu = document.getElementById("regionsFilter");
    regionsMenu.style.width = "150px"; //tamaño tempora pues haba que ver como mejorarlo
    //console.log('regions', regions, 'regionsMenu', regionsMenu);
    regions.forEach((region) => {
        const option = document.createElement("option");
        option.href = "#";
        ((option.value = region.url), region.name); // cambia la , por + para saber que esta se ha pulsado
        option.textContent = region.name;
        regionsMenu.appendChild(option);
    });
    regionsMenu.addEventListener("change", (e) => {
        //console.log('ha pulsado ', e.target.value);
        const s = e.target.value;
        datosregion(s); //datos de la region
        //statmovesincredecre(s);//incremetas los movimientos
    });


    async function datosregion(s) {
        const abilitiesw = await fetch(s).then((r) => r.json());
        //console.log(s,"prueba", abilitiesw);
        /**importante coando increase y decrease si hay datos se muestre caso hp nada pero atake muestre los movimientos */
        /* filtro 2 */
        const regionDMenu = document.getElementById("Region_Location");
        regionDMenu.style.width = "150px";
        //tamaño tempora pues haba que ver como mejorarlo
        /* INCREASE */
        //console.log('abilitiesw', abilitiesw.locations);
        abilitiesw.locations.forEach((regionl) => { //console.log(regionl);
            //regionMenu.innerHTML += 'Movimiento Incrementa Stadist';
            //console.log('region', region);
            const option = document.createElement("option");
            option.href = "#";
            ((option.value = regionl.url), regionl.name); // cambia la , por + para saber que esta se ha pulsado
            option.textContent = regionl.name;
            regionDMenu.appendChild(option);
        });

        regionDMenu.addEventListener("change", (e) => {
            //console.log('ha pulsado ', e.target.value);
            const s = e.target.value;
            locationarea(s); //datos de la region
            //statmovesincredecre(s);//incremetas los movimientos
        });
        async function locationarea(s) {
            const abilitiesw = await fetch(s).then((r) => r.json());
            //console.log(s,"prueba", abilitiesw);
            /**importante coando increase y decrease si hay datos se muestre caso hp nada pero atake muestre los movimientos */
            /* filtro 2 */
            const regionDaMenu = document.getElementById("Region_Location_area");
            regionDaMenu.style.width = "150px";
            //tamaño tempora pues haba que ver como mejorarlo
            /* INCREASE */
            //console.log('abilitiesw', abilitiesw);
            abilitiesw.areas.forEach((regionla) => { //console.log(regionla);
                //regionMenu.innerHTML += 'Movimiento Incrementa Stadist';
                //console.log('regionla', regionla);
                const option = document.createElement("option");
                option.href = "#";
                ((option.value = regionla.url), regionla.name); // cambia la , por + para saber que esta se ha pulsado
                option.textContent = regionla.name;
                regionDaMenu.appendChild(option);
            });


            regionDaMenu.addEventListener("change", (e) => {
                //console.log('ha pulsado ', e.target.value);
                const s = e.target.value;
                //console.log(s);
                region_local_area(s);
            });

        }




    };
}

// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================

export
/**
 * Carga y visualiza Pokémon de un region local area
 */
async function region_local_area(typeUrl) {
    showSection("pokemon-section"); //muestra los datos de los pokemon
    //console.log(typeUrl);
    const typeData = await fetch(typeUrl).then((r) => r.json());
    //console.log('abilityData', typeData);
    const pokemonList = typeData.pokemon_encounters;
    //console.log('pokemonListAbility', pokemonList);
    const grid = document.getElementById("pokemonGrid");
    grid.innerHTML = "";
    // Limitar a 50
    const limited = pokemonList; //.slice(0, 50);

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

/**
 * Carga y visualiza datos de un region
 */
async function loadRegionPokemon(typeUrl) {
    showSection("pokemon-section"); //muestra los datos de los pokemon
    //console.log("typeUrl", typeUrl);
    const typeData = await fetch(typeUrl).then((r) => r.json());
    //console.log("typeData", typeData); //falla por que la vadena psas los datos pero no existen pokemon asi que se trabaja con la url de generacion ;
    const pokemonList = typeData.locations.map((p) => p.name); //[[{}][{}]]
    //console.log("pokemonList", pokemonList);
    const grid = document.getElementById("pokemonGrid");
    grid.innerHTML = "";

    // Limitar a 50
    const limited = pokemonList.slice(0, 50);

    for (const species of limited) {
        const pokemon = await fetchPokemon(species); // pasamos la url para comprobar
        //const pokemon = await fetchPokemon(species.name); // se pasa nombre comp,eto
        if (pokemon) {
            createPokemonCard(pokemon, grid);
        }
    }
}