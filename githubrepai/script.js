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
    pokemon: {},
    /* type: "https://pokeapi.co/api/v2/type/" */
    types: null,
    /* ability:"https://pokeapi.co/api/v2/ability/" */
    abilities: null,
    /* move:"https://pokeapi.co/api/v2/move/" */
    moves: null,
    /* stat:"https://pokeapi.co/api/v2/stat/" */
    stats: null,
    /* generation:"https://pokeapi.co/api/v2/generation/" */
    generations: null,
    /* region:"https://pokeapi.co/api/v2/region/" */
    regions: null,
    /* egg-group: "https://pokeapi.co/api/v2/egg-group/" */
    egg_group: null,
    /* pokemon-color: "https://pokeapi.co/api/v2/pokemon-color/" */
    pokemon_color: null,
    /* pokemon-habitat: "https://pokeapi.co/api/v2/pokemon-habitat/" */
    pokemon_habitat: null,
    /* pokemon-shape: "https://pokeapi.co/api/v2/pokemon-shape/" */
    pokemon_shape: null,
    /* pokedex: "https://pokeapi.co/api/v2/pokedex/" */
    pokedex: null,
    /* gender: "https://pokeapi.co/api/v2/gender/" */
    gender: null,
    /* evolution-trigger: "https://pokeapi.co/api/v2/evolution-trigger/" */
    evolution_trigger: null
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
        const [pokemon, generations, types, abilities, regions, egg_group, pokemon_color, pokemon_habitat, pokemon_shape, pokedex, gender, evolution_trigger] = await Promise.all([
            fetchPokemonCount(), fetchGenerations(), fetchTypes(),
            fetchAbilities(), fetchRegions(),
            fetchEggGroup(), fetchPokemonColor(), fetchPokemonHabitat(), fetchPokemonShape(), fetchPokedex(), fetchGender(), fetchEvolutioTtrigger()

        ]);

        // Actualizar contadores
        updateStats(pokemon, generations, types, abilities, regions, egg_group, pokemon_color, pokemon_habitat, pokemon_shape, pokedex, gender, evolution_trigger);

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
 * Obtiene el total de Pokémon
 */
async function fetchPokemonCount() {
    try {
        const response = await fetch(`${API_BASE}/pokemon/?limit=1`);
        const data = await response.json();
        return data.count;
    } catch (error) {
        console.error('Error fetching pokemon count:', error);
        return 0;
    }
}

/**
 * Obtiene todas las generaciones
 */
async function fetchGenerations() {
    if (cache.generations) return cache.generations;

    try {
        const response = await fetch(`${API_BASE}/generation/?limit=100`);
        const data = await response.json();
        return data.count, data;
    } catch (error) {
        console.error('Error fetching generations:', error);
        return 0;
    }
}

/**
 * Obtiene todos los tipos
 */
async function fetchTypes() {
    if (cache.types) return cache.types;

    try {
        const response = await fetch(`${API_BASE}/type/?limit=100`);
        const data = await response.json();
        cache.types = data.results;
        return data.count;
    } catch (error) {
        console.error('Error fetching types:', error);
        return 0;
    }
}

/**
 * Obtiene todas las habilidades
 */
async function fetchAbilities() {
    if (cache.abilities) return cache.abilities;

    try {
        const response = await fetch(`${API_BASE}/ability/?limit=1`);
        const data = await response.json();
        return data.count;
    } catch (error) {
        console.error('Error fetching abilities:', error);
        return 0;
    }
}

/*** Obtiene todas los  regiones*/
async function fetchRegions() {
    if (cache.regions) return cache.regions;

    try {
        const response = await fetch(`${API_BASE}/region/?limit=100`);
        const data = await response.json();
        cache.regions = data.results;
        return data.count, data;
    } catch (error) {
        console.error('Error fetching regions:', error);
        return 0;
    }
}

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

