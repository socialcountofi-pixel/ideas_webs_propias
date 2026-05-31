/* GIT HUB DATOS DEL POKEMON  */

/**
 * ====================================================
 * POKÉMON DASHBOARD - JavaScript
 * ====================================================
 *
 * DESCRIPCIÓN:
 * Este script implementa un dashboard completo que integra
 * todas las APIs de PokéAPI para explorar datos de Pokémon.
 *
 * CARACTERÝSTICAS PRINCIPALES:
 * - Exploración de Generaciones, Tipos, Regiones, Habilidades
 * - Gráficas de estadísticas con Chart.js
 * - Búsqueda y filtrado de Pokémon
 * - Detalles completos de cada Pokémon
 * - Integración de todas las APIs de PokéAPI
 *
 * APIs UTILIZADAS:
 * - Pokemon: /pokemon/
 * - Generation: /generation/
 * - Type: /type/
 * - Ability: /ability/
 * - Region: /region/
 * - Stat: /stat/
 * - Item: /item/
 * - Move: /move/
 * - Berry: /berry/ // no se puede contabilizar los pokemons
 * - Regions: /regions/
 * - Egg_Group: /egg-group/
 * - Pokemon_Color: /pokemon-color/
 * - Pokemon_Habitat: /pokemon-habitat/
 * - Pokemon_Shape: /pokemon-shape/
 * - pokedex: /pokedex/
 * - Gender: /gender/
 * Y muchas más...
 *
 * ====================================================
 */

// ====================================================
// CONFIGURACIÓN GLOBAL
// ====================================================
import { API_BASE, cache } from './config_apis/config_global.js';
import { loadInitialCharts, createPokemonStatsChart } from './graficas/graficas.js';
//const API_BASE = "https://pokeapi.co/api/v2/";
//export const cache = {}

// ====================================================
// INICIALIZACIÓN
// ====================================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Dashboard iniciado");

    // Cargar datos iniciales
    loadInitialData();

    // Event listeners
    setupEventListeners();
});

async function loadInitialData() {
    try {
        console.log("📊 Cargando datos iniciales...");

        // Cargar datos para los contadores
        const [
            pokemon,
            generations,
            types,
            abilities,
            moves,
            egg_group,
            pokemon_color,
            pokemon_habitat,
            pokemon_shape,
            pokedex,
            gender,
            evolution_trigger, growth_rate, pal_park_area, pokemon_species, pokemon_form
        ] = await Promise.all([
            fetchPokemonCount(),
            fetchGenerations(),
            fetchTypes(),
            fetchAbilities(),
            fetchMoves(),
            fetchEggGroup(),
            fetchPokemonColor(),
            fetchPokemonHabitat(),
            fetchPokemonShape(),
            fetchPokedex(),
            fetchGender(),
            fetchEvolutioTrigger(),
            fetchGrowthRate(), fetchPalParkArea(), fetchPokemonSpecies(), fetchPokemonForm()
        ]);

        // Actualizar contadores
        updateStats(
            pokemon,
            generations,
            types,
            abilities,
            moves,
            egg_group,
            pokemon_color,
            pokemon_habitat,
            pokemon_shape,
            pokedex,
            gender,
            evolution_trigger, growth_rate, pal_park_area, pokemon_species, pokemon_form
        );

        // Cargar menús
        await loadMenus();

        // Cargar gráficos iniciales
        await loadInitialCharts();
    } catch (error) {
        console.error("❌ Error al cargar datos iniciales:", error);
    }
}

// ====================================================
// EVENT LISTENERS
// ====================================================

