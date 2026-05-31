// URL EXACTA

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
let chartInstance = null;

// En tu archivo /js/main.js

// Importas la lógica de conexión a la PokéAPI
//import { buscarPokemon, obtenerDanio } from './api.js';

// Importas tus funciones de dibujo (badges, tablas, etc.)
//import { createPropertyBlock, createDefenseBlock, pintarPokemon } from './ui.js';

// Importas el nuevo módulo de cálculos que querías
import { dataTypes } from './js/api_type.js';
import { dataAbilities } from './js/api_ability.js';
import { dataStat } from './js/api_stat.js';
import { dataMove } from './js/api_move.js';
import { datosSpecies } from './js/pokemon_species.js';

async function loadList(url) {
    const res = await fetch(url);
    const data = await res.json();
    //console.log('pokemons', data)
    // Paginación

    document.getElementById('nextBtn').onclick = () => loadList(data.next);
    document.getElementById('prevBtn').onclick = () => loadList(data.previous);
    document.getElementById('nextBtn').disabled = !data.next;
    document.getElementById('prevBtn').disabled = !data.previous;


    const listDiv = document.getElementById('poke-list');
    listDiv.innerHTML = "";
    data.results.forEach(p => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerText = p.name;
        div.onclick = () => loadDetails(p.url);
        listDiv.appendChild(div);
    });
}


async function loadDetails(url) {
    const res = await fetch(url);
    const p = await res.json();
    //console.log('datos pokemon', p)
    document.getElementById('dashboard-view').style.display = 'block';
    document.getElementById('title').innerText = p.name.toUpperCase(); // Datos básicos


    document.getElementById('p-id').innerText = p.id;
    document.getElementById('p-height').innerText = p.height;
    document.getElementById('p-weight').innerText = p.weight;
    document.getElementById('p-exp').innerText = p.base_experience;
    document.getElementById('p-isdef').innerText = p.is_default;

    document.getElementById('p-larea').innerText = p.location_area_encounters;
    const locationareaencounters = p.location_area_encounters;

    location_area_encounter(p.location_area_encounters);
    document.getElementById('p-order').innerText = p.order;
    datosSpecies(p.species.url);

    // Mostrar Sprite (Imagen frontal)

    const imgsprites = document.getElementById('img-container');
    imgsprites.innerHTML = "";
    const imgUrl = [p.sprites.front_default];
    imgUrl.forEach(src => {
        if (src) imgsprites.innerHTML += `<img src="${src}" width="100">`;
    });


    // Mostrar Sprites (Imagen frontal, trasera, shiny, etc.)

    const sprites = document.getElementById('sprites-container');
    //back_default back_female back_shiny back_shiny_female  front_default front_female front_shiny front_shiny_female
    //posible funcionalidad a 4 opciones front  back  shiny y genero
    sprites.innerHTML = "";
    const imgUrls = [
        p.sprites.back_default, p.sprites.back_female, p.sprites.back_shiny, p.sprites.back_shiny_female,
        p.sprites.front_default, p.sprites.front_female, p.sprites.front_shiny, p.sprites.front_shiny_female
    ];
    imgUrls.forEach(src => {
        if (src) sprites.innerHTML += `<img src="${src}" width="100">`;
    });

    // Tipos
    document.getElementById('p-types').innerHTML = p.types.map(t => `<span class="badge" style="background:#ef4444">${t.type.name}</span>`).join(''); // Tipos
    /* pasamos los datos de los tipos */
    const promesastypes = p.types.map(t => {
        //tablaTipoDMG(t.type.name);
        dataTypes(t.type.url); // trabaja con el import
    });
    await Promise.all(promesastypes);
    cargarTablasPorTipo(p.types);

    // Habilidades
    document.getElementById('p-abilities').innerHTML = p.abilities.map(t => `<span class="badge" style="background:#ef4444">${t.ability.name}</span>`).join(''); // Tipos
    /* pasamos los datos de los tipos */
    const promesastypes2 = p.abilities.map(t => {
        dataAbilities(t.ability.url); // trabaja con el import
    });
    await Promise.all(promesastypes2);

    // Estadisticas
    //console.log('stats', p.stats[0].base_stat ,'', p.stats[0].stat.name);
    let totalstat = 0; //engañar al map
    const promesastypes3 = p.stats.map(s => {
        const sname = `p-${s.stat.name}`; // Genera 'p-hp', 'p-attack', etc.
        const elemento = document.getElementById(sname);
        if (elemento) {
            elemento.innerText = s.base_stat;
        }

        totalstat += s.base_stat;
        dataStat(s.stat.url); // trabaja con el import
    });
    // item del stat y datos
    document.getElementById(`p-Total`).innerHTML = totalstat;


    await Promise.all(promesastypes3);

    // Movimientos

    document.getElementById('p-moves').innerHTML = p.moves.map(m => `<span class="badge" style="background:#3b82f6; margin-bottom:5px; display:inline-block">${m.move.name}</span>`).join('');
    const alfa = dataMove();

    await Promise.all(alfa);
    // Índices

    document.getElementById('p-indices').innerHTML = p.game_indices.map(i => `<li>Versión: ${i.version.name} (ID: ${i.game_index})</li>`).join('');

    // JSON Completo

    document.getElementById('json-raw').innerText = JSON.stringify(p, null, 2);

    // Gráfico de Stats

    //p.stats.map(t => console.log(t.base_stat));
    //updateChart('stat', p.stats, p.stat.url);
    const charStat = p.stats;
    updateChart(charStat);
    updateChart2(charStat); /* funciona */


}