/*** Obtiene todas los  Pokemon Color*/
async function fetchPokemonColor() {
    if (cache.pokemon_color) return cache.pokemon_color;
    try {
        const response = await
        fetch(`${API_BASE}/pokemon-color/?limit=100`);
        const data = await response.json();
        return data.count, data;
    } catch (error) {
        console.error('Error fetching pokemon-color:', error);
        return 0;
    }
}
/*** Obtiene todas los Pokemon Habitat*/
async function fetchPokemonHabitat() {
    if (cache.pokemon_habitat) return cache.pokemon_habitat;
    try {
        const response = await fetch(`${API_BASE}/pokemon-habitat/?limit=100`);
        const data = await response.json();
        return data.count, data;
    } catch (error) { console.error('Error fetching pokemon-habitat:', error); return 0; }
}
/*** Obtiene todas los  Pokemon Shape*/
async function fetchPokemonShape() {
    if (cache.pokemon_shape) return cache.pokemon_shape;
    try {
        const responseS = await fetch(`${API_BASE}/pokemon-shape/?limit=20`);
        const datas = await responseS.json();
        return datas.count, datas;
    } catch (error) { console.error('Error fetching  pokemon-shape:', error); return 0; }

}
/*** Obtiene todas los Pokedex*/
async function fetchPokedex() {
    if (cache.pokedex) return cache.pokedex;
    try {
        const response = await fetch(`${API_BASE}/pokedex/?limit=100`);
        const data = await response.json();
        return data.count, data;
    } catch (error) { console.error('Error fetching pokedex:', error); return 0; }
}
/*** Obtiene todas los  Gender*/
async function fetchGender() {
    if (cache.gender) return cache.gender;
    try {
        const response = await fetch(`${API_BASE}/gender/?limit=100`);
        const data = await response.json();
        return data.count, data;
    } catch (error) { console.error('Error fetching gender:', error); return 0; }
} /*** Obtiene todas los  Evolution Trigers*/
async function fetchEvolutioTtrigger() {
    if (cache.evolution_trigger) return cache.evolution_trigger;
    try {
        const response = await fetch(`${API_BASE}/evolution-trigger/?limit=100`);
        const data = await response.json();
        return data.count, data;
    } catch (error) { console.error('Error fetching evolution trigger:', error); return 0; }

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


/**
 * Obtiene Pokémon de una generación específica
 */
async function fetchGenerationPokemon(idOrName) {
    try {
        const response = await fetch(`${API_BASE}/generation/${idOrName}`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(`Error fetching generation pokemon:`, error);
        return [];
    }
}

/**
 * Obtiene Pokémon de un tipo específico
 */
async function fetchTypePokemon(typeId) {
    try {
        const response = await fetch(`${API_BASE}/type/${typeId}`);
        const data = await response.json();
        return data.pokemon.map(p => p.pokemon);
    } catch (error) {
        console.error(`Error fetching type pokemon:`, error);
        return [];
    }
}



/**
 * Obtiene movimientos
 */
async function fetchMoves(limit = 50) {
    if (cache.moves) return cache.moves;

    try {
        const response = await fetch(`${API_BASE}/move/?limit=${limit}`);
        const data = await response.json();
        cache.moves = data.results;
        return data.results;
    } catch (error) {
        console.error('Error fetching moves:', error);
        return [];
    }
}


/**
 * Obtiene estadísticas
 */
async function fetchStats() {
    if (cache.stats) return cache.stats;

    try {
        const response = await fetch(`${API_BASE}/stat/?limit=100`);
        const data = await response.json();
        cache.stats = data.results;
        return data.results;
    } catch (error) {
        console.error('Error fetching stats:', error);
        return [];
    }
}



// ====================================================
// FUNCIONES DE ACTUALIZACIÓN DE DATA
// ====================================================

/**
 * Actualiza los contadores estadísticos
 */
async function updateStats(pokemon, generations, types, abilities, regions, egg_group, pokemon_color, pokemon_habitat, pokemon_shape, pokedex, gender, evolution_trigger) {
    document.getElementById('totalPokemon').textContent = pokemon.toLocaleString();
    document.getElementById('totalGenerations').textContent = generations.count;
    document.getElementById('totalTypes').textContent = types; //cantidad al se array complejo [{}{}]
    document.getElementById('totalAbilities').textContent = abilities;
    document.getElementById('totalRegion').textContent = regions.count;
    document.getElementById('totalEggGroup').textContent = egg_group.count;
    document.getElementById('totalPokemonColor').textContent = pokemon_color.count;
    document.getElementById('totalPokemonHabitat').textContent = pokemon_habitat.count; //cantidad al se array simple {}
    document.getElementById('totalPokemonShape').textContent = pokemon_shape.count;
    document.getElementById('totalPokedex').textContent = pokedex.count;
    document.getElementById('totalGender').textContent = gender.count;
    document.getElementById('totalEvolutionTrigger').textContent = evolution_trigger.count;
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

        // Tipos
        const types = await fetchTypes();
        const typesMenu = document.getElementById('typesMenu');
        types.forEach(tipo => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = tipo.name;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                loadTypePokemon(tipo.url);
            });
            typesMenu.appendChild(link);
        });
        // Regiones
        const regions = await fetchRegions();
        console.log('fallo a revisar ');
        const regionsMenu = document.getElementById('regionsMenu');
        regions.forEach(stat => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = stat.name;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showSection('regions-section');
                loadRegionPokemon(stat.url)
            });
            regionsMenu.appendChild(link);
        });


        // Habilidades (mostrar solo algunas)
        const abilities = await fetch(`${API_BASE}/ability/?limit=10`).then(r => r.json());
        const habilMenu = document.getElementById('habilidadesMenu');
        abilities.results.forEach(ability => {

            const link = document.createElement('a');
            link.href = '#';
            link.textContent = ability.name;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showSection('ability-section');
                loadAbility(ability.url)
            });
            habilMenu.appendChild(link);
        });

        // Estadísticas
        const stats = await fetchStats();
        const statsMenu = document.getElementById('statsFilter');
        statsMenu.style.width = '150px'; //tamaño tempora pues haba que ver como mejorarlo
        //console.log('stats', stats, 'statsMenu', statsMenu);
        stats.forEach(stat => {
            const option = document.createElement('option');
            option.href = '#';
            option.value = stat.url, stat.name; // cambia la , por + para saber que esta se ha pulsado 
            option.textContent = stat.name;
            statsMenu.appendChild(option);
        });
        statsMenu.addEventListener('change', (e) => {
            //console.log('ha pulsado ', e.target.value);
            const s = e.target.value;
            statnaturesindecrease(s); //incrementenaturalesas 
            //statmovesincredecre(s);//incremetas los movimientos
        });
        async function statnaturesindecrease(s) {
            const abilitiesw = await fetch(s).then(r => r.json());
            console.log('prueba', abilitiesw);
            /**importante coando increase y decrease si hay datos se muestre caso hp nada pero atake muestre los movimientos */
            /* filtro 2 */
            const statsMenu = document.getElementById('statsFilterIncrease');
            statsMenu.style.width = '150px';
            //tamaño tempora pues haba que ver como mejorarlo
            /* INCREASE */
            //console.log('abilitiesw', abilitiesw.affecting_natures);
            abilitiesw.affecting_natures.increase.forEach(stat => {
                //statsMenu.innerHTML += 'Movimiento Incrementa Stadist';
                //console.log('stats', stat);
                const option = document.createElement('option');
                option.href = '#';
                option.value = stat.name; // cambia la , por + para saber que esta se ha pulsado 
                option.textContent = stat.name;
                statsMenu.appendChild(option);
            });
            /* DECREASE */
            const statsMenu2 = document.getElementById('statsFilterDecrease');
            statsMenu2.style.width = '150px';

            abilitiesw.affecting_natures.decrease.forEach(stat => {
                // statsMenu2.textContent += 'Movimiento Decrementa Stadist';
                //console.log('stats', stat);
                const option = document.createElement('option');
                option.href = '#';
                option.value = stat.name; // cambia la , por + para saber que esta se ha pulsado 
                option.textContent = stat.name;
                statsMenu2.appendChild(option);
            });


            document.getElementById('statsDetail').innerHTML = '';
            const datositemq = document.getElementById('statsDetail');
            console.log(datositemq);
            abilitiesw.affecting_items.forEach(stat => {
                // console.log('stat', stat.name);
                const datositem = document.createElement('a');
                //datositem.href = '#';
                datositem.value = stat.url, stat.name; // cambia la , por + para saber que esta se ha pulsado 
                datositem.textContent = stat.name + '  ' + ' ' + abilitiesw.move_damage_class.name;
                //console.log(datositem);
                datositemq.appendChild(datositem);
            });
        }
        async function statmovesincredecre(s) {
            const abilitiesw = await fetch(s).then(r => r.json());
            //console.log('prueba', abilitiesw);
            /**importante coando increase y decrease si hay datos se muestre caso hp nada pero atake muestre los movimientos */
            /* filtro 2 */
            const statsMenu = document.getElementById('statsFilterIncrease');
            statsMenu.style.width = '150px';
            //tamaño tempora pues haba que ver como mejorarlo
            //console.log('stats', stats, 'statsMenu', statsMenu);
            //console.log('abilitiesw', abilitiesw);
            /* INCREASE */
            //console.log('abilitiesw', abilitiesw.affecting_moves.increase);
            abilitiesw.affecting_moves.increase.forEach(stat => {
                statsMenu.innerHTML += 'Movimiento Incrementa Stadist';
                //console.log('stats', stat.move.name);
                const option = document.createElement('option');
                option.href = '#';
                option.value = stat.move.url, stat.move.name; // cambia la , por + para saber que esta se ha pulsado 
                option.textContent = stat.move.name;
                statsMenu.appendChild(option);
            });
            /* DECREASE */
            const statsMenu2 = document.getElementById('statsFilterDecrease');
            statsMenu2.style.width = '150px';

            abilitiesw.affecting_moves.decrease.forEach(stat => {
                statsMenu2.textContent += 'Movimiento Decrementa Stadist';
                //console.log('stats', stat.move.url);
                const option = document.createElement('option');
                option.href = '#';
                option.value = stat.move.url, stat.move.name; // cambia la , por + para saber que esta se ha pulsado 
                option.textContent = stat.move.name;
                statsMenu2.appendChild(option);
            });


            document.getElementById('statsDetail').innerHTML = '';
            const datositemq = document.getElementById('statsDetail');
            console.log(datositemq);
            abilitiesw.affecting_items.forEach(stat => {
                // console.log('stat', stat.name);
                const datositem = document.createElement('a');
                //datositem.href = '#';
                datositem.value = stat.url, stat.name; // cambia la , por + para saber que esta se ha pulsado 
                datositem.textContent = stat.name + '  ';
                //console.log(datositem);
                datositemq.appendChild(datositem);
            });

        }

        //affecting_natures



        //contabilizacionArray2(stats, statsMenu);
        //egg_goup
        const egggroup = await fetchEggGroup();
        const egggroupMenu = document.getElementById('egggroupMenu');
        contabilizacion(egggroup, egggroupMenu);
        //pokemon_color
        const pokemoncolor = await fetchPokemonColor();
        const pokemoncolorMenu = document.getElementById('pokemoncolorMenu');
        contabilizacion(pokemoncolor, pokemoncolorMenu);
        //pokemon_habitat
        const pokemonhabitat = await fetchPokemonHabitat();
        const pokemonhabitatMenu = document.getElementById('pokemonhabitatMenu');
        contabilizacion(pokemonhabitat, pokemonhabitatMenu);
        //pokemon_shape
        const pokemonshape = await fetchPokemonShape(); // trae el valor count
        const pokemonshapeMenu = document.getElementById('pokemonshapeMenu');
        contabilizacion(pokemonshape, pokemonshapeMenu);
        //pokedex
        const pokedex = await fetchPokedex();
        const pokedexMenu = document.getElementById('pokedexMenu');
        pokedex.results.forEach(stat => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = stat.name;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showSection('pokedex-section');
                loadPokedexPokemon(stat.url);
            });
            pokedexMenu.appendChild(link);
        });

        //contabilizacion(pokedex, pokedexMenu);


        // gender
        const gender = await fetchGender();
        const genderMenu = document.getElementById('genderMenu');
        /* para que al pasa se use el typo de datos typeData.required_for_evolution; que es especico de esta api */
        gender.results.forEach(stat => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = stat.name;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showSection('gender-section');
                loadGenderPokemon(stat.url);
            });
            genderMenu.appendChild(link);

        });

        // trigger
        const evolutiontrigger = await fetchEvolutioTtrigger();
        const evolutiontriggerMenu = document.getElementById('evolutiontriggerMenu');
        /* para que al pasa se use el typo de datos typeData.evolutiontrigger; que es especico de esta api */
        //console.log('params ', evolutiontrigger, 'paramsMenu ', evolutiontriggerMenu, ' ');
        evolutiontrigger.results.forEach(stat => {
            //console.log(' stat', stat);
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = stat.name;
            link.addEventListener('click', (e) => {
                //console.log(' e ', e);
                e.preventDefault();
                showSection('evolutiontrigger-section');
                loadTodosPokemon(stat.url)
            });
            evolutiontriggerMenu.appendChild(link);
        });

        // Movimientos
        const moves = await fetchMoves();
        const movesMenu = document.getElementById('movimientosMenu');
        moves.slice(0, 10).forEach(move => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = move.name;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showMoveDetails(move.url);
            });
            movesMenu.appendChild(link);
        });




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