function setupEventListeners() {
    // Botones del menú toggle
    document.querySelectorAll(".menu-toggle").forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const submenu = button.nextElementSibling;
            const isActive = submenu.classList.contains("active");

            // Cerrar otros submenús
            document.querySelectorAll(".submenu.active").forEach((m) => {
                if (m !== submenu) {
                    m.classList.remove("active");
                    m.previousElementSibling.classList.remove("active");
                }
            });

            // Toggle actual
            submenu.classList.toggle("active");
            button.classList.toggle("active");
        });
    });

    // Enlaces de navegación superior
    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            //console.log('menuderecho');
            //console.log('link.dataset.section', link);
            const section = link.dataset.section;
            showSection(section + "-section");
        });
    });

    // Búsqueda de Pokémon
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");

    searchBtn.addEventListener("click", () => searchPokemon());
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") searchPokemon();
    });

    // Modal close
    document.querySelector(".close").addEventListener("click", () => {
        document.getElementById("modal").classList.remove("show");
    });

    window.addEventListener("click", (e) => {
        const modal = document.getElementById("modal");
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });
}

// ====================================================
// FUNCIONES DE NAVEGACIÓN
// ====================================================

export function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll(".section").forEach((section) => {
        section.classList.remove("active");
    });

    // Mostrar la sección seleccionada
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add("active");
        window.scrollTo(0, 0);
    }
}

// ====================================================
// FUNCIONES DE FETCH - APIS
// ====================================================

/**
 * Obtiene el total de Pokémon
 */

async function fetchPokemonCount() {
    try {
        const response = await fetch(`${API_BASE}/pokemon/?limit=1`);
        const data = await response.json();
        return data.count;
    } catch (error) {
        console.error("Error fetching pokemon count:", error);
        return 0;
    }
}

/**
 * Obtiene todas las generaciones
 */
import { fetchGenerations, loadMenusgn } from './apiscontabiliza/generation.js';

/**
 * Obtiene todos los tipos
 */
import { fetchTypes, loadMenust } from './apiscontabiliza/type.js';

/**
 * Obtiene todas las habilidades
 */
import { fetchAbilities, loadMenusa } from './apiscontabiliza/ability.js';

/**
 *  Obtiene todas los  estadísticas Pokemon 
 */
import { fetchMoves, loadMenusm } from './apiscontabiliza/move.js';

/**
 * Obtiene todas las grupos huevos
 */
import { fetchEggGroup, loadMenuseg } from './apiscontabiliza/egg_group.js';

/** Obtiene todas los  Pokemon Color
 * 
 */
import { fetchPokemonColor, loadMenuspc } from './apiscontabiliza/pokemon_color.js';

/**
 *  Obtiene todas los Pokemon Habitat
 */
import { fetchPokemonHabitat, loadMenusph } from './apiscontabiliza/pokemon_habitat.js';

/**
 *  Obtiene todas los  Pokemon Shape
 */
import { fetchPokemonShape, loadMenusps } from './apiscontabiliza/pokemon_shape.js';

/**
 *  Obtiene todas los  Pokedex 
 */
import { fetchPokedex, loadMenuspx } from './apiscontabiliza/pokedex.js';

/**
 *  Obtiene todas los  Gender
 */
import { fetchGender, loadMenusg } from './apiscontabiliza/gender.js';

/**
 *  Obtiene todas los  evolution trigger
 */
import { fetchEvolutioTrigger, loadMenuset } from './apiscontabiliza/evolution_trigger.js'; /*** Obtiene todas los  Evolution Trigers*/

/**
 *  Obtiene todas los growth-rate https://pokeapi.co/api/v2/growth-rate/    pensarlo bien contabiliza los pokemon 
 */

import { fetchGrowthRate, loadMenusgr } from './apiscontabiliza/growth_rate.js';
/*** Obtiene todas los  Evolution Trigers*/

/**
 *  Obtiene todas los  Pokemon pal_park_area
 */
import { fetchPalParkArea, loadMenusppa } from './apiscontabiliza/pal_park_area.js';

/**
 * Obtiene pokemon_species
 */
import { fetchPokemonSpecies, loadMenuspe, loadPokemonSpecies, loaddatosPokemonSpecies } from './apisfiltros/pokemon_species.js';
/**
 * Obtiene formas
 */
