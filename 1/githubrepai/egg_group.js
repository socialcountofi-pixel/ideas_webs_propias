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
 * CARACTERÍSTICAS PRINCIPALES:
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

const API_BASE = 'https://pokeapi.co/api/v2/';

// Almacenar datos en caché para mejorar rendimiento
const cache = {
    egg_group: null
};

// Gráficos
let chartTypes = null;
let chartStats = null;
let chartPokemonStats = null;

// ====================================================
// INICIALIZACIÓN
// ====================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Dashboard iniciado');

    // Cargar datos iniciales
    loadInitialData();

    // Event listeners
    setupEventListeners();
});

async function loadInitialData() {
    try {
        console.log('📊 Cargando datos iniciales...');

        // Cargar datos para los contadores
        const [egg_group] = await Promise.all([

            fetchEggGroup()
        ]);

        // Actualizar contadores
        updateStats(egg_group);

        // Cargar menús
        await loadMenus();

        // Cargar gráficos iniciales
        await loadInitialCharts();

    } catch (error) {
        console.error('❌ Error al cargar datos iniciales:', error);
    }
}

// ====================================================
// EVENT LISTENERS
// ====================================================

function setupEventListeners() {
    // Botones del menú toggle
    document.querySelectorAll('.menu-toggle').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const submenu = button.nextElementSibling;
            const isActive = submenu.classList.contains('active');

            // Cerrar otros submenús
            document.querySelectorAll('.submenu.active').forEach(m => {
                if (m !== submenu) {
                    m.classList.remove('active');
                    m.previousElementSibling.classList.remove('active');
                }
            });

            // Toggle actual
            submenu.classList.toggle('active');
            button.classList.toggle('active');
        });
    });

    // Enlaces de navegación superior
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            //console.log('menuderecho');
            //console.log('link.dataset.section', link);
            const section = link.dataset.section;
            showSection(section + '-section');
        });
    });

    // Búsqueda de Pokémon
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    searchBtn.addEventListener('click', () => searchPokemon());
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchPokemon();
    });

    // Modal close
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('modal').classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        const modal = document.getElementById('modal');
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

// ====================================================
// FUNCIONES DE NAVEGACIÓN
// ====================================================

function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar la sección seleccionada
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// ====================================================
// FUNCIONES DE FETCH - APIS
// ====================================================

/**
 * Obtiene todas las generaciones
 */
async function fetchEggGroup() {
    if (cache.egg_group) return cache.egg_group;
    try {
        const response = await fetch(`${API_BASE}/egg-group/?limit=100`);
        const data = await response.json();
        return data.count, data;
    } catch (error) {
        console.error('Error fetching egg group:', error);
        return 0;
    }
}


/**
 * Obtiene un Pokémon específico
 */

async function fetchPokemon(idOrName) {
    if (cache.pokemon[idOrName]) {
        return cache.pokemon[idOrName];
    }
    if (cache.pokemon[idOrName] == idOrName + '-gmax') {
        cache.pokemon[idOrName] = idOrName + '-gmax';
    }
    if (cache.pokemon[idOrName] == idOrName + '-alola') {
        cache.pokemon[idOrName] = idOrName + '-alola';
    }

    try {

        /* Para evirtar fallo cargan¡mos el id de la especir   */
        const responseS = await fetch(`${API_BASE}/pokemon-species/${idOrName}`);
        const dataS = await responseS.json();
        /* Pasamos el id de la especie i cargamos en nombre    */
        const responses = await fetch(`${API_BASE}/pokemon/${dataS.id}`);
        if (responses.ok) {
            const data = await responses.json();
            //console.log('dataS', dataS);
            return data;
            //  wormadam: "wormadam-plant"}
        }
        //console.error(`Error fetching pokemon ${idOrName} : `, error);
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
async function updateStats(pokemon, generations, types, abilities, regions, egg_group, pokemon_color, pokemon_habitat, pokemon_shape, pokedex, gender, evolution_trigger) {

    document.getElementById('totalEggGroup').textContent = egg_group.count;

}

/**
 * Carga los menús laterales
 */
async function loadMenus() {
    try {
        // Generaciones
        const generations = await fetchGenerations();
        const genMenu = document.getElementById('generationsMenu');

        generations.results.forEach(stat => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = stat.name;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showSection('generations-section');
                loadEggGroupPokemon(stat.url)
            });
            genMenu.appendChild(link);
        });



        //contabilizacionArray2(stats, statsMenu);
        //egg_goup
        const egggroup = await fetchEggGroup();
        const egggroupMenu = document.getElementById('egggroupMenu');
        contabilizacion(egggroup, egggroupMenu);


    } catch (error) {
        console.error('Error loading menus:', error);
    }
}