/* si falla es por la seguridad de la empresa */
function updateChart(stats) {
    // Si Chart no existe, esperamos 100ms y reintentamos
    if (typeof Chart === 'undefined') {
        setTimeout(() => updateChart(stats), 100);
        return;
    }

    const canvas = document.getElementById('statsChart');
    if (!canvas) return; // Seguridad por si el canvas no existe

    const ctx = canvas.getContext('2d');
    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: stats.map(s => s.stat.name.toUpperCase()),
            datasets: [{
                label: 'Base Stats',
                data: stats.map(s => s.base_stat),
                backgroundColor: 'rgba(239, 83, 80, 0.2)',
                borderColor: '#ef5350',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 150 // Opcional: para que todas las gráficas tengan la misma escala
                }
            }
        }
    });
}

/* si falla es por la seguridad de la empresa */
function updateChart2(stats) {
    const ctx = document.getElementById('statsChart2').getContext('2d');
    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: stats.map(s => s.stat.name.toUpperCase()),
            datasets: [{
                label: 'Base Stats',
                data: stats.map(s => s.base_stat),
                backgroundColor: 'rgba(239, 83, 80, 0.2)',
                borderColor: '#ef5350'
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true
                }
            }
        }
    });
}

//document.getElementById('p-larea').innerText = p.location_area_encounters;
/* location o area */
async function location_area_encounter(locationurl) {
    //revisar el fallo
    //console.log('local', locationurl);
    try {
        const response = await fetch(locationurl);
        const i = await response.json();
        //console.log('dataStat', i);//0,1,2,3,4

        const elementol = document.getElementById('p-location_area');

        // Entramos en 'increase' que es donde están Protein, Iron, etc.
        i.forEach(l => {
            //console.log('o', l.location_area);

            if (elementol) {
                // Usamos += para añadir el nombre sin borrar lo que ya había
                // Añadimos una coma si el elemento ya tiene texto
                if (elementol.innerText !== "") {
                    elementol.innerText += " locar area, " + l.location_area.name + " ";
                } else {
                    elementol.innerText = l.location_area.name;
                }

            }
            //console.log(`Stat: ${statName}, Item detectado: ${o.url}`);

        });
    } catch (error) {
        console.error("Error cargando imagen del item:", error);
    }


    /* local area dtos 
    
    region: name: "kanto"
*/
}

function areapokemonencounters() {
    console.log('pokemon_encounters');

    /* 
encounter_method_rates:
encounter_method: {name: 'old-rod', url: 'https://pokeapi.co/api/v2/encounter-method/2/'}
version_details: (4) [{…}, {…}, {…}, {…}]
encounter_method:{name: 'good-rod', url: 'https://pokeapi.co/api/v2/encounter-method/3/'}
version_details:(4) [{…}, {…}, {…}, {…}]
encounter_method: {name: 'super-rod', url: 'https://pokeapi.co/api/v2/encounter-method/4/'}
version_details:(4) [{…}, {…}, {…}, {…}]
encounter_method: {name: 'surf', url: 'https://pokeapi.co/api/v2/encounter-method/5/'}
version_details: (4) [{…}, {…}, {…}, {…}]
game_index: 98
id: 281
location: 
name: "cerulean-city"
url: "https://pokeapi.co/api/v2/location/68/"
name: "cerulean-city-area"
names: (3) [{…}, {…}, {…}]
pokemon_encounters
0
pokemon: {name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/'}
version_details: 
{pokemon: {…}, version_details: Array(5)}
1: 
pokemon: 
{name: 'psyduck', url: 'https://pokeapi.co/api/v2/pokemon/54/'}
version_details:Array(5)
0: 
encounter_details: (2) [{…}, {…}]
max_chance: 33
*/
}