//import { fetchPokemonForm, loadMenuspf, pokemoformpokemon } from './//apisfiltros/pokemon_form.js';
//import { fetchPokemonFormF, loadMenuspf } from './apiscontabiliza/pokemon_form.js';
import { fetchPokemonForm, loadMenuspf, loadPokemonForm, loaddatosPokemonForm } from './apisfiltros/pokemon_form.js';




/**
 *  Obtiene todas los  estadísticas region Pokemon 
 */
import { fetchRegions, loadMenusr } from './apisfiltros/region.js';

/**
 * Obtiene estadísticas
 */
import { fetchStats, loadMenuss, statMdDtos, statNdDtos } from './apisfiltros/stat.js';

/**
 * Obtiene estadísticas
 */
import { fetchNatures, loadMenusn, natureDatos } from './apisfiltros/nature.js';

/**
 * Obtiene machines
 */
import { fetchMachines, loadMenusma, datosmachine } from './apisfiltros/machine.js';



/**
 * Obtiene un Pokémon específico
 */

export async function fetchPokemon(idOrName) {
    // 1. Miramos si ya lo tenemos en cache
    if (cache.pokemon[idOrName]) {
        return cache.pokemon[idOrName];
    }

    try {
        // 2. PEDIMOS EL POKEMON PRIMERO (Esto no falla con IDs 10000+ ni nombres con -alola)
        const response = await fetch(`${API_BASE}/pokemon/${idOrName}`);
        //console.log('response', response);
        if (!response.ok) {
            throw new Error(`No existe el pokemon: ${idOrName}`);
        }

        const data = await response.json();
        //console.log('data', data);
        // 3. (OPCIONAL) Si necesitas los datos de especie, los pides usando la URL que ya viene en el pokemon
        // No hace falta construirla a mano, la API te la da en data.species.url
        const resSpecies = await fetch(data.species.url);
        if (resSpecies.ok) {
            const dataS = await resSpecies.json();
            // Aquí puedes mezclar los datos si te hace falta algo de la especie
            data.speciesData = dataS;
        }

        // 4. Guardamos en cache y devolvemos los datos del pokemon
        cache.pokemon[idOrName] = data;
        return data;

    } catch (error) {
        console.error(`Error fetching pokemon ${idOrName}:`, error);
        return null;
    }
}


// ====================================================
// FUNCIONES DE ACTUALIZACIÓN DE DATA
// ====================================================

/**
 * Actualiza los contadores estadísticos
 */
async function updateStats(
    pokemon, generations, types, abilities, move, egg_group, pokemon_color, pokemon_habitat, pokemon_shape, pokedex, gender, evolution_trigger, growth_rate, pal_park_area, pokemon_species, pokemon_form
) {
    document.getElementById("totalPokemon").textContent = pokemon.toLocaleString();
    document.getElementById("totalGenerations").textContent = generations.count;
    document.getElementById("totalTypes").textContent = types; //cantidad al se array complejo [{}{}]
    document.getElementById("totalAbilities").textContent = abilities;
    document.getElementById("totalMove").textContent = move.count;
    document.getElementById("totalEggGroup").textContent = egg_group.count;
    document.getElementById("totalPokemonColor").textContent = pokemon_color.count;
    document.getElementById("totalPokemonHabitat").textContent = pokemon_habitat.count; //cantidad al se array simple {}
    document.getElementById("totalPokemonShape").textContent = pokemon_shape.count;
    document.getElementById("totalPokedex").textContent = pokedex.count;
    document.getElementById("totalGender").textContent = gender.count;
    document.getElementById("totalEvolutionTrigger").textContent = evolution_trigger.count;
    document.getElementById("totalGrowthRate").textContent = growth_rate.count;
    document.getElementById("totalPalParkArea").textContent = pal_park_area.count;
    document.getElementById("totalPokemonSpecies").textContent = pokemon_species.count;
    document.getElementById("totalPokemonForm").textContent = pokemon_form.count;
}