async function contabilizacionArray2(params, paramsMenu) {
    params.forEach(stat => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = stat.name;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadTypePokemon(tipo.url);
        });
        paramsMenu.appendChild(link);
    });

}

// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================

/**
 * Carga y visualiza Pokémon de un abilidades
 */
async function loadAbility(typeUrl) {
    showSection('pokemon-section'); //muestra los datos de los pokemon
    //console.log(typeUrl);
    const typeData = await fetch(typeUrl).then(r => r.json());
    //console.log('abilityData', typeData);
    const pokemonList = typeData.pokemon;
    //console.log('pokemonListAbility', pokemonList);
    const grid = document.getElementById('pokemonGrid');
    grid.innerHTML = '';
    // Limitar a 50
    const limited = pokemonList.slice(0, 50);

    for (const species of limited) {
        const pokemon = await fetchPokemon(species.pokemon.name); //[{} {}]

        if (pokemon) {
            createPokemonCard(pokemon, grid);
        }
    }
}

/**
 * Carga y visualiza Pokémon de un tipo
 */
async function loadTypePokemon(typeUrl) {
    showSection('pokemon-section'); //muestra los datos de los pokemon
    console.log('typeUrl', typeUrl)
    const typeData = await fetch(typeUrl).then(r => r.json());
    console.log('typeData', typeData);
    const pokemonList = typeData.pokemon.map(p => p.pokemon); //[[{}][{}]]
    console.log('pokemonList', pokemonList);
    const grid = document.getElementById('pokemonGrid');
    grid.innerHTML = '';

    // Limitar a 50
    const limited = pokemonList.slice(0, 50);

    for (const species of limited) {
        const pokemon = await fetchPokemon(species.name);
        if (pokemon) {
            createPokemonCard(pokemon, grid);
        }
    }
}