/* typos poekmon */
/* tablas tipos */
// 🧩 Función para crear etiquetas de tipo
function createTypeBadge(type) {
    return `<span class="type ${type}">${type}</span>`;
}
// 🧱 Crear bloque de propiedades
function createPropertyBlock(title, categories) {
    return `
    <div class="block">
      <h3>${title}</h3>
      <div class="type-list"><b>Super efectivo (×2):</b> ${categories.super.map(createTypeBadge).join(' ') || 'Ninguno'}</div>
      <div class="type-list"><b>No muy efectivo (×½):</b> ${categories.not.map(createTypeBadge).join(' ') || 'Ninguno'}</div>
      <div class="type-list"><b>Sin efecto (×0):</b> ${categories.none.map(createTypeBadge).join(' ') || 'Ninguno'}</div>
    </div>
  `;
}
// 🧱 Crear bloque defensivo
function createDefenseBlock(categories) {
    return `
    <div class="block">
      <h3>Propiedades defensivas</h3>
      <div class="type-list"><b>Débil ante (×2):</b> ${categories.weak.map(createTypeBadge).join(' ') || 'Ninguno'}</div>
      <div class="type-list"><b>Resiste (×½):</b> ${categories.resist.map(createTypeBadge).join(' ') || 'Ninguno'}</div>
      <div class="type-list"><b>Inmune (×0):</b> ${categories.immune.map(createTypeBadge).join(' ') || 'Ninguno'}</div>
    </div>
  `;
}
// 🔍 Mostrar los tipos y sus botones

// Esta es la función que debes llamar pasándole el array "types" de la PokéAPI
async function cargarTablasPorTipo(pokemonTypes) {
    const sectionContainer = document.getElementById('results');
    sectionContainer.innerHTML = ''; // Limpiamos para que no se acumulen

    // Recorremos los tipos que vienen del primer map/fetch del Pokémon
    for (const t of pokemonTypes) {
        // t.type.url es la  URL donde están los damages
        const response = await fetch(t.type.url);
        const data = await response.json();
        const rel = data.damage_relations;

        // Preparamos los datos tal cual los esperan tus funciones createPropertyBlock y createDefenseBlock
        const offensive = {
            super: rel.double_damage_to.map(d => d.name),
            not: rel.half_damage_to.map(d => d.name),
            none: rel.no_damage_to.map(d => d.name)
        };
        const defensive = {
            weak: rel.double_damage_from.map(d => d.name),
            resist: rel.half_damage_from.map(d => d.name),
            immune: rel.no_damage_from.map(d => d.name)
        };
        const type = t.type.name;
        // Generamos el HTML usando TUS funciones originales
        const section = document.createElement('div');
        section.classList.add('type-section', 'active');
        section.innerHTML = `
      <h2>${type}</h2>
          ${createPropertyBlock('Propiedades ofensivas', offensive)}
      ${createDefenseBlock(defensive)}
    `;
        sectionContainer.appendChild(section);

    }

}



/* fin tabalas tipos */



loadList(BASE_URL);

/* Funcion busqueda */
const alfa = document.getElementById("searchBtn"); //.addEventListener("click", getPokemon);

alfa.onclick = getPokemon;
async function getPokemon() {

    const nameInput = document.getElementById("pokemonm").value.toLowerCase();

    const response = `https://pokeapi.co/api/v2/pokemon/${nameInput}`;
    nameInput.innerHTML = '';
    loadDetails(response);

}


async function pruebasurl() {
    //https://pokeapi.co/api/v2/location/68/
    //https://pokeapi.co/api/v2/location-area/281/
    console.log('ttps://pokeapi.co/api/v2/pokemon-species/');
    const url = 'https://pokeapi.co/api/v2/pokemon-species/1'
    console.log('pruebasurl', url);
    const resItem = await fetch(url);
    const dataAbility = await resItem.json();
    console.log('pruebas', dataAbility);
}
//'https://pokeapi.co/api/v2/location-area/281/'
pruebasurl()