/**
 * Carga los menús laterales
 */
async function loadMenus() {
    try {
        // Generaciones
        loadMenusgn();
        // Tipos
        loadMenust();
        // Habilidades (mostrar solo algunas)
        loadMenusa();
        //egg_goup
        loadMenuseg();
        //pokemon_color 
        loadMenuspc();
        //pokemon_habitat
        loadMenusph();
        //pokemon_shape
        loadMenusps();
        //pokedex
        loadMenuspx();
        // gender
        loadMenusg();
        // trigger
        loadMenuset();
        // growh rate
        loadMenusgr();
        // pal park area
        loadMenusppa();
        // Movimientos
        loadMenusm();
        // Regiones 
        loadMenusr();
        // Estadísticas
        loadMenuss();
        //Nature affecting_natures
        loadMenusn();
        //machine 
        loadMenusma();


        //pokemon-form 
        loadMenuspf();
        //species
        loadMenuspe(); //se enlaza con evoluciones de la especie

    } catch (error) {
        console.error("Error loading menus:", error);
    }
}

// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================

/**
 * Crea una tarjeta de Pokémon
 */
export async function createPokemonCard(pokemon, container) {
    //console.log('card', pokemon, container)
    const card = document.createElement("div");
    card.className = "pokemon-card";

    const types = pokemon.types.map((t) => t.type.name).join(", ");

    card.innerHTML = `
        <div class="pokemon-card-image">
            <img src="${pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}" 
                 alt="${pokemon.name}" onerror="this.src='https://via.placeholder.com/150'">
        </div>
        <div class="pokemon-card-content">
            <h4>#${pokemon.id} - ${pokemon.name}</h4>
            <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
            <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
            <div>
                ${pokemon.types
            .map(
                (t) =>
                    `<span class="type-badge ${t.type.name}">${t.type.name}</span>`,
            )
            .join("")}
            </div>
        </div>
    `;

    card.addEventListener("click", () => showPokemonDetail(pokemon));
    container.appendChild(card);

   
    
}



 /* url de pokemon form preparar */
//console.log(pokemon.forms);
/*const typeDatas = await fetch("https://pokeapi.co/api/v2/pokemon/669/").then((r) => r.json());
typeDatas.forms.map((f)=>{
console.log(f)//    showPokemonDetail(f.name)
}).join(" ");
console.log('typeDatas',typeDatas);*/
/* fim url de pokemon form  */




/**
 * Muestra los detalles completos de un Pokémon
 */