/**
 * Carga y visualiza Pokémon de un region
 */
async function loadRegionPokemon(typeUrl) {
    showSection('pokemon-section'); //muestra los datos de los pokemon
    console.log('typeUrl', typeUrl)
    const typeData = await fetch(typeUrl).then(r => r.json());
    console.log('typeData', typeData); //falla por que la vadena psas los datos pero no existen pokemon asi que se trabaja con la url de generacion ;
    const pokemonList = typeData.location.map(p => p.pokemon); //[[{}][{}]]
    console.log('pokemonList', pokemonList);
    const grid = document.getElementById('pokemonGrid');
    grid.innerHTML = '';

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


/**
 * Carga y visualiza Pokémon de un Pokemon_Color
 */
async function loadPokemonColor(typeUrl) {
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

/**
 * Carga y visualiza Pokémon de un Pokemon_Habitat
 */
async function loadPokemonHbitat(typeUrl) {
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

/**
 * Carga y visualiza Pokémon de un Pokemon_Shape
 */
async function loadPokemonShape(typeUrl) {
    showSection('pokemon-section'); //muestra los datos de los pokemon
    const typeData = await fetch(typeUrl).then(r => r.json());
    console.log('typeData', typeData);
    const pokemonList = typeData.pokemon_species;
    console.log('pokemonList', pokemonList);
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

/**
 * Carga y visualiza Pokémon de un pokedex
 */
async function loadPokedexPokemon(typeUrl) {
    showSection('pokemon-section'); //muestra los datos de los pokemon

    const typeData = await fetch(typeUrl).then(r => r.json());
    console.log('typeData', typeData);
    const pokemonList = typeData.pokemon_entries.map(p => p.pokemon_species); //[[{}][{}]];
    console.log('pokemonList', pokemonList);
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

/**
 * Carga y visualiza Pokémon de un Gender
 */
async function loadGenderPokemon(typeUrl) {
    showSection('pokemon-section'); //muestra los datos de los pokemon
    const typeData = await fetch(typeUrl).then(r => r.json());

    const pokemonList = typeData.required_for_evolution; //pokemon_species_details// para cada poemon que tiene evllucion 

    const grid = document.getElementById('pokemonGrid');
    grid.innerHTML = '';
    /* {name: 'wormadam', url: 'https://pokeapi.co/api/v2/pokemon-species/413/'}
   
       */
    // Limitar a 50
    const limited = pokemonList.slice(0, 50);
    //console.log('idOrName', idOrName); //"name": "wormadam-plant",
    for (const species of limited) {
        console.log('species', species);
        //const pokemon = await fetchPokemon(species.pokemon_species.name); //[{} {}]
        const pokemon = await fetchPokemon(species.name); //[{} {}] id "id": 413,
        if (pokemon) {
            createPokemonCard(pokemon, grid);
        }
    }
}

/**
 * Carga y visualiza Pokémon de un Gender
 */
async function loadEvolutionTriggerPokemon(typeUrl) {
    showSection('pokemon-section'); //muestra los datos de los pokemon
    const typeData = await fetch(typeUrl).then(r => r.json());

    const pokemonList = typeData.required_for_evolution; //pokemon_species_details// para cada poemon que tiene evllucion 

    const grid = document.getElementById('pokemonGrid');
    grid.innerHTML = '';
    /* {name: 'wormadam', url: 'https://pokeapi.co/api/v2/pokemon-species/413/'}
   
       */
    // Limitar a 50
    const limited = pokemonList.slice(0, 50);
    //console.log('idOrName', idOrName); //"name": "wormadam-plant",
    for (const species of limited) {
        console.log('species', species);
        //const pokemon = await fetchPokemon(species.pokemon_species.name); //[{} {}]
        const pokemon = await fetchPokemon(species.name); //[{} {}] id "id": 413,
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

/**
 * Crea gráfico de distribución de tipos
 */
async function createTypesDistributionChart() {
    try {
        // Obtener primeros 50 pokémon y sus tipos
        const response = await fetch(`${API_BASE}/pokemon/?limit=50`);
        const data = await response.json();
        
        const typeCount = {};
        
        for (const poke of data.results) {
            const pokemon = await fetchPokemon(poke.name);
            if (pokemon) {
                pokemon.types.forEach(t => {
                    typeCount[t.type.name] = (typeCount[t.type.name] || 0) + 1;
                });
            }
        }
        
        const ctx = document.getElementById('chartTypes').getContext('2d');
        
        if (chartTypes) chartTypes.destroy();
        
        const typeColors = {
            normal: '#a8a878', fire: '#f08030', water: '#6890f0', electric: '#f8d030',
            grass: '#78c850', ice: '#98d8d8', fighting: '#c03028', poison: '#a040a0',
            ground: '#e0c068', flying: '#a890f0', psychic: '#f85888', bug: '#a8b820',
            rock: '#b8a038', ghost: '#705898', dragon: '#7038f8', dark: '#705848',
            steel: '#b8b8d0', fairy: '#ee99ac'
        };
        
        chartTypes = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(typeCount),
                datasets: [{
                    data: Object.values(typeCount),
                    backgroundColor: Object.keys(typeCount).map(type => typeColors[type] || '#999'),
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
        
    } catch (error) {
        console.error('Error creating types chart:', error);
    }
}

/**
 * Crea gráfico de estadísticas promedio por tipo
 */
async function createStatsAverageChart() {
    try {
        // Obtener algunos tipos y sus valores de stats
        const types = ['normal', 'fire', 'water', 'electric', 'grass'];
        const statsData = {};
        
        for (const typeName of types) {
            const response = await fetch(`${API_BASE}/type/${typeName}`);
            const typeData = await response.json();
            
            let totalAttack = 0, totalDefense = 0, totalHP = 0, count = 0;
            
            for (const pokemon of typeData.pokemon.slice(0, 10)) {
                const pokeData = await fetchPokemon(pokemon.pokemon.name);
                if (pokeData) {
                    for (const stat of pokeData.stats) {
                        if (stat.stat.name === 'attack') totalAttack += stat.base_stat;
                        if (stat.stat.name === 'defense') totalDefense += stat.base_stat;
                        if (stat.stat.name === 'hp') totalHP += stat.base_stat;
                    }
                    count++;
                }
            }
            
            statsData[typeName] = {
                attack: Math.round(totalAttack / count),
                defense: Math.round(totalDefense / count),
                hp: Math.round(totalHP / count)
            };
        }
        
        const ctx = document.getElementById('chartStats').getContext('2d');
        
        if (chartStats) chartStats.destroy();
        
        chartStats = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(statsData),
                datasets: [
                    {
                        label: 'Attack',
                        data: Object.values(statsData).map(s => s.attack),
                        backgroundColor: '#ff6b6b'
                    },
                    {
                        label: 'Defense',
                        data: Object.values(statsData).map(s => s.defense),
                        backgroundColor: '#4dabf7'
                    },
                    {
                        label: 'HP',
                        data: Object.values(statsData).map(s => s.hp),
                        backgroundColor: '#51cf66'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        
    } catch (error) {
        console.error('Error creating stats chart:', error);
    }
}

/**
 * Crea gráfico de estadísticas de un Pokémon específico
 */
function createPokemonStatsChart(stats) {
    const ctx = document.getElementById('chartPokemonStats').getContext('2d');
    
    if (chartPokemonStats) chartPokemonStats.destroy();
    
    const statNames = stats.map(s => s.stat.name.toUpperCase());
    const statValues = stats.map(s => s.base_stat);
    
    chartPokemonStats = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: statNames,
            datasets: [{
                label: 'Estadísticas Base',
                data: statValues,
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.2)',
                borderWidth: 2,
                pointBackgroundColor: '#ff6b6b',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 150
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
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