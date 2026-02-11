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
 * - Berry: /berry/
 * Y muchas más...
 * 
 * ====================================================
 */

// ====================================================
// CONFIGURACIÓN GLOBAL
// ====================================================

const API_BASE = 'https://pokeapi.co/api/v2';

// Almacenar datos en caché para mejorar rendimiento
const cache = {
    pokemon: {},
    types: null,
    abilities: null,
    items: null,
    moves: null,
    stats: null,
    berries: null,
    generations: null,
    regions: null
};

// Gráficos
let chartTipos = null;
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
        const [pokemon, generations, types, abilities] = await Promise.all([
            fetchPokemonCount(),
            fetchGenerations(),
            fetchTypes(),
            fetchAbilities()
        ]);
        
        // Actualizar contadores
        updateStats(pokemon, generations, types, abilities);
        
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
        cache.generations = data.results;
        return data.count;
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

/**
 * Obtiene un Pokémon específico
 */
async function fetchPokemon(idOrName) {
    if (cache.pokemon[idOrName]) {
        return cache.pokemon[idOrName];
    }
    
    try {
        const response = await fetch(`${API_BASE}/pokemon/${idOrName}`);
        const data = await response.json();
        cache.pokemon[idOrName] = data;
        return data;
    } catch (error) {
        console.error(`Error fetching pokemon ${idOrName}:`, error);
        return null;
    }
}

/**
 * Obtiene Pokémon de una generación específica
 */
async function fetchGenerationPokemon(generationId) {
    try {
        const response = await fetch(`${API_BASE}/generation/${generationId}`);
        const data = await response.json();
        return data.pokemon_species;
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
 * Obtiene ítems
 */
async function fetchItems(limit = 50) {
    if (cache.items) return cache.items;
    
    try {
        const response = await fetch(`${API_BASE}/item/?limit=${limit}`);
        const data = await response.json();
        cache.items = data.results;
        return data.results;
    } catch (error) {
        console.error('Error fetching items:', error);
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

/**
 * Obtiene bayas
 */
async function fetchBerries(limit = 50) {
    if (cache.berries) return cache.berries;
    
    try {
        const response = await fetch(`${API_BASE}/berry/?limit=${limit}`);
        const data = await response.json();
        cache.berries = data.results;
        return data.results;
    } catch (error) {
        console.error('Error fetching berries:', error);
        return [];
    }
}

/**
 * Obtiene regiones
 */
async function fetchRegions() {
    if (cache.regions) return cache.regions;
    
    try {
        const response = await fetch(`${API_BASE}/region/?limit=100`);
        const data = await response.json();
        cache.regions = data.results;
        return data.results;
    } catch (error) {
        console.error('Error fetching regions:', error);
        return [];
    }
}

// ====================================================
// FUNCIONES DE ACTUALIZACIÓN DE DATA
// ====================================================

/**
 * Actualiza los contadores estadísticos
 */
async function updateStats(pokemon, generations, types, abilities) {
    document.getElementById('totalPokemon').textContent = pokemon.toLocaleString();
    document.getElementById('totalGenerations').textContent = generations;
    document.getElementById('totalTypes').textContent = types;
    document.getElementById('totalAbilities').textContent = abilities;
}

/**
 * Carga los menús laterales
 */
async function loadMenus() {
    try {
        // Generaciones
        const generations = await fetchGenerations();
        const genMenu = document.getElementById('generacionesMenu');
        generations.forEach(gen => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = gen.name;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                loadGenerationPokemon(gen.url);
            });
            genMenu.appendChild(link);
        });
        
        // Tipos
        const types = await fetchTypes();
        const tipoMenu = document.getElementById('tiposMenu');
        types.forEach(tipo => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = tipo.name;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                loadTypePokemon(tipo.url);
            });
            tipoMenu.appendChild(link);
        });
        
        // Regiones
        const regions = await fetchRegions();
        const regionMenu = document.getElementById('regionesMenu');
        regions.forEach(region => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = region.name;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showSection('pokemon-section');
            });
            regionMenu.appendChild(link);
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
                showAbilityDetails(ability.url);
            });
            habilMenu.appendChild(link);
        });
        
        // Estadísticas
        const stats = await fetchStats();
        const statsMenu = document.getElementById('estadisticasMenu');
        stats.slice(0, 10).forEach(stat => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = stat.name;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showSection('estadisticas-section');
            });
            statsMenu.appendChild(link);
        });
        
        // Ítems
        const items = await fetchItems();
        const itemsMenu = document.getElementById('itemsMenu');
        items.slice(0, 10).forEach(item => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = item.name;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showItemDetails(item.url);
            });
            itemsMenu.appendChild(link);
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
        
        // Bayas
        const berries = await fetchBerries();
        const bayasMenu = document.getElementById('bayasMenu');
        berries.slice(0, 10).forEach(berry => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = berry.name;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showBerryDetails(berry.url);
            });
            bayasMenu.appendChild(link);
        });
        
    } catch (error) {
        console.error('Error loading menus:', error);
    }
}

// ====================================================
// FUNCIONES DE VISUALIZACIÓN - POKÉMON
// ====================================================

/**
 * Carga y visualiza Pokémon de un tipo
 */
async function loadTypePokemon(typeUrl) {
    showSection('pokemon-section');
    
    const typeData = await fetch(typeUrl).then(r => r.json());
    const pokemonList = typeData.pokemon.map(p => p.pokemon);
    
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
        
        const ctx = document.getElementById('chartTipos').getContext('2d');
        
        if (chartTipos) chartTipos.destroy();
        
        const typeColors = {
            normal: '#a8a878', fire: '#f08030', water: '#6890f0', electric: '#f8d030',
            grass: '#78c850', ice: '#98d8d8', fighting: '#c03028', poison: '#a040a0',
            ground: '#e0c068', flying: '#a890f0', psychic: '#f85888', bug: '#a8b820',
            rock: '#b8a038', ghost: '#705898', dragon: '#7038f8', dark: '#705848',
            steel: '#b8b8d0', fairy: '#ee99ac'
        };
        
        chartTipos = new Chart(ctx, {
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