async function showPokemonDetail(pokemon) {
    //console.log('showPokemonDetail', pokemon);
    showSection("pokemon-detail-section");

    // Información básica
    document.getElementById("pokemonDetailTitle").textContent =
        `${pokemon.name} (#${pokemon.id})`;
    document.getElementById("pokemonImage").src =
        pokemon.sprites.other["official-artwork"].front_default ||
        pokemon.sprites.front_default;
    document.getElementById("pokemonName").textContent = pokemon.name;
    document.getElementById("pokemonId").textContent = `#${pokemon.id}`;


    // Tipos
    const types = pokemon.types
        .map((t) => `<span class="type-badge ${t.type.name}">${t.type.name}</span>`)
        .join(" ");
    document.getElementById("pokemonTypes").innerHTML = types;

    // Habilidades
    const abilities = pokemon.abilities
        .map((a) => `<span class="type-badge">${a.ability.name}</span>`)
        .join(" ");
    document.getElementById("pokemonAbilities").innerHTML = abilities;

    // --- LA SOLUCIÓN PARA QUE FUNCIONE EL CLICK ---

    document.getElementById("pokemonAbilities").addEventListener("click", async (e) => {
        if (e.target.tagName === 'SPAN') {
            const nombreHabilidad = e.target.innerText.toLowerCase();

            try {
                const response = await fetch("https://pokeapi.co/api/v2/ability/" + nombreHabilidad);
                const data = await response.json();



                // Buscamos la efeccto de entrada sin usar el signo '?'  language
                let descripcionEntrada = "Descripción no encontrada";
                const entrada = data.effect_entries;

                if (entrada) {
                    for (let i = 0; i < entrada.length; i++) {
                        if (entrada[i].language.name === "en") {
                            descripcionEntrada = entrada[i].flavor_text;
                            break; // Ya lo encontramos, salimos del bucle
                        }
                    }
                }
                // Buscamos la descripción sin usar el signo '?'  language
                let descripcion = "Descripción no encontrada";
                const entradas = data.flavor_text_entries;

                if (entradas) {
                    for (let i = 0; i < entradas.length; i++) {
                        if (entradas[i].language.name === "ens") {
                            descripcion = entradas[i].flavor_text;
                            break; // Ya lo encontramos, salimos del bucle
                        }
                    }
                }


                // Buscamos el pokemon sin usar el signo '?'  language
                const pokemonab = data.pokemon
                    .map((t) => {
                        /* se puede añadir una clase o id i dar color a dicho texto segun si es oculta o no  */
                        if (t.is_hidden) {
                            return t.pokemon.name + ' : (oculta)'

                        } else {
                            return t.pokemon.name + ' : (natural)'
                        }
                    })
                    .join(" ");


                // Inyectamos el resultado
                document.getElementById("resultadoabilidades").innerHTML = `
        <div class="habilidad-data">

          <p><b>Efecto:</b> ${descripcion}</p><!--language-->
           <p><b>Efecto entrada:</b> ${descripcionEntrada}</p><!--language-->
         <p><b> id: </b> ${data.nide}</p>
<p><b>is_main_series:</b> ${data.is_main_series}</p>
<p><b>Habilidad name: </b> ${data.name}</p>
<p><b>generation name: </b> ${data.generation.name}</p>
 <p><b>Pokeon con esa abilidad:</b> ${pokemonab}</p><!--pokemons-->

        </div>
      `;

            } catch (error) {
                console.error("Hubo un problema:", error);
            }
        }
    });


    /* 
effect_changes: [{…}]
effect_entries: (3) [{…}, {…}, {…}]
 */



    // Altura y peso
    document.getElementById("pokemonHeight").textContent =
        `${pokemon.height / 10} m`;
    document.getElementById("pokemonWeight").textContent =
        `${pokemon.weight / 10} kg`;

        //console.log(pokemon);
  
        /*pokemonSpecies*/
      const pokemones = loaddatosPokemonSpecies(pokemon.species.url);
 //console.log('pokemonesespcies',pokemones);
 /*fin pokemon species */
 
/*pokemonFormas */
pokemon.forms
        .map((t) => loaddatosPokemonForm(t.url))
        ;
//const pokemoneformas = loaddatosPokemonForm(pokemon.forms);
//console.log('pokemonesformas',pokemon.forms);
/*fin pokeformas */


    /* Graficas de pokemon pesado (weight) */
    /* Graficas de pokemon alto (height) */

    // Gráfico de estadísticas
    createPokemonStatsChart(pokemon.stats);

    // Movimientos
    displayPokemonMoves(pokemon.moves.slice(0, 15)); // Mostrar solo 15 primeros


       
/*
    <div class="pokemon-card-content">
    <p><strong>base_happiness:</strong> ${pokemon.base_happiness} </p>
            <p><strong>capture_rate:</strong> ${pokemon.capture_rate} </p>
</div>*/
}


/* INICIO EVOLUCIONES*/

 import { loadMenuspev} from './apisfiltros/pokemon_evolution-chain.js';
/* FIN EVOLUCIONES*/

/**
 * Muestra los movimientos del Pokémon
 */