// ====================================================
// FUNCIONES CONTABILIZACIÓN - POKÉMON
// ====================================================

async function contabilizacion(params, paramsMenu) {
    //console.log('params ', params, 'paramsMenu ', paramsMenu, ' ');
    params.results.forEach(stat => {
        //console.log(' stat', stat);
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = stat.name;
        link.addEventListener('click', (e) => {
            //console.log(' e ', e);
            e.preventDefault();
            showSection('${params}-section');
            loadTodosPokemon(stat.url)
        });
        paramsMenu.appendChild(link);
    });
}


// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================

/**
 * Carga y visualiza Pokémon de un grupo huevo
 */
async function loadEggGroupPokemon(typeUrl) {
    showSection('pokemon-section'); //muestra los datos de los pokemon
    const typeData = await fetch(typeUrl).then(r => r.json());

    const pokemonList = typeData.pokemon_species;

    const grid = document.getElementById('pokemonGrid');
    grid.innerHTML = '';

    // Limitar a 50
    const limited = pokemonList.slice(0, 50);

    for (const species of limited) {
        const pokemon = await fetchPokemon(species.name); //[{} {}]

        if (pokemon) {
            createPokemonCard(pokemon, grid);
        }
    }
}



/* unificado para que solo sea necesario una funcion pues busan lo mismo */
async function loadTodosPokemon(typeUrl) {
    showSection('pokemon-section'); //muestra los datos de los pokemon
    const typeData = await fetch(typeUrl).then(r => r.json());
    const pokemonList = typeData.pokemon_species; //egg //color
    const grid = document.getElementById('pokemonGrid');
    grid.innerHTML = '';
    // Limitar a 50
    const limited = pokemonList.slice(0, 50);
    // revisar el fallo de los .slice con la cantidad
    for (const species of limited) {
        //const pokemon = await fetchPokemon(species.url.replace("-pspecies","")); //[{} {}]
        const pokemon = await fetchPokemon(species.name); //[{} {}]

        if (pokemon) {
            createPokemonCard(pokemon, grid);
        }
    }


}

/**
 * Crea una tarjeta de Pokémon
 */
function createPokemonCard(pokemon, container) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';

    const types = pokemon.types.map(t => t.type.name).join(', ');

    card.innerHTML = `
        <div class="pokemon-card-image">
            <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" 
                 alt="${pokemon.name}" onerror="this.src='https://via.placeholder.com/150'">
        </div>
        <div class="pokemon-card-content">
            <h4>#${pokemon.id} - ${pokemon.name}</h4>
            <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
            <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
            <div>
                ${pokemon.types.map(t => 
                    `<span class="type-badge ${t.type.name}">${t.type.name}</span>`
                ).join('')}
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => showPokemonDetail(pokemon));
    container.appendChild(card);
}

/**
 * Muestra los detalles completos de un Pokémon
 */
async function showPokemonDetail(pokemon) {
    showSection('pokemon-detail-section');
    
    // Información básica
    document.getElementById('pokemonDetailTitle').textContent = `${pokemon.name} (#${pokemon.id})`;
    document.getElementById('pokemonImage').src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    document.getElementById('pokemonName').textContent = pokemon.name;
    document.getElementById('pokemonId').textContent = `#${pokemon.id}`;
    
    // Tipos
    const types = pokemon.types.map(t => 
        `<span class="type-badge ${t.type.name}">${t.type.name}</span>`
    ).join(' ');
    document.getElementById('pokemonTypes').innerHTML = types;
    
    // Habilidades
    const abilities = pokemon.abilities.map(a => 
        `<span class="type-badge">${a.ability.name}</span>`
    ).join(' ');
    document.getElementById('pokemonAbilities').innerHTML = abilities;
    
    // Altura y peso
    document.getElementById('pokemonHeight').textContent = `${pokemon.height / 10} m`;
    document.getElementById('pokemonWeight').textContent = `${pokemon.weight / 10} kg`;
    
    // Gráfico de estadísticas
    createPokemonStatsChart(pokemon.stats);
    
    // Movimientos
    displayPokemonMoves(pokemon.moves.slice(0, 15)); // Mostrar solo 15 primeros
}