function displayPokemonMoves(moves) {
    const container = document.getElementById("movesTable");

    if (moves.length === 0) {
        container.innerHTML =
            '<p class="empty-state">Sin movimientos registrados</p>';
        return;
    }

    let html = `
        <table class="moves-table">
            <thead>
                <tr>
                    <th>Movimiento</th>
                    <th>Método de Aprendizaje</th>
                    <!--anadir un forma de visualizar solo metodos es decir huevos mto  genereacion y otro asi es mas didactico-->
                    <th>Generación</th>
                </tr>
            </thead>
            <tbody>
    `;

    moves.forEach((move) => {
        const method =
            move.version_group_details[0]?.move_learn_method?.name || "N/A";
        const generation =
            move.version_group_details[0]?.version_group?.name || "N/A";

        html += `
            <tr>
                <td>${move.move.name}</td>
                <td>${method}</td>
                <td>${generation}</td>
            </tr>
        `;
    });

    html += "</tbody></table>";
    container.innerHTML = html;
}

/**
 * Busca un Pokémon específico
 */
async function searchPokemon() {
    const query = document
        .getElementById("searchInput")
        .value.toLowerCase()
        .trim();

    if (!query) {
        console.log("Por favor ingresa un Pokémon");
        return;
    }

    try {
        const pokemon = await fetchPokemon(query);
        if (pokemon) {
            showPokemonDetail(pokemon);
        } else {
            alert("Pokémon no encontrado");
        }
    } catch (error) {
        console.error("Error searching pokemon:", error);
        alert("Error al buscar el Pokémon");
    }
}

// ====================================================
// FUNCIONES DE DETALLES DE OTRAS APIs
// ====================================================

// ====================================================
// UTILIDADES
// ====================================================

/**
 * Muestra notificación de carga
 */
function showLoading(container, show = true) {
    if (show) {
        container.innerHTML = '<div class="loading">Cargando datos...</div>';
    }
}

/**
 * Muestra mensaje de error
 */
function showError(container, message) {
    container.innerHTML = `<div class="error">${message}</div>`;
}

/**
 * Muestra estado vacío
 */
function showEmpty(container, message = "Sin datos disponibles") {
    container.innerHTML = `<div class="empty-state"><p>${message}</p></div>`;
}

console.log("✅ Dashboard JavaScript cargado correctamente");
//apis();
async function apis() {
    const API_BASE = "https://pokeapi.co/api/v2/";
    const API_FINAL = "item";// "evolution-chain";
//machine => item
    console.log(API_BASE + API_FINAL);

    const response = await fetch(API_BASE + API_FINAL);
    const data = await response.json();

    console.log(data);

    const response2 = await fetch(API_BASE + API_FINAL + "/" + 306);
    const data2 = await response2.json();

    console.log(data2);

    /*
  crear ficher para cada api
  crear un iport para cada fichero
  pensar mejor como cargar los datos en el pokemon principal
  
   */
    /* // APIS QUE SE PUEDEN CONTABILIZAR DATOS CON POKEMON 
  
  */

    /*
  --  
  berry:"https://pokeapi.co/api/v2/berry/"
  berry-firmness:"https://pokeapi.co/api/v2/berry-firmness/"
  berry-flavor:"https://pokeapi.co/api/v2/berry-flavor/"
  characteristic:"https://pokeapi.co/api/v2/characteristic/"
  contest-effect:"https://pokeapi.co/api/v2/contest-effect/"
  contest-type:"https://pokeapi.co/api/v2/contest-type/"
  encounter-condition:"https://pokeapi.co/api/v2/encounter-condition/"
  encounter-condition-value:"https://pokeapi.co/api/v2/encounter-condition-value/"
  encounter-method:"https://pokeapi.co/api/v2/encounter-method/"
  item:"https://pokeapi.co/api/v2/item/"
  item-attribute:"https://pokeapi.co/api/v2/item-attribute/"
  item-category:"https://pokeapi.co/api/v2/item-category/"
  item-fling-effect:"https://pokeapi.co/api/v2/item-fling-effect/"
  item-pocket:"https://pokeapi.co/api/v2/item-pocket/"
  language:"https://pokeapi.co/api/v2/language/"
  region :=>  location:"https://pokeapi.co/api/v2/location/" ,=>  location-area:"https://pokeapi.co/api/v2/location-area/"
  machine:"https://pokeapi.co/api/v2/machine/"
  move-ailment:"https://pokeapi.co/api/v2/move-ailment/"
  move-battle-style:"https://pokeapi.co/api/v2/move-battle-style/"
  move-category:"https://pokeapi.co/api/v2/move-category/"
  move-damage-class:"https://pokeapi.co/api/v2/move-damage-class/"
  move-learn-method:"https://pokeapi.co/api/v2/move-learn-method/"
  move-target:"https://pokeapi.co/api/v2/move-target/"
  nature:"https://pokeapi.co/api/v2/nature/"
  pokeathlon-stat:"https://pokeapi.co/api/v2/pokeathlon-stat/"
  pokemon:"https://pokeapi.co/api/v2/pokemon/"
  pokemon-form:"https://pokeapi.co/api/v2/pokemon-form/"
  super-contest-effect:"https://pokeapi.co/api/v2/super-contest-effect/"
  version:"https://pokeapi.co/api/v2/version/"
  version-group:"https://pokeapi.co/api/v2/version-group/"
    */
    console.log();
}

completados();
async function completados() {
    document.getElementById("generationsMenu").style.backgroundColor = "rgba(255, 107, 107, 0.1)";
    document.getElementById("typesMenu").style.backgroundColor = "rgba(255, 107, 107, 0.1)";
    document.getElementById("habilidadesMenu").style.backgroundColor = "rgba(255, 107, 107, 0.1)";
    document.getElementById("pokemoncolorMenu").style.backgroundColor = "rgba(255, 107, 107, 0.1)";
    document.getElementById("genderMenu").style.backgroundColor = "rgba(255, 107, 107, 0.1)";
    document.getElementById("pokemonshapeMenu").style.backgroundColor = "rgba(255, 107, 107, 0.1)";
    document.getElementById("pokemonhabitatMenu").style.backgroundColor = "rgba(255, 107, 107, 0.1)";
    document.getElementById("egggroupMenu").style.backgroundColor = "rgba(255, 107, 107, 0.1)";
    document.getElementById("evolutiontriggerMenu").style.backgroundColor = "rgba(255, 107, 107, 0.1)";
    document.getElementById("pokedexMenu").style.backgroundColor = "rgba(255, 107, 107, 0.1)";
    document.getElementById("growthrateMenu").style.backgroundColor = "rgba(255, 107, 107, 0.1)";
    document.getElementById("movesMenu").style.backgroundColor = "rgba(255, 107, 107, 0.1)";
    document.getElementById("palparkareaMenu").style.backgroundColor = "rgba(255, 107, 107, 0.1)";
    document.getElementById("pokemonspeciesMenu").style.backgroundColor = "rgba(255, 107, 107, 0.1)";
    document.getElementById("pokemonformMenu").style.backgroundColor = "rgba(255, 107, 107, 0.1)";
}

import { resultadosApis } from './CountDataApis.js';
/* muestra lso resultados de las api */
//resultadosApis();


 // pruebasconsoledata(2) ;

async function pruebasconsoledata() {
    const API_BASE = "https://pokeapi.co/api/v2/";
    const API_FINAL = "pokemon-form";// "evolution-chain";
//machine => item
//"https://pokeapi.co/api/v2/machine/",
    console.log(API_BASE , API_FINAL);

    const response = await fetch(API_BASE + API_FINAL);
    const data = await response.json();

    console.log(API_FINAL,' 1 ' ,data);

    const response2 = await fetch(API_BASE + API_FINAL + "/" + 3);
    const data2 = await response2.json();

    console.log(API_FINAL,' 2 ',data2);

}