/**
 * Muestra los movimientos del Pokémon
 */
function displayPokemonMoves(moves) {
    const container = document.getElementById('movesTable');
    
    if (moves.length === 0) {
        container.innerHTML = '<p class="empty-state">Sin movimientos registrados</p>';
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
    
    moves.forEach(move => {
        const method = move.version_group_details[0]?.move_learn_method?.name || 'N/A';
        const generation = move.version_group_details[0]?.version_group?.name || 'N/A';
        
        html += `
            <tr>
                <td>${move.move.name}</td>
                <td>${method}</td>
                <td>${generation}</td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

/**
 * Busca un Pokémon específico
 */
async function searchPokemon() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (!query) {
        console.log('Por favor ingresa un Pokémon');
        return;
    }
    
    try {
        const pokemon = await fetchPokemon(query);
        if (pokemon) {
            showPokemonDetail(pokemon);
        } else {
            alert('Pokémon no encontrado');
        }
    } catch (error) {
        console.error('Error searching pokemon:', error);
        alert('Error al buscar el Pokémon');
    }
}

// ====================================================
// FUNCIONES DE GRÁFICOS
// ====================================================

/**
 * Carga los gráficos iniciales
 */
async function loadInitialCharts() {
    try {
        // Gráfico de tipos
        await createTypesDistributionChart();
        
        // Gráfico de estadísticas
        await createStatsAverageChart();
        
    } catch (error) {
        console.error('Error loading charts:', error);
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
function showEmpty(container, message = 'Sin datos disponibles') {
    container.innerHTML = `<div class="empty-state"><p>${message}</p></div>`;
}

console.log('✅ Dashboard JavaScript cargado correctamente');

async function apis(){
const API_BASE = 'https://pokeapi.co/api/v2/';
const API_FINAL= 'move';

console.log(API_BASE+API_FINAL);

const response =  await fetch(API_BASE+API_FINAL);
        const data =  await response.json();

    console.log(data);
    
    const response2 =  await fetch(API_BASE+API_FINAL+'/'+1);
        const data2 =  await response2.json();

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
evolution-chain:"https://pokeapi.co/api/v2/evolution-chain/"
evolution-trigger:"https://pokeapi.co/api/v2/evolution-trigger/"
growth-rate:"https://pokeapi.co/api/v2/growth-rate/"
item:"https://pokeapi.co/api/v2/item/"
item-attribute:"https://pokeapi.co/api/v2/item-attribute/"
item-category:"https://pokeapi.co/api/v2/item-category/"
item-fling-effect:"https://pokeapi.co/api/v2/item-fling-effect/"
item-pocket:"https://pokeapi.co/api/v2/item-pocket/"
language:"https://pokeapi.co/api/v2/language/"
location:"https://pokeapi.co/api/v2/location/"
location-area:"https://pokeapi.co/api/v2/location-area/"
machine:"https://pokeapi.co/api/v2/machine/"
move-ailment:"https://pokeapi.co/api/v2/move-ailment/"
move-battle-style:"https://pokeapi.co/api/v2/move-battle-style/"
move-category:"https://pokeapi.co/api/v2/move-category/"
move-damage-class:"https://pokeapi.co/api/v2/move-damage-class/"
move-learn-method:"https://pokeapi.co/api/v2/move-learn-method/"
move-target:"https://pokeapi.co/api/v2/move-target/"
nature:"https://pokeapi.co/api/v2/nature/"
pal-park-area:"https://pokeapi.co/api/v2/pal-park-area/"
pokeathlon-stat:"https://pokeapi.co/api/v2/pokeathlon-stat/"
pokemon:"https://pokeapi.co/api/v2/pokemon/"
pokemon-form:"https://pokeapi.co/api/v2/pokemon-form/"
pokemon-species:"https://pokeapi.co/api/v2/pokemon-species/"
super-contest-effect:"https://pokeapi.co/api/v2/super-contest-effect/"
version:"https://pokeapi.co/api/v2/version/"
version-group:"https://pokeapi.co/api/v2/version-group/"
  */
     console.log()

    }

    completados();
   async function completados(){
     document.getElementById('generationsMenu').style.backgroundColor ='rgba(255, 107, 107, 0.1)';
    document.getElementById('generationsMenu').style.backgroundColor ='rgba(255, 107, 107, 0.1)';
    document.getElementById('typesMenu').style.backgroundColor ='rgba(255, 107, 107, 0.1)';
    document.getElementById('habilidadesMenu').style.backgroundColor ='rgba(255, 107, 107, 0.1)';
    document.getElementById('pokemoncolorMenu').style.backgroundColor ='rgba(255, 107, 107, 0.1)';
    document.getElementById('genderMenu').style.backgroundColor ='rgba(255, 107, 107, 0.1)';
   document.getElementById('pokemonshapeMenu').style.backgroundColor ='rgba(255, 107, 107, 0.1)';
    document.getElementById('pokemonhabitatMenu').style.backgroundColor ='rgba(255, 107, 107, 0.1)';
   document.getElementById('egggroupMenu').style.backgroundColor ='rgba(255, 107, 107, 0.1)';
       document.getElementById('evolutiontriggerMenu').style.backgroundColor='rgba(255, 107, 107, 0.1)';
     document.getElementById('pokedexMenu').style.backgroundColor='rgba(255, 107, 107, 0.1)';
    /*
    document.getElementById('totalRegion').textContent = regions.count;

    */
}

//resultadosApis();
async function resultadosApis(){
const ara =[
"https://pokeapi.co/api/v2/berry/"
,"https://pokeapi.co/api/v2/berry-firmness/"
,"https://pokeapi.co/api/v2/berry-flavor/"
,"https://pokeapi.co/api/v2/characteristic/"
,"https://pokeapi.co/api/v2/contest-effect/"
,"https://pokeapi.co/api/v2/contest-type/"
,"https://pokeapi.co/api/v2/encounter-condition/"
,"https://pokeapi.co/api/v2/encounter-condition-value/"
,"https://pokeapi.co/api/v2/encounter-method/"
,"https://pokeapi.co/api/v2/evolution-chain/"
,"https://pokeapi.co/api/v2/evolution-trigger/"
,"https://pokeapi.co/api/v2/growth-rate/"
,"https://pokeapi.co/api/v2/item/"
,"https://pokeapi.co/api/v2/item-attribute/"
,"https://pokeapi.co/api/v2/item-category/"
,"https://pokeapi.co/api/v2/item-fling-effect/"
,"https://pokeapi.co/api/v2/item-pocket/"
,"https://pokeapi.co/api/v2/language/"
,"https://pokeapi.co/api/v2/location/"
,"https://pokeapi.co/api/v2/location-area/"
,"https://pokeapi.co/api/v2/machine/"
,"https://pokeapi.co/api/v2/move-ailment/"
,"https://pokeapi.co/api/v2/move-battle-style/"
,"https://pokeapi.co/api/v2/move-category/"
,"https://pokeapi.co/api/v2/move-damage-class/"
,"https://pokeapi.co/api/v2/move-learn-method/"
,"https://pokeapi.co/api/v2/move-target/"
,"https://pokeapi.co/api/v2/nature/"
,"https://pokeapi.co/api/v2/pal-park-area/"
,"https://pokeapi.co/api/v2/pokeathlon-stat/"
,"https://pokeapi.co/api/v2/pokemon/"
,"https://pokeapi.co/api/v2/pokemon-form/"
,"https://pokeapi.co/api/v2/pokemon-species/"
,"https://pokeapi.co/api/v2/super-contest-effect/"
,"https://pokeapi.co/api/v2/version/"
,"https://pokeapi.co/api/v2/version-group/"
]
    try {


        for (const species2 of ara) {
      
 const response = await fetch(species2);
        const data = await response.json();
        //console.log(data,' ', data.count)
    }

        for (const species of ara) {
      
 const response = await fetch(species+1);
        const data = await response.json();
        console.log(species,' ',data,' ', data.count)
    }


         
        
    } catch (error) {
        console.error('Error fetching types:', error);
        
    }
}

async function pendiente(){
    /*
https://pokeapi.co/api/v2/evolution-chain/    para la evoluciones de un pokemon 
 o para el mnu como contabilizador para el método de evoluction
https://pokeapi.co/api/v2/growth-rate/    pensarlo bien contabiliza los pokemon 
https://pokeapi.co/api/v2/pal-park-area/  que es y lista pokemon 
*/

}